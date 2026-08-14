import { useApp } from "../context/AppContext";
import {
  calculateStreak,
  getUserContributionDates,
} from "../utils/landingHelpers";
import VisionCard from "./Vision/VisionCard";
import { getVisionProgress } from "../utils/getVisionProgress";
import { Link } from "react-router-dom";
import { Flame } from "lucide-react";

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
    <main className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className=" text-text">
          <p className="text-sm text-text-muted">Total saved</p>
          <h2 className="text-4xl font-extrabold text-text">Ksh {total}</h2>
        </div>

        <Link to="/visions/add" className="text-center text-primary-light ">
          <button className="cursor-pointer flex justify-center items-center gap-3 bg-primary hover:bg-primary-hover px-4 py-3 rounded-full">
            <p>+</p>
            <p className="font-bold">New Vision</p>
          </button>
        </Link>
      </div>

      <div className="flex justify-between items-center gap-8">
        <div className="px-3 py-5 bg-surface border border-text-muted/30 rounded-xl w-full ">
          <p className="text-sm text-primary">Active vision</p>
          <h3 className="text-2xl font-bold text-text">
            {activeVisions.length}
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
          {activeVisions.slice(0, 3).map((vision) => (
            <VisionCard key={vision.id} vision={vision} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
