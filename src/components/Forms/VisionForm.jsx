import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const emptyFormData = {
  title: "",
  target: "",
  targetDate: "",
  quickDefault: "",
  memberIds: ["us1"],
};
const VisionForm = ({ selectedVision, closeVisionModal }) => {
  const { createVision, editVision, currentUserId, users } = useApp();
  const [formData, setFormData] = useState(emptyFormData);
  const [usersVisible, setUsersVisible] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (selectedVision) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        title: selectedVision.title || "",
        target: selectedVision.target || "",
        targetDate: selectedVision.targetDate || "",
        quickDefault: selectedVision.quickDefault || "",
        memberIds: selectedVision.membersIds || [currentUserId],
      });
    } else {
      setFormData(emptyFormData);
    }
  }, [selectedVision, currentUserId]);

  function handleChange(e) {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (selectedVision && selectedVision.id) {
      editVision({ ...formData, id: selectedVision.id });
    } else {
      createVision({ ...formData, id: crypto.randomUUID() });
    }

    console.log("form data is", formData);
    setFormData(emptyFormData);

    // navigate back to visions
    navigate("/visions");
  }

  function justMe() {
    setUsersVisible(false);
    setFormData((prev) => ({ ...prev, memberIds: [currentUserId] }));
  }

  function toggleInviteFriends() {
    setUsersVisible(true);
    setFormData((prev) => ({ ...prev, memberIds: "" }));
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-extrabold text-text">
        {" "}
        {selectedVision && selectedVision.id
          ? "Edit vision"
          : "Create vision"}{" "}
      </h2>
      <form
        className="z-100  text-left bg-surface p-6 rounded-xl flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="w-full ">
          <label className="text-text-muted text-sm" htmlFor="">
            Title
          </label>
          <input
            onChange={handleChange}
            value={formData.title}
            name="title"
            type="text"
            required
            className="mt-1 bg-bg w-full p-2 px-4 rounded-2xl text-text placeholder:text-text-muted border border-text-muted/40 focus:border-primary focus:outline-0"
          />
        </div>
        <div className="w-full ">
          <label className="text-text-muted text-sm" htmlFor="">
            Target Amount
          </label>
          <input
            onChange={handleChange}
            value={formData.target}
            name="target"
            type="number"
            required
            className="mt-1 bg-bg w-full p-2 px-4 rounded-2xl text-text placeholder:text-text-muted border border-text-muted/40 focus:border-primary focus:outline-0"
          />
        </div>
        <div className="w-full ">
          <label className="text-text-muted text-sm" htmlFor="">
            Target Date
          </label>
          <input
            onChange={handleChange}
            value={formData.targetDate}
            name="targetDate"
            type="date"
            className="mt-1 bg-bg w-full p-2 px-4 rounded-2xl text-text placeholder:text-text-muted border border-text-muted/40 focus:border-primary focus:outline-0"
          />
        </div>

        <div className="w-full ">
          <label className="text-text-muted text-sm" htmlFor="">
            Quick-add default
          </label>
          <input
            onChange={handleChange}
            value={formData.quickDefault}
            name="quickDefault"
            type="number"
            className="my-1 bg-bg w-full p-2 px-4 rounded-2xl text-text placeholder:text-text-muted border border-text-muted/40 focus:border-primary focus:outline-0"
          />
          <p className="text-text-muted text-sm">
            Optional — a one-tap amount on the vision page.
          </p>
        </div>

        <label className="text-text-muted text-sm" htmlFor="">
          Who is saving
        </label>
        <div className="flex gap-4">
          <button
            className={` ${formData.memberIds.includes(currentUserId) ? "font-semibold bg-primary text-primary-light" : "text-text-muted hover:bg-primary-light"} text-sm cursor-pointer flex justify-center items-center gap-3 px-3 py-1 border border-text-muted/30 rounded-full `}
            type="button"
            onClick={justMe}
          >
            Just me
          </button>
          <button
            className={` ${usersVisible ? "font-semibold bg-primary text-primary-light" : "text-text-muted hover:bg-primary-light"} text-sm cursor-pointer flex justify-center items-center gap-3 px-3 py-1 border border-text-muted/30 rounded-full `}
            type="button"
            onClick={toggleInviteFriends}
          >
            Invite friends
          </button>
        </div>

        {usersVisible && (
          <div className="mb-4 flex flex-wrap gap-2">
            {users
              .filter((user) => user.id !== currentUserId)
              .map((user) => (
                <button
                  className={` ${formData.memberIds.includes(user.id) ? "font-semibold bg-primary text-primary-light" : "text-text-muted hover:bg-primary-light"} text-sm cursor-pointer flex justify-center items-center gap-3 px-3 py-1 border border-text-muted/30 rounded-full `}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      memberIds: prev.memberIds.includes(user.id)
                        ? prev.memberIds.filter((id) => id !== user.id)
                        : [...prev.memberIds, user.id],
                    }))
                  }
                  key={user.id}
                >
                  {user.name}
                </button>
              ))}
          </div>
        )}

        <div className="flex justify-end gap-2 items-center">
          <button
            type="button"
            onClick={closeVisionModal}
            className="text-text cursor-pointer flex justify-center items-center gap-3 px-3 py-1 border border-text-muted/30 rounded-full hover:bg-primary-light"
          >
            Cancel
          </button>
          <button
            className="cursor-pointer flex justify-center items-center gap-3 bg-primary hover:bg-primary-hover px-3 py-1 rounded-full"
            type="submit"
          >
            {selectedVision && selectedVision.id
              ? "Save Changes"
              : "Create Vision"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisionForm;
