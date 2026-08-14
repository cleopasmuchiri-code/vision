import { useApp } from "../context/AppContext";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getUserInitials } from "../utils/getUserInitials";

const Navbar = () => {
  const { currentUserId, users } = useApp();
  const location = useLocation();

  const urls = [
    {
      id: "Dashboard",
      location: "/",
    },

    {
      id: "Visions",
      location: "/visions",
    },

    {
      id: "History",
      location: "/history",
    },
  ];

  const initials = getUserInitials(users, currentUserId);
  return (
    <nav className="text-text-muted border-b border-b-text-muted/30  flex justify-between items-center w-full pt-4 pb-5 px-4">
      {/* logo */}
      <Link to="/" className="text-lg font-bold text-text">
        Vision
      </Link>

      {/* app navigation */}
      <div className=" flex justify-center items-center gap-2">
        {urls.map((url, index) => {
          const isActive =
            url.location === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(url.location);

          return (
            <div key={index}>
              <Link
                to={url.location}
                className={`text-xs  px-3.5 py-2 rounded-full ${isActive ? "bg-primary/10 text-primary" : "hover:text-text"}`}
              >
                {url.id}
              </Link>
            </div>
          );
        })}

        <Link
          to="/profile"
          className="text-primary font-extrabold bg-primary/10 w-8 h-8 flex justify-center items-center rounded-full"
        >
          {initials}
        </Link>
      </div>

      {/* profile */}
    </nav>
  );
};

export default Navbar;
