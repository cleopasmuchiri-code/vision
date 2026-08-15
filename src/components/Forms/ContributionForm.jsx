import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";

const emptyFormData = {
  amount: "",
  date: "",
};

const ContributionForm = ({
  closeContributionModal,
  selectedContribution,
  visionId,
  quickDefault,
}) => {
  const [formData, setFormData] = useState(emptyFormData);
  const { addContribution, editContribution, currentUserId } = useApp();

  useEffect(() => {
    if (selectedContribution) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        amount: selectedContribution.amount || quickDefault,
        date: selectedContribution.date || "",
      });
    } else {
      setFormData(emptyFormData);
    }
  }, [selectedContribution, quickDefault]);

  function handleChange(e) {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (selectedContribution && selectedContribution.id) {
      editContribution({
        ...formData,
        id: selectedContribution.id,
        visionId: selectedContribution.visionId,
        memberId: selectedContribution.memberId,
      });
    } else {
      addContribution({
        ...formData,
        id: crypto.randomUUID(),
        visionId: visionId,
        memberId: currentUserId,
      });
    }

    setFormData(emptyFormData);
    closeContributionModal();
  }

  return (
    <div className="z-1000 flex flex-col text-left gap-4 max-w-96 bg-surface p-6 rounded-xl">
      <h2 className="font-extrabold text-text">Add Contributions</h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="w-full ">
          <label className="text-text-muted" htmlFor="amount">
            Amount
          </label>
          <input
            onChange={handleChange}
            value={formData.amount}
            name="amount"
            type="number"
            placeholder="50"
            className="mt-1 bg-bg w-full p-2 px-4 rounded-2xl text-text placeholder:text-text-muted border border-text-muted/40 focus:border-primary focus:outline-0"
          />
        </div>
        <div className="w-full">
          <label className="text-text-muted" htmlFor="date">
            Date
          </label>
          <input
            onChange={handleChange}
            value={formData.date}
            name="date"
            type="date"
            className="mt-1 bg-bg w-full p-2 px-4 rounded-2xl text-text placeholder:text-text-muted border border-text-muted/40 focus:border-primary focus:outline-0"
          />
        </div>

        <div className="flex justify-end gap-2 items-center">
          <button
            type="button"
            onClick={closeContributionModal}
            className="text-text cursor-pointer flex justify-center items-center gap-3 px-3 py-1 border border-text-muted/30 rounded-full hover:bg-primary-light"
          >
            Cancel
          </button>
          <button
            className="cursor-pointer flex justify-center items-center gap-3 bg-primary hover:bg-primary-hover px-3 py-1 rounded-full"
            type="submit"
          >
            {selectedContribution && selectedContribution.id ? "Save" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContributionForm;
