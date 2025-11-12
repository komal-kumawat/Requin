import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="dashboard-wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <FaUserCircle className="profile-icon" />
          <span className="user-name">{user.name || "User"}</span>
        </div>

        <div className="nav-right">
          <FaBars
            className="menu-icon"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="dropdown-menu">
                <p>{user.name}</p>
              <p>{user.role}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
<main className="main-content">
        <h1>Welcome, {user.name || "User"} 👋</h1>

        {user.role === "admin" && (
          <div className="role-section admin-section">
            <h2>Admin Dashboard</h2>
            <p>Here you can manage users, monitor activities, and control access.</p>
            <ul>
              <li>🧑‍💻 Manage Users</li>
              <li>📊 View System Reports</li>
              <li>⚙️ Configure Settings</li>
            </ul>
          </div>
        )}

        {user.role === "manager" && (
          <div className="role-section manager-section">
            <h2>Manager Dashboard</h2>
            <p>Track your team’s performance and project updates in one place.</p>
            <ul>
              <li>📁 View Project Progress</li>
              <li>👥 Manage Team Members</li>
              <li>📆 Assign and Review Tasks</li>
            </ul>
          </div>
        )}

        {user.role === "user" && (
          <div className="role-section user-section">
            <h2>User Dashboard</h2>
            <p>Welcome to your personal dashboard. Check your updates below.</p>
            <ul>
              <li>🧾 View Account Details</li>
              <li>💬 Recent Notifications</li>
              <li>📈 Activity Summary</li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
