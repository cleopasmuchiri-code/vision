import { useApp } from "../context/AppContext";
const Profile = () => {
  const { currentUser, currentUserId, visions, theme, toggleTheme } = useApp();

  const usersVisions = visions.filter((vision) =>
    vision.memberIds.includes(currentUserId),
  );

  const totalVisions = usersVisions.length;

  return (
    <main>
      <div>{currentUser.name}</div>

      <div>
        {usersVisions.map((vision) => (
          <div key={vision.id}>{vision.title}</div>
        ))}
        Total Vision
        {totalVisions}
      </div>

      <div>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Switch to dark" : "Switch to light"}
        </button>
      </div>
    </main>
  );
};

export default Profile;
