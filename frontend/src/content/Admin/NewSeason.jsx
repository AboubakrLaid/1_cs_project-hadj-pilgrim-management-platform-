import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import GroupsIcon from "@mui/icons-material/Groups";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useNavigate } from "react-router-dom";
import axios from "../../Api/base";
import useAuth from "../../Context/useAuth";

import UploadFileIcon from "@mui/icons-material/UploadFile";

const validDate = /^\d{4}\-(0?[1-9]|1[0-2])\-(0?[1-9]|[12]\d|3[01])$/;

const NewSeason = ({ onClose }) => {
  const { auth } = useAuth();

  const navigate = useNavigate();

  //Year
  const [year, setYear] = useState("");
  const [validYear, setValidYear] = useState(false);
  const [yearFocus, setYearFocus] = useState(false);
  //Total pilgrims
  const [totalP, setTotalP] = useState("");
  const [validTotalP, setValidTotalP] = useState(false);
  const [totalPFocus, setTotalPFocus] = useState(false);

  //Inscription deadline
  const [inscDeadline, setInscDeadline] = useState("");
  const [validInscDeadline, setValidInscDeadline] = useState(false);
  const [inscFocus, setInscFocus] = useState(false);

  //Procedure deadline
  const [procDeadline, setProcDeadline] = useState("");
  const [validProcDeadline, setValidProcDeadline] = useState(false);
  const [procFocus, setProcFocus] = useState(false);
  //Number of phases
  const [phaseNum, setPhaseNum] = useState("");
  const [validPhaseNum, setValidPhaseNum] = useState(false);
  const [pahseFocus, setPhaseFocus] = useState(false);

  //-----------------------Effects------------------//

  useEffect(() => {
    // Year validation
    if (year.length >= 4 && parseInt(year) >= 2024) {
      setValidYear(true);
    } else {
      setValidYear(false);
    }
  }, [year]);

  useEffect(() => {
    // Inscription deadline validation

    const procDateValid = procDeadline
      ? new Date(inscDeadline) < new Date(procDeadline)
      : true;

    setValidInscDeadline(validDate.test(inscDeadline) && procDateValid);
  }, [inscDeadline, procDeadline]);

  useEffect(() => {
    // Procedure deadline validation
    const inscDateValid = inscDeadline
      ? new Date(inscDeadline) < new Date(procDeadline)
      : true;

    setValidProcDeadline(validDate.test(procDeadline) && inscDateValid);
  }, [procDeadline, inscDeadline]);

  useEffect(() => {
    // Number of phases validation
    const numRegex = /^[0-9]+$/;
    const isValidPhaseNum =
      numRegex.test(phaseNum) &&
      (!inscDeadline ||
        !procDeadline || // No dates typed yet
        (new Date(procDeadline) - new Date(inscDeadline)) /
          (1000 * 60 * 60 * 24) /
          phaseNum >
          15);
    setValidPhaseNum(isValidPhaseNum);
  }, [phaseNum, inscDeadline, procDeadline]);

  useEffect(() => {
    // Total pilgrims validation
    const numRegex = /^[0-9]+$/;
    const validTotalP = numRegex.test(totalP);
    setValidTotalP(validTotalP);
  }, [totalP]);

  const handleSubmit = async (e) => {
    console.log("entered");
    e.preventDefault();

    if (
      validYear &&
      validTotalP &&
      validInscDeadline &&
      validProcDeadline &&
      validPhaseNum
    ) {
      //***********************************Algorithme */

      const inscriptionDeadline = new Date(inscDeadline);
      const procedureDeadline = new Date(procDeadline);

      // Calculate the total number of days in the period
      const totalDays =
        (procedureDeadline - inscriptionDeadline) / (1000 * 60 * 60 * 24);

      const phasesNumber = phaseNum;

      // Divide the total period into equal parts
      const partDays = Math.floor(totalDays / phasesNumber);

      // Calculate the start and end dates for each part

      const phase = [];
      for (let i = 0; i < phasesNumber; i++) {
        const partStartDate = new Date(
          inscriptionDeadline.getTime() + i * partDays * 24 * 60 * 60 * 1000
        );

        let partEndDate;
        if (i === phasesNumber - 1) {
          partEndDate = procedureDeadline;
        } else {
          partEndDate = new Date(
            inscriptionDeadline.getTime() +
              (i + 1) * partDays * 24 * 60 * 60 * 1000 -
              1
          );
        }

        // Format the dates to YYYY-MM-DD
        const formattedStartDate = partStartDate.toISOString().split("T")[0];
        const formattedEndDate = partEndDate.toISOString().split("T")[0];

        console.log(
          `Phase ${
            i + 1
          }: Starts on ${formattedStartDate}, Ends on ${formattedEndDate}`
        );

        phase.push({
          phase_number: i + 1,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
        });
      }

      //******************************END */

      const yearInteger = parseInt(year, 10);
      const totalPInteger = parseInt(totalP, 10);
      const payload = {
        year: yearInteger,
        total_pilgrims: totalPInteger,
        inscription_deadline: inscDeadline,
        procedure_deadline: procDeadline,
        wilayas_seats: newData,
        phases: phase,
      };
      console.log(payload);
      const access = localStorage.getItem("accessToken");
      console.log(access);
      try {
        const response = await axios.post("/pilgrimage/", payload, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        if (response.status === 201) {
          alert("success");
          navigate("/Admin/Season");
          //onclose=true

          // Check for successful login response data
        } else {
          alert(response.error);
          console.log("here is undefined?");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Request failed : Invalid cardenalities");
      }
    }
  };

  //File data
  const [data, setData] = useState([]);

  //handle CSV file
  const handleCSVChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target.result;
      const data = parseCSV(result);
      setData(data);
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  const parseCSV = (csv) => {
    const rows = csv
      .split("\n")
      .map((row) => row.trim())
      .filter((row) => row !== ""); // Trim whitespace and remove empty rows
    const headers = rows[0].split(","); // Extract headers (assuming they are separated by commas)
    const data = rows.slice(1).map((row) => {
      const values = row.split(","); // Split row into values (assuming they are separated by commas)
      const rowData = {};
      headers.forEach((header, index) => {
        rowData[header] = values[index] ? values[index].trim() : ""; // Trim whitespace and handle empty values
      });
      return rowData;
    });
    return data;
  };

  const newData = data.map((item) => ({
    wilaya: parseInt(item.wilaya),
    available_seats: parseInt(item.available_seats),
    extra_seats: parseInt(item.extra_seats),
  }));

  useEffect(() => {
    if (newData.length > 0) {
      console.log("All Data:");
      console.log(newData);
    } else {
      console.log("No data available.");
    }
  }, [newData]);
  //---------------------------------------------

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          transform: "translate(-50%,-50%)",
          left: "50%",
          top: "50%",
          maxHeight: "100vh",
          width: 500,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "auto",
          p: 5,
          borderRadius: 10,
          backgroundColor: "rgba(255, 255, 255, 1)",
        }}
      >
        <h5
          style={{
            color: "#000000",
            fontWeight: "bold",
            fontSize: "30px",
            height: 51,
          }}
        >
          New season
        </h5>

        <CloseIcon
          onClick={onClose}
          sx={{
            position: "absolute",
            top: "24px",
            right: "24px",
            cursor: "pointer",
            ":hover": { color: "red" },
          }}
        />

        <p style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.5)" }}>
          Customize details to ensure a harmonious pilgrimage
        </p>

        <Box
          sx={{
            p: 2,
            width: 400,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <form className="auth-form Login-form" onSubmit={handleSubmit}>
            <div
              className={
                !validYear && year && !yearFocus ? "invalid-input" : "input"
              }
            >
              <EventAvailableIcon fontSize="medium" className="icon" />
              <input
                type="text"
                placeholder="Year"
                onChange={(e) => setYear(e.target.value)}
                onFocus={() => setYearFocus(true)}
                onBlur={() => setYearFocus(false)}
                required
              />
            </div>

            {!validYear && year && !yearFocus && (
              <div className="error-container">
                <span className="error-msg">Please enter a valid year</span>
              </div>
            )}

            <div
              className={
                !validTotalP && totalP && !totalPFocus
                  ? "invalid-input"
                  : "input"
              }
            >
              <GroupsIcon fontSize="medium" className="icon" />
              <input
                type="text"
                placeholder="Total Pilgrims"
                onChange={(e) => setTotalP(e.target.value)}
                onFocus={() => setTotalPFocus(true)}
                onBlur={() => setTotalPFocus(false)}
                required
              />
            </div>
            {!validTotalP && totalP && !totalPFocus && (
              <div className="error-container">
                <span className="error-msg">Please enter a valid Number</span>
              </div>
            )}
            <div
              className={
                !validInscDeadline && inscDeadline && !inscFocus
                  ? "invalid-input"
                  : "input"
              }
            >
              <CalendarMonthIcon className="icon" />
              <input
                type="text"
                placeholder="YY-MM-DD"
                onChange={(e) => setInscDeadline(e.target.value)}
                onFocus={() => setInscFocus(true)}
                onBlur={() => setInscFocus(false)}
                required
              />
            </div>
            {!validInscDeadline && inscDeadline && !inscFocus && (
              <div className="error-container">
                <span className="error-msg">invalid Date </span>
              </div>
            )}

            <div
              className={
                !validProcDeadline && procDeadline && !procFocus
                  ? "invalid-input"
                  : "input"
              }
            >
              <CalendarMonthIcon className="icon" />
              <input
                type="text"
                placeholder="YY-MM-DD"
                onChange={(e) => setProcDeadline(e.target.value)}
                onFocus={() => setProcFocus(true)}
                onBlur={() => setProcFocus(false)}
                required
              />
            </div>
            {!validProcDeadline && procDeadline && !procFocus && (
              <div className="error-container">
                <span className="error-msg">Invalid date</span>
              </div>
            )}

            <div
              className={
                !validPhaseNum && phaseNum && !pahseFocus
                  ? "invalid-input"
                  : "input"
              }
            >
              <ReplayIcon className="icon" />
              <input
                type="text"
                placeholder="Phase's number"
                onChange={(e) => setPhaseNum(e.target.value)}
                onFocus={() => setPhaseFocus(true)}
                onBlur={() => setPhaseFocus(false)}
                required
              />
            </div>
            {!validPhaseNum && phaseNum && !pahseFocus && (
              <div className="error-container">
                <span className="error-msg">
                  So many phases comparing to deadlines
                </span>
              </div>
            )}
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVChange}
              id="uploadButton"
            />
            <label htmlFor="uploadButton">
              Upload CSV file
              <UploadFileIcon sx={{ ml: 3 }} />
            </label>

            <div className="sub-but">
              <button className="button" onClick={handleSubmit}>
                Confirm
              </button>
            </div>
          </form>
        </Box>
      </Box>
    </>
  );
};
export default NewSeason;
