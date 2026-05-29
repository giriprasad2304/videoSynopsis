import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const DashBoard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await axios.post("http://localhost:3000/api/auth/logout");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err?.message || err);
      // Still redirect to login even if logout fails
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={handleLogout} disabled={isLoading}>
        {isLoading ? "Logging out..." : "Logout"}
      </button>
    </>
  );
};
export default DashBoard;
