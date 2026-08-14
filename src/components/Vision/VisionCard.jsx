// VisionCard.jsx
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { getVisionProgress } from "../../utils/getVisionProgress";

const VisionCard = ({ vision }) => {
  const { contributions } = useApp();
  const {
    totalContributed,
    isCompleted,
    percentage,
    amountRemaining,
    timeLeftText,
    memberBadge,
  } = getVisionProgress(vision, contributions);

  return (
    <>
      <Link to={`/visions/${vision.id}`}>
        <div className="vision-card">
          <div className="card-header">
            <h3>{vision.title}</h3>
            <span className="member-tag">{memberBadge}</span>
          </div>
          <div className="status-row">
            {isCompleted ? (
              <span className="badge completed-badge">Completed 🎉</span>
            ) : (
              <span className="time-left">⏳ {timeLeftText}</span>
            )}
          </div>
          <div className="amount-row">
            <span className="amount-progress">
              Ksh {totalContributed.toLocaleString()} / Ksh{" "}
              {vision.targetAmount.toLocaleString()}
            </span>
            <span className="percentage-text">{percentage}%</span>
          </div>
          <div className="bg-gray-200 w-full h-3 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${isCompleted ? "bg-green-600" : "bg-black"}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="card-footer">
            {isCompleted ? (
              <p className="success-text">Goal Reached!</p>
            ) : (
              <p className="remaining-text">
                Ksh {amountRemaining.toLocaleString()} remaining
              </p>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default VisionCard;
