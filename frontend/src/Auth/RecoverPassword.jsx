import { Link } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import axios from "../Api/base";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const RecoverPassword = () => {
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  useEffect(() => {
    setValidEmail(emailPattern.test(email));
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validEmail) {
      console.log(email);
      try {
        const response = await axios.post("/auth/email-verification", {
          email,
        });
        if (response.status === 200) {
          const responseData = response.data;
          console.log(response.data);
          if (responseData.access && responseData.refresh) {
            // Successful response, save tokens and navigate to next step
            localStorage.setItem("accessToken", responseData.access);
            localStorage.setItem("refreshToken", responseData.refresh);
            // history.push("/enter-code"); // Replace with your next step route

            navigate("/Check-Code");
          } else {
            console.error("Invalid response data:", responseData);
          }
        } else if (response.status === 401) {
          setErr("Invalid email");
        }
      } catch (error) {
        // Handle network errors or Axios request errors
        console.error("Error:", error);
        setErr("Invalid email");
      }
    } else {
      alert("Invalid Entry");
    }
  };

  return (
    <div className="auth-body">
      <Link to="/Login">
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
          //mt: 20,
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
          Password Recovery
        </h5>
        <p style={{ color: "rgba(0, 0, 0, 0.5)" }}>
          Enter your Email to recover your password
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
                (!validEmail && email && !emailFocus) || err
                  ? "invalid-input"
                  : "input"
              }
            >
              <EmailOutlinedIcon fontSize="medium" className="icon" />
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                required
              />
            </div>
            {((!validEmail && email && !emailFocus) || err) && (
              <div className="error-container">
                {err ? (
                  <span className="error-msg">invalid email</span>
                ) : (
                  <span className="error-msg">Please enter a valid email</span>
                )}
              </div>
            )}

            <div className="sub-but">
              <button className="button" onClick={handleSubmit}>
                Recover
              </button>
            </div>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default RecoverPassword;
