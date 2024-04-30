import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Message = () => {
  const status = localStorage.getItem("Status");

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="Unfortunately-body">
      <button
        onClick={handleLogOut}
        className="button"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          height: "46px",
          width: "140px",
          fontSize: "18px",
          borderRadius: 30,
        }}
      >
        Log Out
      </button>
      {status === "R" && (
        <Box
          sx={{
            width: "619px",
            height: "251px",
            padding: "30px 49px",
            borderRadius: "20px",
            border: "1px solid #D6D4D4",
            backgroundColor: "rgba(231, 217, 202, 0.8)",
            marginBottom: "90px",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              fontSize: "30px",
              marginLeft: "150px",
              height: "65px",
              color: "#000000",
              marginBottom: "3px",
              marginTop: "1px",
            }}
          >
            Unfortunately!
          </Typography>
          <Typography
            sx={{
              fontSize: "23px",
              marginRight: "20px",
              marginLeft: "20px",
              color: "#000000",
              marginBottom: "1px",
              marginTop: "-15px",
            }}
          >
            We sincerely thank you for participating in the Hajj selection
            process this year. Although you were not selected this time, your
            intention and commitment are truly valuable
          </Typography>
        </Box>
      )}
      {status === "P" && (
        <Box
          sx={{
            width: "619px",
            height: "251px",
            padding: "30px 49px",
            borderRadius: "20px",
            border: "1px solid #D6D4D4",
            backgroundColor: "rgba(231, 217, 202, 0.8)",
            marginBottom: "90px",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              fontSize: "30px",
              marginLeft: "150px",
              height: "65px",
              color: "#000000",
              marginBottom: "3px",
              marginTop: "1px",
            }}
          >
            Validation process
          </Typography>
          <Typography
            sx={{
              fontSize: "23px",
              marginRight: "20px",
              marginLeft: "20px",
              color: "#000000",
              marginBottom: "1px",
              marginTop: "-15px",
            }}
          >
            Your inscriptions are being validated. You will be informed of the
            results by email.
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default Message;
