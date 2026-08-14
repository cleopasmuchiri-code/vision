// utils/visionProgress.js
export function getVisionProgress(vision, contributions) {
  const visionContributions = contributions.filter(
    (c) => c.visionId === vision.id,
  );
  const totalContributed = visionContributions.reduce(
    (sum, c) => sum + c.amount,
    0,
  );

  const isCompleted = totalContributed >= vision.targetAmount;
  const rawPercentage = (totalContributed / vision.targetAmount) * 100;
  const percentage = Math.min(Math.round(rawPercentage), 100);
  const amountRemaining = Math.max(vision.targetAmount - totalContributed, 0);

  let timeLeftText = "No deadline";
  if (vision.targetDate) {
    const diffMs = new Date(vision.targetDate).getTime() - Date.now();
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    timeLeftText = daysLeft > 0 ? `${daysLeft} days left` : "Expired";
  }

  const memberCount = vision.memberIds.length;
  const memberBadge = memberCount === 1 ? "Just You" : `${memberCount} saving`;

  return {
    totalContributed,
    isCompleted,
    percentage,
    amountRemaining,
    timeLeftText,
    memberBadge,
    visionContributions,
  };
}
