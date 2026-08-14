import { useState } from "react";
import { useApp } from "../../context/AppContext";
import VisionCard from "./VisionCard";
import { getVisionProgress } from "../../utils/getVisionProgress";
import { Link } from "react-router-dom";

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
    const { isCompleted } = getVisionProgress(vision, contributions);
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
      <div>
        <h2>All Visions</h2>
        <button>
          <Link to="/visions/add">+ New vision</Link>
        </button>
      </div>

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
          filteredVisions.map((vision) => (
            <VisionCard key={vision.id} vision={vision} />
          ))
        )}
      </div>
    </main>
  );
};

export default Visions;
