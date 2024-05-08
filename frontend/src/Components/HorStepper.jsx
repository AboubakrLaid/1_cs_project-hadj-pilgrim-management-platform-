import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepIcon from "@mui/material/StepIcon";

const steps = ["Registration", "Draw", "Medical Visit", "Payement"];

export default function HorStepper() {
  const completedSteps = 3;
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={1}
        sx={{
          "& .MuiStepLabel-label": {
            color: "white",
          },
          "& .MuiStepIcon-root": {
            color: "#E7D9CA",
          },
          "& .MuiStepIcon-active": {
            color: "red",
          },
        }}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={index < completedSteps}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
