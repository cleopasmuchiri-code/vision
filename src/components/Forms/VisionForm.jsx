import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const emptyFormData = {
  title: "",
  target: 0,
  targetDate: "",
  quickDefault: 0,
  memberIds: ["us1"],
};
const VisionForm = ({ selectedVision }) => {
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

  console.log("user visible", usersVisible);

  function justMe() {
    setUsersVisible(false);
    setFormData((prev) => ({ ...prev, memberIds: [currentUserId] }));
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">Title</label>
      <input
        onChange={handleChange}
        value={formData.title}
        name="title"
        type="text"
        required
      />

      <label htmlFor="">Target Amount</label>
      <input
        onChange={handleChange}
        value={formData.target}
        name="target"
        type="number"
      />

      <label htmlFor="">Target Date</label>
      <input
        onChange={handleChange}
        value={formData.targetDate}
        name="targetDate"
        type="date"
      />

      <label htmlFor="">Quick-add default</label>
      <input
        onChange={handleChange}
        value={formData.quickDefault}
        name="quickDefault"
        type="number"
      />

      <label htmlFor="">Who is saving</label>
      <button type="button" onClick={justMe}>
        Just me
      </button>
      <button type="button" onClick={() => setUsersVisible(true)}>
        Invite friends
      </button>

      {usersVisible && (
        <div>
          {users
            .filter((user) => user.id !== currentUserId)
            .map((user) => (
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    memberIds: prev.memberIds.includes(user.id)
                      ? prev.memberIds.filter((id) => id !== user.id)
                      : [...prev.memberIds, user.id],
                  }))
                }
                style={{
                  fontWeight: formData.memberIds.includes(user.id)
                    ? "bold"
                    : "normal",
                }}
                key={user.id}
              >
                {user.name}
              </button>
            ))}
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default VisionForm;
