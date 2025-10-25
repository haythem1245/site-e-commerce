import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const DropdownUser = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const confirmLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <div className="relative inline-block text-left">
      {/* Avatar Button */}
      <button
        id="dropdownUserAvatarButton"
        onClick={() => setOpen(!open)}
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 hover:cursor-pointer"
        type="button"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={user?.image || "https://via.placeholder.com/40"} // image par défaut
          alt="user"
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          id="dropdownAvatar"
          className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{user?.name || "Guest"}</div>
            <div className="font-medium truncate">
              {user?.email || "email@example.com"}
            </div>
          </div>

          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownUserAvatarButton"
          >
            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Cart
              </Link>
            </li>
          </ul>

          <div className="py-2">
            <button
              onClick={confirmLogout}
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white hover:cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownUser;
