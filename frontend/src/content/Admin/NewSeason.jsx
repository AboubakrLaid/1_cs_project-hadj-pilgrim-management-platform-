import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";

const validDate = /^\d{4}\-(0?[1-9]|1[0-2])\-(0?[1-9]|[12]\d|3[01])$/;

const NewSeason = ({ onClose }) => {
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
  };

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
              <PersonIcon fontSize="medium" className="icon" />
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
              <EmailIcon fontSize="medium" className="icon" />
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
              <LockIcon className="icon" />
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
              <LockIcon className="icon" />
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
              <LockIcon className="icon" />
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
