export function getUserContributionDates(userContributions) {
  const dates = userContributions.map((c) => c.date);

  return [...new Set(dates)];
}

export function getSortedDates(dates) {
  const sorted = [...dates].sort().reverse();

  return sorted;
}

// streak
export function calculateStreak(dates) {
  if (dates.length === 0) return 0;

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  const sorted = getSortedDates(dates);
  // if the most recent contribution isn't today or yesterday, the streak is already broken
  if (sorted[0] !== today && sorted[0] !== yesterday) return 0;

  let streak = 1;

  for (let i = 0; i < sorted.length - 1; i++) {
    const current = new Date(sorted[i]);
    const next = new Date(sorted[i + 1]);
    const dayGap = (current - next) / 86400000; // ms in a day

    if (dayGap === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function getSortedVisions(visions) {
  const sortedVisions = [...visions].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return sortedVisions;
}
