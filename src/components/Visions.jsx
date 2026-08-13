import { useState } from "react";
import { useApp } from "../context/AppContext";

const Visions = () => {
  const { visions, contributions, currentUserId } = useApp();

  // 1. State to track current filter selection
  const [filter, setFilter] = useState("all"); // "all" | "active" | "completed"

  // 2. Filter visions where current user is a member
  const userVisions = visions.filter((vision) =>
    vision.memberIds.includes(currentUserId),
  );

  // 3. Filter visions based on the selected tab
  const filteredVisions = userVisions.filter((vision) => {
    const totalContributed = contributions
      .filter((c) => c.visionId === vision.id)
      .reduce((sum, c) => sum + c.amount, 0);

    const isCompleted = totalContributed >= vision.targetAmount;

    if (filter === "active") return !isCompleted;
    if (filter === "completed") return isCompleted;
    return true; // "all"
  });

  console.log("visions are", filter, filteredVisions);
  if (userVisions.length === 0) {
    return <div>No visions found</div>;
  }

  const tabs = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <main className="visions-container">
      <h2>My Visions</h2>

      {/* Filter Tabs */}
      <div className="flex justify-center items-center gap-2 overflow-x-scroll my-4">
        {tabs.map((tab) => {
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`cursor-pointer transition-all duration-200 hover:scale-95 px-4 py-1 rounded-full text-sm font-medium ${
                isActive
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Filtered Visions */}
      <div className="visions-grid">
        {filteredVisions.length === 0 ? (
          <p className="text-center text-gray-500 my-8">
            No {filter} visions to display.
          </p>
        ) : (
          filteredVisions.map((vision) => {
            // --- Total Contributions for this Vision ---
            const totalContributed = contributions
              .filter((c) => c.visionId === vision.id)
              .reduce((sum, c) => sum + c.amount, 0);

            // --- Completion & Progress Calculations ---
            const isCompleted = totalContributed >= vision.targetAmount;
            const rawPercentage =
              (totalContributed / vision.targetAmount) * 100;
            const percentage = Math.min(Math.round(rawPercentage), 100);
            const amountRemaining = Math.max(
              vision.targetAmount - totalContributed,
              0,
            );

            // --- Time Left Calculation ---
            let timeLeftText = null;
            if (vision.targetDate) {
              const diffMs = new Date(vision.targetDate).getTime() - Date.now();
              const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
              timeLeftText = daysLeft > 0 ? `${daysLeft} days left` : "Expired";
            } else {
              timeLeftText = "No deadline";
            }

            // --- Member Indicator Badge ---
            const memberCount = vision.memberIds.length;
            const memberBadge =
              memberCount === 1 ? "Just You" : `${memberCount} saving`;

            return (
              <div key={vision.id} className="vision-card">
                {/* Header: Title & Member Indicator */}
                <div className="card-header">
                  <h3>{vision.title}</h3>
                  <span className="member-tag">{memberBadge}</span>
                </div>

                {/* Status Row: Completed Badge OR Time Left */}
                <div className="status-row">
                  {isCompleted ? (
                    <span className="badge completed-badge">Completed 🎉</span>
                  ) : (
                    <span className="time-left">⏳ {timeLeftText}</span>
                  )}
                </div>

                {/* Amount Breakdown & Percentage */}
                <div className="amount-row">
                  <span className="amount-progress">
                    Ksh {totalContributed.toLocaleString()} / Ksh{" "}
                    {vision.targetAmount.toLocaleString()}
                  </span>
                  <span className="percentage-text">{percentage}%</span>
                </div>

                {/* Progress Bar */}
                <div className="bg-gray-200 w-full h-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isCompleted ? "bg-green-600" : "bg-black"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Amount Remaining Footer */}
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
            );
          })
        )}
      </div>
    </main>
  );
};

export default Visions;
