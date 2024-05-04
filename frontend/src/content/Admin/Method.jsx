import axios from "../../Api/base";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Stack, Alert } from "@mui/material";
import { useEffect, useState } from "react";

const Method = () => {
  const [statsParticipation, setStatsParticipation] = useState([]);
  const [statsAge, setStatsAge] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [alertsuc, setAlertSuc] = useState(false);
  const [alertErr, setAlertErr] = useState(false);
  const [alertInfo, setAlertInfo] = useState(false);
  const [err, setErr] = useState("");
  //categories inputs
  const [elderlyMinAge, setElderlyMinAge] = useState("");
  const [elderlyPercentage, setElderlyPercentage] = useState("");
  const [category1MinAge, setCategory1MinAge] = useState("");
  const [category1Percentage, setCategory1Percentage] = useState("");
  const [category2MinAge, setCategory2MinAge] = useState("");
  const [category2Percentage, setCategory2Percentage] = useState("");
  const [category3MinAge, setCategory3MinAge] = useState("");
  const [category3Percentage, setCategory3Percentage] = useState("");

  const isConfirmEnabled = () => {
    switch (selectedMethod) {
      case "Age Priority & Registration Priority":
        return elderlyMinAge !== "" && elderlyPercentage !== "";
      case "Age Priority":
        return (
          category1MinAge !== "" &&
          category1Percentage !== "" &&
          category2MinAge !== "" &&
          category2Percentage !== "" &&
          category3MinAge !== "" &&
          category3Percentage !== ""
        );
      case "Registration Priority":
        return true;
      default:
        return false;
    }
  };

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
        if (response.status === 200) {
          console.log(response);
          const totalParticipants = response.data.total_participants;
          const numberOfParticipationData = Object.entries(
            response?.data.participation_counts_pourcentages
          ).map(([label, percentage], index) => ({
            id: index,
            value: Math.round((percentage / 100) * totalParticipants),
            label: label === "more_than_four" ? ">4" : label.replace(/_/g, " "),
          }));
          const ageStats = Object.entries(
            response.data.age_groups_pourcentages
          ).map(([label, percentage], index) => {
            let formattedLabel;

            if (label === "under_40") {
              formattedLabel = "<40";
            } else if (label === "between_41_70") {
              formattedLabel = "41-70";
            } else if (label === "above_71") {
              formattedLabel = ">71";
            } else {
              formattedLabel = label.replace(/_/g, " ");
            }

            return {
              id: index,
              value: Math.round((percentage / 100) * totalParticipants),
              label: formattedLabel,
            };
          });
          setStatsParticipation(numberOfParticipationData);
          setStatsAge(ageStats);
          console.log(statsParticipation);
        }
      } catch (error) {
        // Handle network errors or Axios request errors
        console.error("Error:", error);
      }
    };

    fetchData(); // Call the async function to execute it
  }, []);
  console.log(statsParticipation);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          width: "40%",
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
                data: statsParticipation,
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
                data: statsAge,
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

          justifyContent: "center",
          width: "60%",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
            padding: "10px",
          }}
        >
          <span style={{ fontWeight: 500, fontSize: "36px" }}>Algorithm</span>
          {selectedMethod && (
            <button
              className="button"
              style={{ width: "25%", height: "50px", borderRadius: "15px" }}
              onClick={handleSubmit}
              disabled={!isConfirmEnabled()}
            >
              Confirm
            </button>
          )}
        </Stack>
        <div className="Lottery-methods">
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
            <label>Age & Registration priority</label>
          </div>
          <div className="options">
            <label>Min age for elderly [2nd draw]</label>
            <input
              onChange={(e) => setElderlyMinAge(e.target.value)}
              type="text"
            />
            <label>Percentage</label>
            <input
              onChange={(e) => setElderlyPercentage(e.target.value)}
              type="text"
            />
          </div>
          <div className="Methods-box">
            <input
              type="checkbox"
              checked={selectedMethod === "Age Priority"}
              onChange={() => handleCheckboxChange("Age Priority")}
            />
            <label>Age Category</label>
          </div>
          <div>
            <div className="options">
              <label>Min age for 1st category</label>
              <input
                onChange={(e) => setCategory1MinAge(e.target.value)}
                type="text"
              />
              <label>Percentage</label>
              <input
                onChange={(e) => setCategory1Percentage(e.target.value)}
                type="text"
              />
            </div>
            <div className="options">
              <label> Min age for 2nd category</label>
              <input
                onChange={(e) => setCategory2MinAge(e.target.value)}
                type="text"
              />
              <label>Percentage</label>
              <input
                onChange={(e) => setCategory2Percentage(e.target.value)}
                type="text"
              />
            </div>
            <div className="options">
              <label>Min age for 3rd category</label>
              <input
                onChange={(e) => setCategory3MinAge(e.target.value)}
                type="text"
              />
              <label>Percentage</label>
              <input
                onChange={(e) => setCategory3Percentage(e.target.value)}
                type="text"
              />
            </div>
          </div>
          <div className="Methods-box">
            <input
              type="checkbox"
              checked={selectedMethod === "Registration Priority"}
              onChange={() => handleCheckboxChange("Registration Priority")}
            />
            <label>Registration Priority</label>
          </div>
        </div>
      </Stack>
    </Box>
  );
};

export default Method;
