import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";

const emptyFormData = {
  amount: 0,
  date: "",
};

const ContributionForm = ({ selectedContribution, visionId, quickDefault }) => {
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
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">Amount</label>
      <input
        onChange={handleChange}
        value={formData.amount}
        name="amount"
        type="number"
      />

      <label htmlFor="">Date</label>
      <input
        onChange={handleChange}
        value={formData.date}
        name="date"
        type="date"
      />

      <button type="submit">
        {selectedContribution && selectedContribution.id ? "Save" : "Add"}
      </button>
    </form>
  );
};

export default ContributionForm;
