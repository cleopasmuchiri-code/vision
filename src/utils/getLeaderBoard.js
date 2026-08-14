// utils/getVisionProgress.js — add this alongside getVisionProgress
export function getLeaderboard(vision, contributions, users) {
  const visionContributions = contributions.filter(
    (c) => c.visionId === vision.id,
  );

  const totals = {};
  visionContributions.forEach((c) => {
    totals[c.memberId] = (totals[c.memberId] || 0) + c.amount;
  });

  return vision.memberIds
    .map((memberId) => ({
      id: memberId,
      name: users.find((u) => u.id === memberId)?.name || "Unknown",
      total: totals[memberId] || 0,
    }))
    .sort((a, b) => b.total - a.total);
}
