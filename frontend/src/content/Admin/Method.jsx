import axios from "../../Api/base";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Stack, Alert } from "@mui/material";
import { useEffect, useState } from "react";

const data = [
  { id: 0, value: 1, label: "one time" },
  { id: 1, value: 1, label: "from 2 to 4" },
  { id: 2, value: 1, label: "more than 4" },
];

const data2 = [
  { id: 0, value: 1, label: "< 50" },
  { id: 1, value: 1, label: "50-70" },
  { id: 2, value: 1, label: ">70" },
];

const Method = () => {
  const [stats, setStats] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [alertsuc, setAlertSuc] = useState(false);
  const [alertErr, setAlertErr] = useState(false);
  const [alertInfo, setAlertInfo] = useState(false);
  const [err, setErr] = useState("");

  const hideAlert = () => {
    setTimeout(() => {
      setAlertSuc(false);
      setAlertErr(false);
      setAlertInfo(false);
    }, 2000); // 2000 milliseconds = 2 seconds
  };

  const handleCheckboxChange = (method) => {
    setSelectedMethod((prevMethod) => (prevMethod === method ? null : method));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("/lottery/statistics", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Set the access token in the Authorization header
          },
        });
        console.log(response);

        setStats(response?.data);
      } catch (error) {
        // Handle network errors or Axios request errors
        console.error("Error:", error);
      }
    };

    fetchData(); // Call the async function to execute it
  }, []);

  const handleSubmit = async () => {
    if (!selectedMethod) {
      return;
    }

    // Get the access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    // Prepare the request body
    const requestBody = {
      algorithm:
        selectedMethod === "Random"
          ? "RND"
          : selectedMethod === "Age Priority"
          ? "PRT"
          : selectedMethod === "Registration Priority"
          ? "WTD"
          : "HYB",
    };

    try {
      const response = await axios.post("/lottery/algorithm", requestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        setAlertSuc(true);
        setErr("Algorithme is now registred");
        hideAlert();
      } else {
        setAlertErr(true);
        setErr("There is no active season at the moment");
        hideAlert();
      }
      // Handle success response
    } catch (error) {
      setAlertInfo(true);
      setErr("erAlgoritme is already chosen");
      hideAlert();
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",

        display: "flex",
        flexDirection: {
          xs: "column", // For extra small screens and below, use column direction
          sm: "column", // For small screens, use column direction
          md: "row", // For medium screens, use row direction
          lg: "row", // For large screens, use row direction
          xl: "row", // For extra large screens, use row direction
        },
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        margin: "auto",
      }}
    >
      {alertErr && (
        <Alert
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 1,
            transition: "opacity 0.5s ease-in-out",
            boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
          }}
          severity="error"
        >
          {err}
        </Alert>
      )}
      {alertsuc && (
        <Alert
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 1,
            transition: "opacity 0.5s ease-in-out",
            boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
          }}
          severity="success"
        >
          {err}
        </Alert>
      )}

      {alertInfo && (
        <Alert
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 1,
            transition: "opacity 0.5s ease-in-out",
            boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
          }}
          severity="info"
        >
          {err}
        </Alert>
      )}
      <Stack
        direction="column"
        spacing={2}
        sx={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          width: "50%",
        }}
      >
        <span style={{ fontWeight: 500, fontSize: "30px" }}>statistics</span>
        <Box
          sx={{
            height: { xs: 200, md: 250, lg: 300 },
            backgroundColor: "#EDE8E8",
            borderRadius: 12,
            width: { xs: 200, md: 300, lg: 400 },
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          <PieChart
            series={[
              {
                data,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: { innerRadius: 30, additionalRadius: -5, color: "gray" },
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: 0,
                cx: "50%",
                cy: "50%",
              },
            ]}
            width={400}
            height={300}
          />
          <span
            style={{ fontWeight: 500, fontSize: "14px", textAlign: "center" }}
          >
            Registration Time Percentage Circle
          </span>
        </Box>

        <Box
          sx={{
            height: { xs: 200, md: 250, lg: 300 },
            backgroundColor: "#EDE8E8",
            borderRadius: 12,
            width: { xs: 200, md: 300, lg: 400 },
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          <PieChart
            series={[
              {
                data: data2,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: { innerRadius: 30, additionalRadius: -5, color: "gray" },
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,

                startAngle: 0,
                cx: "50%",
                cy: "50%",
              },
            ]}
            width={400}
            height={300}
          />
          <span
            style={{ fontWeight: 500, fontSize: "14px", textAlign: "center" }}
          >
            Age Percentage Distribution
          </span>
        </Box>
      </Stack>

      <Stack
        direction="column"
        spacing={2}
        sx={{
          position: "relative",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          width: "50%",
        }}
      >
        <span style={{ fontWeight: 500, fontSize: "16px" }}>
          Explore the different draw algorithm options and select the one that
          ligns with the overview depicted in the circle diagrams
        </span>
        <div className="Lottery-methods">
          <div className="Methods-box">
            <input
              type="checkbox"
              checked={selectedMethod === "Random"}
              onChange={() => handleCheckboxChange("Random")}
            />
            <label>Random</label>
          </div>
          <p>
            Providing each candidate an equal chance of being chosen, regardless
            of external factors
          </p>
          <div className="Methods-box">
            <input
              type="checkbox"
              checked={selectedMethod === "Age Priority"}
              onChange={() => handleCheckboxChange("Age Priority")}
            />
            <label>Age Priority</label>
          </div>
          <p>
            Considering the age of participants as a key factor in the selection
            process
          </p>
          <div className="Methods-box">
            <input
              type="checkbox"
              checked={selectedMethod === "Registration Priority"}
              onChange={() => handleCheckboxChange("Registration Priority")}
            />
            <label>Registration Priority</label>
          </div>
          <p>
            Considering the frequency of a candidate's participation in the Hajj
            draw
          </p>
          <div className="Methods-box">
            <input
              type="checkbox"
              checked={
                selectedMethod === "Age Priority & Registration Priority"
              }
              onChange={() =>
                handleCheckboxChange("Age Priority & Registration Priority")
              }
            />
            <label>Age Priority & Registration Priority</label>
          </div>
          <p>Considering the 2 options in one algorithm</p>
        </div>

        {selectedMethod && (
          <button
            onClick={handleSubmit}
            className="button"
            style={{
              width: "150px",
              height: "50px",
            }}
          >
            Confirm
          </button>
        )}
      </Stack>
    </Box>
  );
};

export default Method;
