import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box } from "@mui/material";

const Calendar = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["DateCalendar"]}
        sx={{
          width: "330px",
          height: "500px",
        }}
      >
        <Box
          sx={{
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            borderBottom: "1px solid #AB7595",
            width: "220px",
            height: "60px",
            bgcolor: "rgba(33, 33, 33, 0.08)",
            boxShadow: "0px 8px 5px -5px rgba(171, 117, 149, 1)",
            px: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ color: "#AB7595", fontSize: "14px" }}>Draw</span>
          <span style={{ color: "black", fontSize: "20px" }}>2024-05-29</span>
        </Box>
        <DemoItem>
          <DateCalendar
            defaultValue={dayjs("2024-05-29")}
            readOnly
            slotProps={{
              day: {
                sx: {
                  fontWeight: 600,
                  fontSize: "14px",
                  "&.MuiPickersDay-root.Mui-selected": {
                    backgroundColor: "#AB7595",
                  },
                },
              },
            }}
            sx={{
              borderBottomLeftRadius: "10px",
              boxShadow:
                "5px 0px 15px -5px rgba(171, 117, 149, 0.5), 0px 15px 15px -5px rgba(107, 73, 92, 0.7), -5px 0px 15px -5px rgba(171, 117, 149, 0.5),0px 0px 0px 0px rgba(0, 0, 0, 0)",
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default Calendar;
