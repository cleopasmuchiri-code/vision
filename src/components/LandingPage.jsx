import { useApp } from "../context/AppContext";

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

  const activeVisions = visions.filter((vision) => {
    const isAMember = vision.memberIds.includes(currentUserId);

    if (!isAMember) return false;

    const totalVisionContributions = contributions
      .filter((contribution) => contribution.visionId === vision.id)
      .reduce((sum, contribution) => sum + contribution.amount, 0);

    return vision.targetAmount > totalVisionContributions;
  });

  console.log(activeVisions.length);

  return (
    <main>
      {total}
      <div>active vision: {activeVisions.length}</div>
    </main>
  );
};

export default LandingPage;
