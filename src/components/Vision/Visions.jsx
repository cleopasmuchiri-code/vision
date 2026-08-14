import { useState } from "react";
import { useApp } from "../../context/AppContext";
import VisionCard from "./VisionCard";
import { getVisionProgress } from "../../utils/getVisionProgress";

import VisionForm from "../Forms/VisionForm";

const Visions = () => {
  const { visions, contributions, currentUserId } = useApp();

  // 1. State to track current filter selection
  const [filter, setFilter] = useState("all"); // "all" | "active" | "completed"
  const [isCreating, setIsCreating] = useState();
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

  function closeVisionModal() {
    if (isCreating) {
      setIsCreating(false);
    }
  }

  return (
    <>
      {isCreating ? (
        <VisionForm closeVisionModal={closeVisionModal} />
      ) : (
        <main className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className=" text-text">
              <h2 className="text-2xl font-extrabold text-text">All Visions</h2>
            </div>

            <button
              onClick={() => setIsCreating(true)}
              className="text-center text-primary-light cursor-pointer flex justify-center items-center gap-3 bg-primary hover:bg-primary-hover px-3 py-1 rounded-full"
            >
              <p>+</p>
              <p className="font-semibold">New</p>
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-start items-center gap-2 my-4">
            {tabs.map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`border text-sm font-medium border-text-muted/30 cursor-pointer transition-all duration-200 hover:scale-95 px-4 py-1 rounded-full ${
                    isActive
                      ? "bg-primary text-primary-light"
                      : "bg-surface text-text-muted  "
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Grid of Filtered Visions */}
          <div className="flex flex-col justify-center gap-4">
            {filteredVisions.length === 0 ? (
              <p className="text-center text-primary my-8">
                No {filter} visions to display.
              </p>
            ) : (
              filteredVisions.map((vision) => (
                <VisionCard key={vision.id} vision={vision} />
              ))
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default Visions;
