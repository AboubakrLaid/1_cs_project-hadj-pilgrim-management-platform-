import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import GroupIcon from "@mui/icons-material/Group";
import MedicationIcon from "@mui/icons-material/Medication";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import Typography from "@mui/material/Typography";

const Stepper = () => {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          2024-10-07
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "black", height: "10px" }} />
          <TimelineDot sx={{ backgroundColor: "rgba(0, 128, 0, 1)" }}>
            <HowToRegIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Registration
          </Typography>
          <Typography>Participate in the Hajj</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          variant="body2"
          color="text.secondary"
        >
          2024-10-25
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "black", height: "50px" }} />
          <TimelineDot sx={{ backgroundColor: "grey" }}>
            <GroupIcon sx={{ color: "black" }} />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Draw
          </Typography>
          <Typography>Wait for the results</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          variant="body2"
          color="text.secondary"
        >
          2024-11-14
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "black", height: "50px" }} />
          <TimelineDot sx={{ backgroundColor: "grey" }}>
            <MedicationIcon sx={{ color: "black" }} />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "black", height: "50px" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Medical Visit
          </Typography>
          <Typography>Visit your doctor</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          variant="body2"
          color="text.secondary"
        >
          2024-11-27
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot sx={{ backgroundColor: "grey" }}>
            <CreditScoreIcon sx={{ color: "black" }} />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Payement
          </Typography>
          <Typography>Pay for the Hajj fees</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export default Stepper;
