import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Content2 = () => {
  const navigate = useNavigate();
  const access = localStorage.getItem("accessToken");
  return (
    <>
      <Box
        sx={{
          height: { xs: "950px", md: "600px" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          px: { xs: 2, md: 6, lg: 16 },
          justifyContent: "space-between",
          alignItems: "center",
          gap: { xs: "20px", md: "40px" },
        }}
      >
        <div className="landing-content2"></div>

        <Box
          sx={{
            height: "360px",
            width: { xs: "400px", md: "650px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <p
            style={{
              fontWeight: 600,
              fontSize: "36px",
              color: "black",
            }}
          >
            Your <span style={{ color: "#AB7595" }}>Simple</span> Path to Hajj
            <span style={{ color: "#AB7595" }}> Registration</span>
          </p>
          <p id="landing-P1">
            Dive into the Excitement of Your Hajj Preparation with our Intuitive
            Registration Process, Crafted to Make Every Input Feel like a Step
            Closer to Your Spiritual Journey. Immerse Yourself in the Details as
            You Fill Out Our Comprehensive Form, Ensuring Your Hajj Experience
            is Seamlessly Mapped Out from the Start
          </p>
          <Stack direction="row" spacing={4}>
            {!access && (
              <button
                onClick={() => navigate("/Login")}
                className="button"
                style={{
                  width: "140px",
                  height: "50px",
                  borderRadius: "15px",
                }}
              >
                Sign in
              </button>
            )}
            {access && (
              <button
                onClick={() => navigate("/Participate")}
                className="button"
                style={{
                  width: "140px",
                  height: "50px",
                  borderRadius: "15px",
                }}
              >
                Register
              </button>
            )}
            <button
              className="button"
              style={{
                width: "140px",
                height: "50px",
                borderRadius: "15px",
                backgroundColor: "#E7D9CA",
                color: "rgb(0, 0, 0,0.7)",
              }}
            >
              View details
            </button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Content2;
