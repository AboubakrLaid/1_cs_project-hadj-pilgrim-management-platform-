import { Box, Stack } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { purple } from "@mui/material/colors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCalendarDays,
  faUserNurse,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  return (
    <Box sx={{ height: "100%" }}>
      <div
        style={{
          height: "15%",

          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {" "}
        <NotificationsNoneIcon
          style={{ color: purple[200] }}
          sx={{ fontSize: 40, marginRight: "20px" }}
        />
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
            width: "50%",
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
              fontSize: { xs: "22px", sm: "26px", md: "30px", lg: "34px" },
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
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  style={{ color: "#AB7595" }}
                />
                <div style={{ fontWeight: "600", fontSize: "16px" }}>
                  {" "}
                  Season Selection
                </div>
              </Stack>
              <p>
                Start a new season and effortlessly input crucial information to
                kickstart the management process.
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
                <FontAwesomeIcon
                  icon={faUserNurse}
                  style={{ color: "#AB7595" }}
                />
                <div style={{ fontWeight: "600", fontSize: "16px" }}>
                  {" "}
                  Doctor management
                </div>
              </Stack>
              <p>
                Ensure the health and safety of all participants by managing the
                roster of doctors. Add, delete, or modify their information as
                needed, guaranteeing top-notch medical support throughout the
                pilgrimage.
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
          <img src="/Time management-pana.svg" />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
