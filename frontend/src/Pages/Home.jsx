import useAuth from "../Context/useAuth";
import { Outlet, useNavigate } from "react-router-dom";

import { Box, Avatar } from "@mui/material";
import Stepper from "../Components/Stepper";
import { useTheme, useMediaQuery } from "@mui/material";
import HorStepper from "../Components/HorStepper";

const Home = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const name = localStorage.getItem("name");

  const handleclick = () => {
    navigate("Draw");
  };

  const theme = useTheme();
  const isXsMd = useMediaQuery(theme.breakpoints.between("xs", "md"));

  return (
    //--------------------------------------------SIDEBAR------------------------------------//

    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          width: { xs: "100%", md: "300px" },
          borderTopRightRadius: { xs: "0px", md: "20px" },
          borderBottomLeftRadius: { xs: "20px", md: "0px" },
          height: { xs: "200px", md: "100%" },
        }}
      >
        <Box
          sx={{
            height: { xs: "100%", md: "30%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: "30%", md: "100%" },
            borderTopRightRadius: { xs: "0px", md: "20px" },
            borderBottomLeftRadius: { xs: "20px", md: "0px" },
            backgroundColor: "#996986",
            borderBottom: "2px solid rgba(0, 0, 0, 0.4)",
          }}
        >
          <Avatar
            onClick={handleclick}
            src="/broken-image.jpg"
            sx={{
              width: { xs: "70px", sm: "90px", md: "110px" },
              height: { xs: "70px", sm: "90px", md: "110px" },
            }}
          />
          <div style={{ color: "white", fontWeight: "600", marginTop: "10px" }}>
            {name}
          </div>
          <Box sx={{ mt: 1 }}>
            <button
              style={{
                width: "110px",
                height: "35px",
                borderRadius: "20px",
                fontWeight: "600",
                fontSize: "16px",
                border: "none",
                backgroundColor: "#E7D9CA",
                cursor: "pointer",
              }}
            >
              Edit profile
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            position: "relative",
            border: "2px solid black",
            paddingTop: "20px",

            height: { xs: "100%", md: "70%" },
            background: "rgba(153, 105, 134, 0.95)",
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
          }}
        >

          <Box
            sx={{
              border: "2px solid red",
            }}
          >
            {isXsMd ? <HorStepper /> : <Stepper />}
          </Box>

        </Box>
      </Box>
      <Box sx={{ width: "100%", overflow: "auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Home;
