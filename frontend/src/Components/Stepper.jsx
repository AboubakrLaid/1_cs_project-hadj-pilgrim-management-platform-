import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import CheckIcon from "@mui/icons-material/Check";
import { PiNumberTwoBold } from "react-icons/pi";
import { PiNumberThreeBold } from "react-icons/pi";
import { PiNumberFourBold } from "react-icons/pi";

const Stepper = () => {
  return (
    <Timeline
      sx={{
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
              height: "40px",
              width: "40px",
              backgroundColor: "#E7D9CA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckIcon sx={{ color: "#AB7595" }} />
          </TimelineDot>
          <TimelineConnector
            sx={{ backgroundColor: "white", height: "30px" }}
          />
        </TimelineSeparator>
        <TimelineContent
          sx={{
            position: "relative",
            bottom: "10px",
            fontWeight: 600,
            fontSize: "18px",
            color: "rgba(255, 255, 255, 0.4) ",
          }}
        >
          Registration
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot
            sx={{
              height: "40px",
              width: "40px",
              backgroundColor: "#E7D9CA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PiNumberTwoBold
              style={{ color: "#AB7595", height: "40px", width: "40px" }}
            />
          </TimelineDot>
          <TimelineConnector
            sx={{ backgroundColor: "white", height: "30px" }}
          />
        </TimelineSeparator>
        <TimelineContent
          sx={{
            position: "relative",
            top: "10px",
            fontWeight: 600,
            fontSize: "18px",
            color: "white",
          }}
        >
          Draw
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot
            sx={{
              height: "40px",
              width: "40px",
              backgroundColor: "#E7D9CA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PiNumberThreeBold
              style={{ color: "#AB7595", height: "40px", width: "40px" }}
            />
          </TimelineDot>
          <TimelineConnector
            sx={{ backgroundColor: "white", height: "30px" }}
          />
        </TimelineSeparator>
        <TimelineContent
          sx={{
            position: "relative",
            top: "10px",
            fontWeight: 600,
            fontSize: "18px",
            color: "rgba(255, 255, 255, 0.4) ",
          }}
        >
          Medical Visit
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot
            sx={{
              height: "40px",
              width: "40px",
              backgroundColor: "#E7D9CA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PiNumberFourBold
              style={{ color: "#AB7595", height: "40px", width: "40px" }}
            />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent
          sx={{
            position: "relative",
            top: "10px",
            fontWeight: 600,
            fontSize: "18px",
            color: "rgba(255, 255, 255, 0.4) ",
          }}
        >
          Payement

        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export default Stepper;
