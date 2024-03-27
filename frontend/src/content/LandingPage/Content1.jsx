import { Box, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faScaleBalanced,
  faSignsPost,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

const Content1 = () => {
  return (
    <>
      <Box
        sx={{
          height: { sx: 1250, md: 620 },
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontWeight: 600,
            fontSize: "32px",
            color: "black",
            marginTop: "120px",
          }}
        >
          Why Make Us Your <span style={{ color: "#AB7595" }}>Top</span> Pick ?
        </p>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            width: { xs: "100%", lg: "85%" },
            mb: "40px",
            gap: { xs: "20px", md: "40px" },
          }}
        >
          <Stack
            direction="column"
            spacing={3}
            sx={{
              display: "flex",
              height: "340px",
              width: "360px",
              borderRadius: "18px",
              py: 3,
              px: 7,
              alignItems: "center",
              backgroundColor: "rgba(231, 217, 202, 0.7)",
            }}
          >
            <div className="Empty-box">
              <FontAwesomeIcon
                icon={faSignsPost}
                style={{ color: "white", height: "36px", width: "36px" }}
              />
            </div>
            <p id="landing-P1">Pilgrim Guidance </p>
            <p id="landing-P2">
              Be accompanied at every stage of your journey. We guide you
              through each step of the Hajj, ensuring a smooth and enriching
              experience.
            </p>
            <p id="landing-P3">Read More &gt;</p>
          </Stack>
          <Stack
            direction="column"
            spacing={3}
            sx={{
              display: "flex",
              height: "340px",
              width: "360px",
              borderRadius: "18px",
              py: 3,
              px: 7,
              alignItems: "center",
              backgroundColor: "rgba(231, 217, 202, 0.7)",
            }}
          >
            <div className="Empty-box">
              <FontAwesomeIcon
                icon={faThumbsUp}
                style={{ color: "white", height: "36px", width: "36px" }}
              />
            </div>
            <p id="landing-P1">Convenience Process </p>
            <p id="landing-P2">
              Easily sign up online and track your progress throughout the
              process
            </p>
            <p id="landing-P3">Read More &gt; </p>
          </Stack>
          <Stack
            direction="column"
            spacing={3}
            sx={{
              display: "flex",
              height: "340px",
              width: "360px",
              borderRadius: "18px",
              py: 3,
              px: 7,
              alignItems: "center",
              backgroundColor: "rgba(231, 217, 202, 0.7)",
            }}
          >
            <div className="Empty-box">
              <FontAwesomeIcon
                icon={faScaleBalanced}
                style={{ color: "white", height: "36px", width: "36px" }}
              />
            </div>
            <p id="landing-P1">Transparent Experience </p>
            <p id="landing-P2">
              Our user-friendly interface allow you to navigate easily through
              the various stages of your preparation for the Hajj{" "}
            </p>
            <p id="landing-P3">Read More &gt; </p>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Content1;
