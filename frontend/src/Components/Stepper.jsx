import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import CheckIcon from "@mui/icons-material/Check";
import { PiNumberOneBold } from "react-icons/pi";
import { PiNumberTwoBold } from "react-icons/pi";
import { PiNumberThreeBold } from "react-icons/pi";
import { PiNumberFourBold } from "react-icons/pi";
import { PiNumberFiveBold } from "react-icons/pi";

const Stepper = (Step) => {
  const phase = Step.Step;

  return (
    <Timeline
      sx={{
        maxHeight: "100%",
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      <TimelineItem
        sx={{
          display: "flex",
          alignItems: "center", // Align items vertically in the center
        }}
      >
        <TimelineSeparator>
          <TimelineDot
            sx={{
              height: "5.5vh",
              width: "5.5vh",
              backgroundColor: "#E7D9CA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {phase <= 1 && (
              <PiNumberOneBold
                style={{ color: "#AB7595", height: "100%", width: "100%" }}
              />
            )}
            {phase > 1 && <CheckIcon sx={{ color: "#AB7595" }} />}
          </TimelineDot>
          <TimelineConnector sx={{ backgroundColor: "white", height: "3vh" }} />
        </TimelineSeparator>
        <TimelineContent
          sx={{
            position: "relative",
            bottom: "10px",
            fontWeight: 600,
            fontSize: "18px",
            color: phase === 1 ? "white" : "rgba(255, 255, 255, 0.4) ",
          }}
        >
          Registration
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot
            sx={{
              height: "5.5vh",
              width: "5.5vh",
              backgroundColor: "#E7D9CA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {phase <= 2 && (
              <PiNumberTwoBold
                style={{ color: "#AB7595", height: "100%", width: "100%" }}
              />
            )}
            {phase > 2 && <CheckIcon sx={{ color: "#AB7595" }} />}
          </TimelineDot>
          <TimelineConnector sx={{ backgroundColor: "white", height: "3vh" }} />
        </TimelineSeparator>
        <TimelineContent
          sx={{
            position: "relative",
            top: "10px",
            fontWeight: 600,
            fontSize: "18px",
            color: phase === 2 ? "white" : "rgba(255, 255, 255, 0.4) ",
          }}
        >
          Draw
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot
            sx={{
              height: "5.5vh",
              width: "5.5vh",
              backgroundColor: "#E7D9CA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {phase <= 3 && (
              <PiNumberThreeBold
                style={{ color: "#AB7595", height: "100%", width: "100%" }}
              />
            )}
            {phase > 3 && <CheckIcon sx={{ color: "#AB7595" }} />}
          </TimelineDot>
          <TimelineConnector sx={{ backgroundColor: "white", height: "3vh" }} />
        </TimelineSeparator>
        <TimelineContent
          sx={{
            position: "relative",
            top: "10px",
            fontWeight: 600,
            fontSize: "18px",
            color: phase === 3 ? "white" : "rgba(255, 255, 255, 0.4) ",
          }}
        >
          Medical Visit
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot
            sx={{
              height: "5.5vh",
              width: "5.5vh",
              backgroundColor: "#E7D9CA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {phase <= 4 && (
              <PiNumberFourBold
                style={{ color: "#AB7595", height: "100%", width: "100%" }}
              />
            )}
            {phase > 4 && <CheckIcon sx={{ color: "#AB7595" }} />}
          </TimelineDot>
          <TimelineConnector sx={{ backgroundColor: "white", height: "3vh" }} />
        </TimelineSeparator>
        <TimelineContent
          sx={{
            position: "relative",
            top: "10px",
            fontWeight: 600,
            fontSize: "18px",
            color: phase === 4 ? "white" : "rgba(255, 255, 255, 0.4) ",
          }}
        >
          Payement
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot
            sx={{
              height: "5.5vh",
              width: "5.5vh",
              backgroundColor: "#E7D9CA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {phase <= 5 && (
              <PiNumberFiveBold
                style={{ color: "#AB7595", height: "100%", width: "100%" }}
              />
            )}
            {phase > 5 && <CheckIcon sx={{ color: "#AB7595" }} />}
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent
          sx={{
            position: "relative",
            top: "10px",
            fontWeight: 600,
            fontSize: "18px",
            color: phase === 4 ? "white" : "rgba(255, 255, 255, 0.4) ",
          }}
        >
          Reservation
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export default Stepper;
