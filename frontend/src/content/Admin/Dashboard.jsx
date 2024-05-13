import { Box, Stack } from "@mui/material";
import TimeImage from "../../assets/Time.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import {
  faUsers,
  faCalendarDays,
  faUserNurse,
} from "@fortawesome/free-solid-svg-icons";
import Newyear from "../../assets/NewYearColor.png";
import Random from "../../assets/RandomColor.png";

const Dashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isUnder500pxHeight = useMediaQuery("(max-height: 500px)");
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };
  const role = localStorage.getItem("role");
  return (
    <Box sx={{ height: { xs: "800px", md: "100%" } }}>
      <div
        style={{
          height: "100px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleLogOut}
          className="button"
          style={{
            marginRight: isSmallScreen ? "10px" : "30px",
            height: "46px",
            width: isSmallScreen ? "110px" : "140px",
            fontSize: isSmallScreen ? "10px" : "18px",
            borderRadius: 30,
          }}
        >
          Log Out
        </button>
      </div>
      <Box
        sx={{
          height: "85%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center", // Center the content horizontally
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "75%", md: "50%" },
            height: "80%",
            marginLeft: "auto",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              fontWeight: 600,
              height: "15%",
              width: "100%",
              fontSize: {
                xs: isUnder500pxHeight ? "14px" : "22px",
                sm: isUnder500pxHeight ? "16px" : "26px",
                md: isUnder500pxHeight ? "18px" : "30px",
                lg: isUnder500pxHeight ? "20px" : "34px",
              },
              mb: 4,
            }}
          >
            <p>Welcome to your dashboard</p>
          </Box>
          <Box
            sx={{
              height: "85%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="Dashboard-content">
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <img src={Newyear} />
                <div style={{ fontWeight: "600", fontSize: "16px" }}>
                  {role === "GeneralAdmin"
                    ? "Season selection"
                    : "Group selection"}
                </div>
              </Stack>
              <p>
                {role === "GeneralAdmin"
                  ? "Start a new season and effortlessly input crucial information to kickstart the management process."
                  : "Choose the municipalities to participate in the draw selection process for a personalized approach"}
              </p>
            </div>
            <div className="Dashboard-content">
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <FontAwesomeIcon icon={faUsers} style={{ color: "#AB7595" }} />
                <div style={{ fontWeight: "600", fontSize: "16px" }}>
                  {" "}
                  Member management
                </div>
              </Stack>
              <p>
                Seamlessly oversee all members involved in the pilgrimage. View
                comprehensive details through a user-friendly table interface.
                Stay organized and informed at every step of the journey.
              </p>
            </div>
            <div className="Dashboard-content">
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                {role === "GeneralAdmin" ? (
                  <img src={Random} />
                ) : (
                  <FontAwesomeIcon
                    icon={faUserNurse}
                    style={{ color: "#AB7595" }}
                  />
                )}
                <div style={{ fontWeight: "600", fontSize: "16px" }}>
                  {role === "GeneralAdmin"
                    ? "Lottery management"
                    : "Doctor management"}
                </div>
              </Stack>
              <p>
                {role === "GeneralAdmin"
                  ? "Take control of the lottery process by personally selecting the algorithm that best suits your preferences and needs"
                  : "Ensure the health and safety of all participants by managing the roster of doctors. Add, delete, or modify their information as needed, guaranteeing top-notch medical support throughout the pilgrimage."}
              </p>
            </div>
          </Box>
        </Box>
        <Box
          sx={{
            width: "22%",
            height: "45%",
            marginRight: "8%",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <img src={TimeImage} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
