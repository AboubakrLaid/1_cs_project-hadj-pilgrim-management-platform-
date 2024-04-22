import useAuth from "../Context/useAuth";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Box, Avatar, Stack } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Home = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const name = localStorage.getItem("name");

  const handleclick = () => {
    navigate("Draw");
  };

  return (
    //--------------------------------------------SIDEBAR------------------------------------//

    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          width: { xs: "100%", md: "300px" },
          border: "2px solid black",
          borderTopRightRadius: { xs: "0px", md: "20px" },
          borderBottomLeftRadius: { xs: "20px", md: "0px" },
          height: { xs: "200px", md: "100vh" },
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
        </Box>
        <Box
          sx={{
            paddingTop: "20px",
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            justifyContent: "space-between",
            height: { xs: "100%", md: "70%" },
            background: "rgba(153, 105, 134, 0.95)",
            width: "100%",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            onClick={() => {
              const token = localStorage.getItem("accessToken");
              console.log(token);
              localStorage.removeItem("accessToken");
              navigate("/");
            }}
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              alignItems: "center",
              mb: 1,
              ":hover": {
                cursor: "pointer",
                color: "red",
              },
            }}
          >
            <LogoutIcon />
            <span
              style={{
                fontWeight: "600",
                fontSize: { xs: "14px", md: "21px" },
              }}
            >
              logout
            </span>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Home;
