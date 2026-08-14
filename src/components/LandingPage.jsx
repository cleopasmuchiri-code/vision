import { useApp } from "../context/AppContext";
import {
  calculateStreak,
  getUserContributionDates,
} from "../utils/landingHelpers";
import VisionCard from "./Vision/VisionCard";
import { getVisionProgress } from "../utils/getVisionProgress";
import { Link } from "react-router-dom";
const LandingPage = () => {
  const { currentUserId, contributions, visions } = useApp();

  const userContributions = contributions.filter(
    (contribution) => contribution.memberId === currentUserId,
  );

  // total contribution
  const total = userContributions.reduce((sum, contribution) => {
    return sum + contribution.amount;
  }, 0);

  //   active vision

  const activeVisions = visions
    .filter((v) => v.memberIds.includes(currentUserId))
    .filter((v) => !getVisionProgress(v, contributions).isCompleted);

  // get array of the contribution dates
  const dates = getUserContributionDates(contributions);

  // streak
  const streak = calculateStreak(dates);

  return (
    <main className="bg-bg">
      <div>
        <div>
          <p>Total saved</p>
          Ksh{total}
        </div>

        <button>
          <Link to="/visions/add">+ New vision</Link>
        </button>
      </div>

      <div>
        <div>
          <p>active vision</p>
          <p>{activeVisions.length}</p>
        </div>
        <div>
          <p>Savings Streak</p>
          <p>{streak}</p>
        </div>
      </div>

      <div>
        <div>
          <p>In Progress</p>
        </div>

        <button>
          <Link to="/visions">View All</Link>
        </button>
        <div>
          {activeVisions.slice(0, 3).map((vision) => (
            <VisionCard key={vision.id} vision={vision} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
