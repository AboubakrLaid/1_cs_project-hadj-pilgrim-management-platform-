import { Box, Stack } from "@mui/material";
const Content3 = () => {
  return (
    <Box
      sx={{
        height: { xs: "1200px", lg: "560px" },
        mt: "30px",
        width: "100%",
        px: { xs: 2, md: 6, lg: 16 },
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        gap: { xs: "20px", md: "40px" },
      }}
    >
      <Box
        sx={{
          height: { xs: "900px", lg: "500px" },
          width: { xs: "390px", sm: "550px", md: "800px", lg: "700px" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            fontWeight: 600,
            fontSize: "36px",
            color: "black",
          }}
        >
          Your <span style={{ color: "#AB7595" }}>Equal</span> Chance: Every
          Applicant
          <span style={{ color: "#AB7595" }}> Matters</span>
        </p>
        <p id="landing-P1" style={{ marginTop: "50px" }}>
          Your Chance, Your Journey: Joining Our Platform Puts You in the
          Running for Hajj Selection, Where Fairness Reigns. With Age and
          Registration Frequency as Factors, See Yourself Among the Winners,
          Embracing Transparency Every Step of the Way
        </p>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: "15px", md: "30px" },
          }}
        >
          <Stack direction="column" spacing={2} sx={{ mt: 3 }}>
            <p
              style={{
                fontWeight: 600,
                fontSize: "22px",
                color: "#AB7595",
              }}
            >
              Transparent Selection:
            </p>
            <p
              style={{
                fontWeight: 400,
                fontSize: "18px",
                color: "black",
              }}
            >
              Your Journey Begins with Equal Opportunity, Ensuring Transparency
              and Inclusion Every Step of the Way
            </p>
          </Stack>
          <Stack direction="column" spacing={2} sx={{ mt: 3 }}>
            <p
              style={{
                fontWeight: 600,
                fontSize: "22px",
                color: "#AB7595",
              }}
            >
              Streamlined Process:
            </p>
            <p
              style={{
                fontWeight: 400,
                fontSize: "18px",
                color: "black",
              }}
            >
              Our Draw Management System Simplifies Selection, Keeping Your Hajj
              Journey Smooth. Trust in Transparency, Embrace the Excitement!
            </p>
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          height: "500px",
          width: "600px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="Content3-Img1">
          <div className="image-wrapper1" />
        </div>
        <div className="Content3-Img2">
          <div className="image-wrapper2" />
        </div>
        <div className="Content3-Img3">
          <div className="image-wrapper3" />
        </div>
      </Box>
    </Box>
  );
};

export default Content3;
