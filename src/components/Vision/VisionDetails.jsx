import { useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { getVisionProgress } from "../../utils/getVisionProgress";
import QuickAddContribution from "../Forms/QuickAddContribution";
import { useState } from "react";
import ContributionForm from "../Forms/ContributionForm";
import HistoryCard from "../History/HistoryCard";
import { getLeaderboard } from "../../utils/getLeaderBoard";
import VisionForm from "../Forms/VisionForm";
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

    amountRemaining,
    visionContributions,
  } = getVisionProgress(vision, contributions);

  console.log("Contribution", visionContributions);

  console.log("leaderboard is", leaderBoard);
  return (
    <main>
      <div>
        <div>
          <h2>{vision.title}</h2>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      </div>

      <div>
        <div>
          <h2>Ksh{totalContributed}</h2>
          <p>of {vision.targetAmount}</p>
        </div>

        <div className="bg-gray-200 w-full h-3 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${isCompleted ? "bg-green-600" : "bg-black"}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <span>
          {percentage}%.{amountRemaining} to go{" "}
        </span>

        <div>
          <QuickAddContribution
            quickDefault={vision.quickDefault}
            visionId={id}
          />

          <button onClick={() => setAddCustomContribution(true)}>
            Custom amount
          </button>
        </div>
      </div>

      {visionContributions.map((contribution) => (
        <HistoryCard
          key={contribution.id}
          contribution={contribution}
          editContributionToggle={handleSelectedContributionClick}
        />
      ))}

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
