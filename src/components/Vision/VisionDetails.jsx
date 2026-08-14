import { useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { getVisionProgress } from "../../utils/getVisionProgress";
import QuickAddContribution from "../Forms/QuickAddContribution";
import { useState } from "react";
import ContributionForm from "../Forms/ContributionForm";
import HistoryCard from "../History/HistoryCard";
import { getLeaderboard } from "../../utils/getLeaderBoard";
import VisionForm from "../Forms/VisionForm";
import { Pencil } from "lucide-react";

const VisionDetails = () => {
  // get id from url
  const { id } = useParams();

  // states
  const [isEditing, setIsEditing] = useState(false);
  const [addCustomContribution, setAddCustomContribution] = useState(false);
  const [editContributionToggle, setEditContributionToggle] = useState(false);
  const [selectedContribution, setSelectedContribution] = useState({});

  function handleSelectedContributionClick(contribution) {
    setEditContributionToggle(true);
    setSelectedContribution(contribution);
  }

  // get data from context
  const { visions, contributions, users } = useApp();

  // get vision data using id from url
  const vision = visions.find((vision) => vision.id === id);

  // leaderboard
  const leaderBoard = getLeaderboard(vision, contributions, users);

  const {
    totalContributed,
    isCompleted,
    percentage,
    memberBadge,
    amountRemaining,
    visionContributions,
    timeLeftText,
  } = getVisionProgress(vision, contributions);

  console.log("Contribution", visionContributions);

  console.log("leaderboard is", leaderBoard);
  return (
    <main className="flex flex-col gap-6">
      <div>
        <div className="flex text-text gap-1">
          <h2 className="text-2xl font-extrabold text-text">{vision.title}</h2>

          <button
            className="cursor-pointer text-sm text-text-muted self-start"
            onClick={() => setIsEditing(true)}
          >
            <Pencil size={15} />
          </button>
        </div>

        <div className="text-text-muted font-extralight text-sm">
          <span>{memberBadge} people saving</span> · <span>{timeLeftText}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-6 py-5 bg-surface border border-text-muted/30 rounded-xl w-full">
        <div className="flex justify-between items-baseline">
          <h3 className="text-3xl font-bold text-text">
            Ksh{totalContributed}
          </h3>
          <p className="text-text-muted">of Ksh{vision.targetAmount}</p>
        </div>

        <div className="pt-3">
          <div className="mb-1 bg-primary-light w-full h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${isCompleted ? "bg-accent-warm" : "bg-primary"}`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <span className="text-text-muted text-sm">
            {!isCompleted
              ? `${percentage}%  · Ksh${amountRemaining} to go`
              : "Goal reached — nice work."}
          </span>
        </div>

        <div className="flex justify-start gap-2 ">
          <QuickAddContribution
            quickDefault={vision.quickDefault}
            visionId={id}
          />

          <button
            className="cursor-pointer text-center text-text py-3 px-4  border border-text-muted/30 rounded-full hover:bg-primary-light"
            onClick={() => setAddCustomContribution(true)}
          >
            Custom amount
          </button>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden shadow border border-text-muted/30">
        {visionContributions.map((contribution) => (
          <HistoryCard
            key={contribution.id}
            contribution={contribution}
            editContributionToggle={handleSelectedContributionClick}
          />
        ))}
      </div>

      {isEditing && <VisionForm selectedVision={vision} />}

      {addCustomContribution && (
        <ContributionForm visionId={id} quickDefault={vision.quickDefault} />
      )}

      {editContributionToggle && (
        <ContributionForm
          selectedContribution={selectedContribution}
          visionId={id}
          quickDefault={vision.quickDefault}
        />
      )}
    </main>
  );
};

export default VisionDetails;
