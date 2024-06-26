import { Box, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FaUserDoctor } from "react-icons/fa6";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DoctorImg from "../../assets/DoctorImg.svg";

const DashboardD = () => {
  const isUnder500pxHeight = useMediaQuery("(max-height: 500px)");

  return (
    <Box sx={{ height: { xs: "800px", md: "100%" } }}>
      <Box sx={{ height: "100px" }} />
      <Box
        sx={{
          height: "80%",
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
              justifyContent: "flex-start",
            }}
          >
            <div
              className="Dashboard-content"
              style={{
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
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
                <FaUserDoctor style={{ color: "#AB7595" }} />
                <div style={{ fontWeight: "500", fontSize: "24px" }}>
                  Medical option
                </div>
              </Stack>
              <p style={{ color: "#4F4F4F", fontSize: "16px" }}>
                Take a decision regarding Hajj according to his state of illness
                and ascertain all chronic diseases infected with it for proper
                and peacepilgrimage
              </p>
            </div>
            <div
              className="Dashboard-content"
              style={{
                marginTop: "10px",
              }}
            >
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
                <UploadFileIcon style={{ color: "#AB7595" }} />
                <div style={{ fontWeight: "500", fontSize: "24px" }}>
                  Medical Files Appload
                </div>
              </Stack>
              <p style={{ color: "#4F4F4F", fontSize: "16px" }}>
                Appload all patient documents to ensure safety in case of any
                accidental events and to facilitate the care of the patient with
                minimal effort and especially in a short time in order to
                maintain physical integrity and credibility
              </p>
            </div>
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "50%", md: "40%" },
            height: "60%",
            marginRight: 1,
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <img style={{ height: "100%", width: "100%" }} src={DoctorImg} />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardD;
