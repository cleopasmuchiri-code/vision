import { useApp } from "../../context/AppContext";

const HistoryCard = ({ contribution, editContributionToggle }) => {
  const { currentUserId, users, visions } = useApp();

  const vision = visions.find((v) => v.id === contribution.visionId);
  const contributor = users.find((u) => u.id === contribution.memberId);

  const isCurrentUser = contributor && contributor.id === currentUserId;
  console.log("Contributor", contributor);
  return (
    <div className="bg-black text-white p-8 flex justify-center items-center">
      <div className="">
        <strong>{vision?.title || "Unknown Vision"}.</strong>

        {/* Display contributor name if it's NOT the current user */}

        <span className="contributor-tag">
          {isCurrentUser ? "You" : contributor?.name}
        </span>

        <div className="history-date">{contribution.date}</div>
      </div>

      <div className="history-amount">
        +Ksh {contribution.amount.toLocaleString()}
      </div>

      {isCurrentUser && editContributionToggle && (
        <button onClick={() => editContributionToggle(contribution)}>
          Edit Contribution
        </button>
      )}
    </div>
  );
};

export default HistoryCard;
