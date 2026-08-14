import { useApp } from "../../context/AppContext";
import HistoryCard from "./HistoryCard";

const History = () => {
  const { currentUserId, visions, contributions } = useApp();

  // 1. Get IDs of all visions the current user belongs to
  const userVisionIds = visions
    .filter((vision) => vision.memberIds.includes(currentUserId))
    .map((vision) => vision.id);

  // 2. Filter contributions belonging to those visions and sort by date (newest first)
  const historyContributions = contributions
    .filter((contribution) => userVisionIds.includes(contribution.visionId))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <main>
      {historyContributions.length === 0 ? (
        <p>No contributions found</p>
      ) : (
        <div className="history-list">
          <div>
            <h1>History</h1>
            <p>
              {historyContributions.length} contributions across all visions
            </p>
          </div>

          <div>
            {historyContributions.map((contribution) => {
              return (
                <HistoryCard
                  key={contribution.id}
                  contribution={contribution}
                />
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
};

export default History;
