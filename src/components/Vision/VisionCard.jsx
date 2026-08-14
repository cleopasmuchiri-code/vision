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
    timeLeftText,
    memberBadge,
  } = getVisionProgress(vision, contributions);

  return (
    <>
      <Link to={`/visions/${vision.id}`}>
        <div
          className={`bg-surface rounded-xl p-4 shadow border border-transparent ${isCompleted ? "hover:border-accent-warm" : "hover:border-primary"} transition-all duration-200`}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-text font-bold ">{vision.title}</h3>
            <span
              className={`text-xs  py-1 px-3 text-center rounded-full font-bold ${isCompleted ? "text-accent-warm bg-accent-warm/20" : "bg-primary/10 text-primary"}`}
            >
              {isCompleted ? "Completed" : percentage}%
            </span>
          </div>

          <div className="text-text-muted text-sm">
            <span className="">
              {memberBadge} {memberBadge !== "Just Me" ? "saving" : ""}
            </span>
            <span className="pl-1">
              {" "}
              {isCompleted ? "" : `· ${timeLeftText}`}
            </span>
          </div>

          <div className="pt-3 pb-1">
            <div className="bg-primary-light w-full h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${isCompleted ? "bg-accent-warm" : "bg-primary"}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <div className="amount-row">
            <span className="amount-progress text-sm">
              <span className="text-text font-semibold">
                Ksh {totalContributed.toLocaleString()}
              </span>{" "}
              <span className="text-text-muted font-light">
                of Ksh {vision.targetAmount.toLocaleString()}
              </span>
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default VisionCard;
