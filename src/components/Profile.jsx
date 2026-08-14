import { useApp } from "../context/AppContext";
import { Sun, Moon } from "lucide-react";
import { getUserInitials } from "../utils/getUserInitials";
import {
  calculateStreak,
  getUserContributionDates,
} from "../utils/landingHelpers";
import { getVisionProgress } from "../utils/getVisionProgress";
import VisionCard from "./Vision/VisionCard";
import { Link } from "react-router-dom";
import { Flame } from "lucide-react";

const Profile = () => {
  const {
    currentUser,
    contributions,
    currentUserId,
    visions,
    theme,
    toggleTheme,
    users,
  } = useApp();

  const usersVisions = visions.filter((vision) =>
    vision.memberIds.includes(currentUserId),
  );

  const activeVisions = usersVisions.filter(
    (v) => !getVisionProgress(v, contributions).isCompleted,
  );

  console.log("contributions", contributions);

  const totalContributed = contributions
    .filter((contribution) => contribution.memberId === currentUserId)
    .reduce((sum, contribution) => sum + contribution.amount, 0);

  const totalVisions = usersVisions.length;

  const initials = getUserInitials(users, currentUserId);

  // get streak
  const dates = getUserContributionDates(contributions);
  const streak = calculateStreak(dates);

  // start date
  const startDate = dates[0];
  return (
    <main className="flex flex-col gap-6">
      <h2 className="text-2xl font-extrabold text-text">Profile</h2>

      <div className="flex  items-center justify-between gap-5 px-3 py-5 bg-surface border border-text-muted/30 rounded-xl w-full">
        <div className="flex items-center gap-5">
          <div className="text-primary font-extrabold bg-primary/10 p-5 w-15 h-15 flex justify-center items-center rounded-full">
            {initials}
          </div>

          <div className="">
            <p className="text-text font-bold">{currentUser.name}</p>
            <p className="text-xs text-text-muted">Saving since {startDate}</p>
          </div>
        </div>

        <div className="flex gap-3 text-accent-warm items-center ">
          <Flame />

          <div>
            <p className="text-xs text-primary">Savings Streak</p>
            <h3 className="text-2xl font-bold text-text">{streak} days</h3>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-2">
        <div className="px-3 py-5 bg-surface border border-text-muted/30 rounded-xl w-full ">
          <p className="text-sm text-primary">You Saved</p>
          <h3 className="text-2xl font-bold text-text">{totalContributed}</h3>
        </div>
        <div className="px-3 py-5 bg-surface border border-text-muted/30 rounded-xl w-full ">
          <p className="text-sm text-primary">Visions</p>
          <h3 className="text-2xl font-bold text-text">{totalVisions}</h3>
        </div>
      </div>

      <div className="flex justify-between items-center gap-5 px-3 py-5 bg-surface border border-text-muted/30 rounded-xl w-full">
        <div className="">
          <p className="text-text font-bold">Appearance</p>
          <p className="text-xs text-text-muted">
            <span className="capitalize">{theme}</span> mode
          </p>
        </div>

        <button
          onClick={toggleTheme}
          className="text-center text-text cursor-pointer flex justify-center items-center gap-3  px-3 py-1 border border-text-muted/30 rounded-full hover:bg-primary-light"
        >
          {theme === "light" ? <Moon /> : <Sun />}
          <p className=" font-semibold">
            {theme === "dark" ? "light" : "dark"}
          </p>
        </button>
      </div>

      <div className="mt-10">
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

      <div></div>
    </main>
  );
};

export default Profile;
