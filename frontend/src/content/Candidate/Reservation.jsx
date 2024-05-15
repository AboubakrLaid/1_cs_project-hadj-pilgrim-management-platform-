import { useNavigate } from "react-router-dom";

const Reservation = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <span>reservation</span>{" "}
      <button
        onClick={handleLogOut}
        className="button"
        style={{
          marginRight: "40px",
          height: "46px",
          width: "140px",
          borderRadius: 30,
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Reservation;
