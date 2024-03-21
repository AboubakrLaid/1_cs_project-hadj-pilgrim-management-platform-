import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import LockIcon from "@mui/icons-material/Lock";
import axios from "../Api/base";

const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,26}$/;

const PasswordReset = () => {
  const navigate = useNavigate();

  const [validLength, setValidLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidLength(password.length >= 8 && password.length <= 26);
    setHasUppercase(/[A-Z]/.test(password));
    setHasNumber(/\d/.test(password));
    setValidPassword(passwordPattern.test(password));
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validPassword) {
      const accessToken = localStorage.getItem("accessToken");
      console.log("Access Token:", accessToken);
      try {
        const response = await axios.post(
          "/auth/reset-password",
          { password },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200 && response.data.success) {
          // Password changed successfully
          console.log("Password changed successfully");
          setSuccess(true);
          setTimeout(() => {
            navigate("/Login");
          }, 2000);
          // Redirect or perform any other action
        } else {
          // Handle other scenarios such as missing fields or expired token
          console.error("Error:", response.data.error);
        }
      } catch (error) {
        console.error("Error:", error);
        if (error.response) {
          // Handle server response errors
          console.error("Error response:", error.response);
          if (error.response.status === 401) {
            alert("Authentication credentials were not provided");
          } else if (error.response.status === 400) {
            alert("Password is required");
          }
        } else {
          // Handle network errors
          alert("Network error occurred");
        }
      }
    } else {
      alert("Invalid Password");
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
          // mt: 12,
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
          Reset Password
        </h5>
        <p style={{ color: "rgba(0, 0, 0, 0.5)" }}>
          Please enter your new password
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
          <form className="auth-form Login-form" onSubmit={handleSubmit}>
            <div
              className={
                !validPassword && password && !passwordFocus
                  ? "invalid-input"
                  : "input"
              }
            >
              <LockIcon className="icon" />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                required
              />
            </div>
            {!validPassword && password && !passwordFocus && (
              <span
                style={{
                  color: "red",
                  position: "relative",
                  bottom: "18px",
                  left: "8px",
                  fontSize: "14px",
                }}
              >
                Invalid Password
                <br />
              </span>
            )}

            {success && (
              <span
                style={{
                  color: "green",
                  position: "relative",
                  bottom: "18px",
                  left: "8px",
                  fontSize: "14px",
                }}
              >
                Password changed successfully
                <br />
              </span>
            )}
            <span>
              Your password must contains:
              <br />
              <ul
                style={{
                  fontSize: "12px",
                  color:
                    !validPassword && password && !passwordFocus
                      ? "red"
                      : "rgba(0, 0, 0, 0.5)",
                }}
              >
                <li style={{ color: validLength ? "green" : "inherit" }}>
                  8 TO 26 characters
                </li>
                <li style={{ color: hasUppercase ? "green" : "inherit" }}>
                  At least one uppercase letter
                </li>
                <li style={{ color: hasNumber ? "green" : "inherit" }}>
                  At least one number
                </li>
              </ul>
            </span>

            <div className="sub-but">
              <button className="button" onClick={handleSubmit}>
                Done
              </button>
            </div>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default PasswordReset;
