import { Typography, Box } from "@mui/material";
 
const Content5 = () => {
  return (
    <Box
      sx={{
        display: "flex",
        marginBotton: "60px",
        height: "550px",
        width: "100%",
        alignItems: "center",
        gap: { xs: "20px", md: "40px" },
        position: "relative",
      }}
    >
      <div className="Content5"></div>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          height: { xs: "100%", lg: "80%" },
          position: "relative",
          left: "-15px",
          marginTop: "230px",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "36px",
            color: "black",
          }}
        >
          Elevate Your <span style={{ color: "#AB7595" }}>Journey</span>: Seamless Hajj
          <span style={{ color: "#AB7595" }}> Flight</span>& <span style={{ color: "#AB7595" }}> Hotel Booking</span>
        </Typography>

        <Typography id="landing-P1" sx={{ marginTop: "50px", fontFamily: "Poppins" }}>
          Trust in our expertise and embark on your pilgrimage with confidence, knowing that every aspect of your travel 
          and accommodation has been meticulously planned to facilitate a transformative and spiritually enriching experience.
        </Typography>
      </Box>
    </Box>
  );
};

export default Content5;
