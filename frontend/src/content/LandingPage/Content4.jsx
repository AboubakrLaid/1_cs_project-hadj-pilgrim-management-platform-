import { Box, Stack } from "@mui/material";

const Content4 = () => {
  return (
    <div className="Content4">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          height: { xs: "100%", lg: "80%" },
          position: "relative",
          left: { xs: "25%", lg: "15%" },
        }}
      >
        <p
          style={{
            fontWeight: 600,
            fontSize: "36px",
            color: "black",
          }}
        >
          <span style={{ color: "#AB7595" }}>Discover</span> Your Doctor's
          Available Time For Your Applicant
          <span style={{ color: "#AB7595" }}> Medical</span> Checkup
        </p>

        <p id="landing-P1" style={{ marginTop: "50px", fontFamily: "poppins" }}>
          Your Journey, Your Health. Handpick Hospitals for Checkups, with
          Doctors' Schedules Tailored for Seamless Hajj Validation
        </p>
        <Stack direction="row" spacing={4} sx={{ mt: "10%" }}>
          <button
            className="button"
            style={{
              width: "140px",
              height: "50px",
              borderRadius: "15px",
            }}
          >
            Sign in
          </button>
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
    </div>
  );
};

export default Content4;
