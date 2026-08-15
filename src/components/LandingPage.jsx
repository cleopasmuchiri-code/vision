import { useApp } from "../context/AppContext";
import {
  calculateStreak,
  getUserContributionDates,
  getSortedVisions,
} from "../utils/landingHelpers";
import VisionCard from "./Vision/VisionCard";
import { getVisionProgress } from "../utils/getVisionProgress";
import { Link } from "react-router-dom";
import { Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  function handleNewVisionClick() {
    navigate("/visions", { state: { openCreate: true } });
  }

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

  const sortedVisions = getSortedVisions(activeVisions);
  // get array of the contribution dates
  const dates = getUserContributionDates(contributions);

  // streak
  const streak = calculateStreak(dates);

  return (
    <main className="flex flex-col gap-8">
      <div className="flex justify-between items-end">
        <div className=" text-text">
          <p className="text-sm text-text-muted">Total saved</p>
          <h2 className="text-4xl font-extrabold text-text">Ksh {total}</h2>
        </div>

        <button
          onClick={handleNewVisionClick}
          className=" text-center text-primary-light cursor-pointer flex justify-center items-center gap-3 bg-primary hover:bg-primary-hover px-6 py-3 rounded-full"
        >
          <p>+</p>
          <p className="font-bold">New Vision</p>
        </button>
      </div>

      <div className="flex justify-between items-center gap-8">
        <div className="px-3 py-5 bg-surface border border-text-muted/30 rounded-xl w-full ">
          <p className="text-sm text-primary">Active vision</p>
          <h3 className="text-2xl font-bold text-text">
            {sortedVisions.length}
          </h3>
        </div>
        <div className="text-accent-warm flex gap-2 items-center px-3 py-5 bg-surface border border-text-muted/30 rounded-xl w-full ">
          <Flame />
          <div>
            <p className="text-sm text-primary">Savings Streak</p>
            <h3 className="text-2xl font-bold text-text">{streak} days</h3>
          </div>
        </div>
      </div>

      <div>
        <div className="pb-2 flex justify-between items-center">
          <div className="text-text font-bold">
            <p>In Progress</p>
          </div>

          <button className="text-primary hover:underline text-sm">
            <Link to="/visions">View All</Link>
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {sortedVisions.slice(0, 3).map((vision) => (
            <VisionCard key={vision.id} vision={vision} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
