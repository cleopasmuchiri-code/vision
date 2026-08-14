import { useApp } from "../context/AppContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { currentUserId, users } = useApp();

  const user = users.find((user) => user.id === currentUserId);
  const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return (
    <nav className="flex justify-between items-center">
      {/* logo */}
      <div className="">Vision</div>

      {/* app navigation */}
      <div className="flex justify-center items-center gap-4">
        <Link to="/">Dashboard</Link>
        <Link to="/visions">Visions</Link>
        <Link to="/history">History</Link>

        <div className="">{initials}</div>
      </div>

      {/* profile */}
    </nav>
  );
};

export default Navbar;
