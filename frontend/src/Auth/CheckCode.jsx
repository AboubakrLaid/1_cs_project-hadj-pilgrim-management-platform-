import { Link, useNavigate } from "react-router-dom";

import axios from "../Api/base";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReactCodeInput from "react-code-input";

const RecoverPassword = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [validCode, setValidCode] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setValidCode(code.length === 6);
  }, [code]);

  const handlePinChange = (value) => {
    setCode(value);
  };

  const handleSendAgain = async (e) => {
    e.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validCode) {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
      console.log(code);
      setCode(code.toString());

      try {
        const response = await axios.post(
          "/auth/code-verification",
          { code },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
              //RefreshToken: refreshToken,
            },
          }
        );

        if (response.status === 200 && response.data.success) {
          // Code verified successfully
          console.log("Code verified successfully");
          navigate("/Reset-Password");
          // Redirect or perform any other action
        } else {
          // Handle other scenarios such as invalid code or missing tokens
          console.error("Error:", response.data.error);
          setErr(response.data.error);
          console.log("ana");
        }
      } catch (error) {
        console.error("Error:", error);
        console.log("here");
        if (error.response) {
          // Handle server response errors
          console.error("Error response:", error.response);
          if (error.response.status === 401) {
            setErr("Invalid code");
          } else if (error.response.status === 400) {
            setErr("Code is required");
          }
        } else {
          // Handle network errors
          setErr("Network error occurred");
        }
      }
    } else {
      setErr("Enter all 6 digits");
    }
  };

  return (
    <div className="auth-body">
      <Link to="/Forget-Password">
        <ArrowBackIcon fontSize="large" sx={{ mt: 4, ml: 4 }} />
      </Link>
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
          //mt: 12,
          p: 5,
          borderRadius: 10,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
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
          Check your email
        </h5>
        <p style={{ color: "rgba(0, 0, 0, 0.5)" }}>
          Enter the 6 degit code sent to your Email
        </p>

        <Box
          sx={{
            p: 2,
            width: 400,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <ReactCodeInput
            className="no-arrows"
            autoFocus="false"
            type="number"
            //isValid={isPinCodeValid}
            fields={6}
            onChange={handlePinChange}
            value={code}
          />
          <span style={{ color: "red" }}>{err}</span>

          <div className="sub-but">
            <button className="button" onClick={handleSubmit}>
              Verify
            </button>
          </div>
          <div className="sub-but">
            <button
              style={{
                width: "100%",
                borderRadius: "30px",
                border: "1px solid black",
                backgroundColor: "white",
                color: "black",
                fontWeight: "600",
                fontSize: "16px",
                cursor: "pointer",
                transition: "background-color 0.5s ease",
              }}
              onClick={handleSendAgain}
            >
              Send again
            </button>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default RecoverPassword;
