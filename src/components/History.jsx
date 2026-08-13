import { useApp } from "../context/AppContext";

const History = () => {
  const { currentUserId, visions, contributions, users } = useApp();

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
      <h1>Contribution History</h1>

      {historyContributions.length === 0 ? (
        <p>No contributions found.</p>
      ) : (
        <div className="history-list">
          <div>
            <h1>History</h1>
            <p>
              {historyContributions.length} contributions across all visions
            </p>
          </div>
          {historyContributions.map((contribution) => {
            // Find related vision and contributor details
            const vision = visions.find((v) => v.id === contribution.visionId);
            const contributor = users.find(
              (u) => u.id === contribution.memberId,
            );
            const isCurrentUser = contribution.memberId === currentUserId;

            return (
              <div
                key={contribution.id}
                className="bg-black text-white p-8 flex justify-center items-center"
              >
                <div className="">
                  <strong>{vision?.title || "Unknown Vision"}.</strong>

                  {/* Display contributor name if it's NOT the current user */}
                  {!isCurrentUser ? (
                    <span className="contributor-tag">{contributor.name}</span>
                  ) : (
                    <span className="contributor-tag">You</span>
                  )}

                  <div className="history-date">{contribution.date}</div>
                </div>

                <div className="history-amount">
                  +Ksh {contribution.amount.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default History;
