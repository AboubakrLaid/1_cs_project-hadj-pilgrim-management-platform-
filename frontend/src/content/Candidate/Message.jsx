import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Message = () => {
  const status = localStorage.getItem("Status");
  const process = localStorage.getItem("process");

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
      {process === "L" && (
        <Box
          sx={{
            width: "619px",
            height: "251px",
            padding: "25px",
            borderRadius: "20px",
            border: "3px solid #AB7595",
            backgroundColor: "white",
            marginBottom: "90px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              fontSize: "30px",
              height: "65px",
              color: "#000000",
            }}
          >
            {status === "R" ? "Unfortunately!" : "Refused !"}
          </Typography>
          <Typography
            sx={{
              fontSize: "19px",
              textAlign: "center",
              color: "#000000",
            }}
          >
            We sincerely thank you for participating in the Hajj selection
            process this year. Although you were not selected this time, your
            intention and commitment are truly valuable
          </Typography>
        </Box>
      )}
      {status === "P" && process === "I" && (
        <Box
          sx={{
            width: "619px",
            height: "251px",
            padding: "25px",
            borderRadius: "20px",
            border: "3px solid #AB7595",
            backgroundColor: "white",
            marginBottom: "90px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              fontSize: "30px",
              height: "65px",
              color: "#000000",
            }}
          >
            Verification Underway
          </Typography>
          <Typography
            sx={{
              fontSize: "19px",
              textAlign: "center",
              color: "#000000",
            }}
          >
            Your request is valuable to us, and we are committed to providing
            accurate and timely information. Our team is diligently working to
            verify the details you&lsquo;ve provided.
          </Typography>
        </Box>
      )}

      {process === "R" && (
        <Box
          sx={{
            width: "619px",
            height: "251px",
            padding: "25px",
            borderRadius: "20px",
            border: "3px solid #AB7595",
            backgroundColor: "white",
            marginBottom: "90px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              fontSize: "30px",
              height: "65px",
              color: "#AB7595",
            }}
          >
            Done !
          </Typography>
          <Typography
            sx={{
              fontSize: "19px",
              textAlign: "center",
              color: "#000000",
            }}
          >
            We wish you an accepted Hajj and a spiritually fulfilling
            experience!
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default Message;
