import { useApp } from "../../context/AppContext";

const QuickAddContribution = ({ quickDefault, visionId }) => {
  const { addContribution, currentUserId } = useApp();

  //   today
  const today = new Date().toISOString().split("T")[0];

  function handleQuickAdd() {
    addContribution({
      id: crypto.randomUUID(),
      memberId: currentUserId,
      visionId: visionId,
      amount: quickDefault,
      date: today,
    });
  }

  return <button onClick={handleQuickAdd}>+ Add Ksh {quickDefault}</button>;
};

export default QuickAddContribution;
