import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import axios from "../../Api/base";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FaIdCard } from "react-icons/fa";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link, useNavigate } from "react-router-dom";

const NIN = /^\d{18}$/;
const date = /^(?:19|20)\d{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;
const Number = /^(0)(5|6|7)([0-9]{8})$/;
const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

const Companion = () => {
  //First name states
  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);
  //Last name states
  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  //NIN
  const [nin, setNin] = useState("");
  const [validNin, setValidNin] = useState(false);
  const [ninFocus, setNinFocus] = useState(false);

  //Birthday
  const [birthday, setBirthday] = useState("");
  const [validBirthday, setValidBirthday] = useState(false);
  const [birthdayFocus, setBirthdayFocus] = useState(false);
  //Phone Number
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

  useEffect(() => {
    setValidFirstName(nameRegex.test(firstName));
  }, [firstName]);

  useEffect(() => {
    setValidLastName(nameRegex.test(lastName));
  }, [lastName]);

  useEffect(() => {
    setValidNin(NIN.test(nin));
  }, [nin]);

  useEffect(() => {
    setValidBirthday(date.test(birthday));
  }, [birthday]);

  useEffect(() => {
    setValidPhoneNumber(Number.test(phoneNumber));
  }, [phoneNumber]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("entered");
    e.preventDefault();
    if (
      validFirstName &&
      validLastName &&
      validBirthday &&
      validNin &&
      validPhoneNumber
    ) {
      const participantData = localStorage.getItem("ParticipateData");
      const data = {
        participantData,
        Companion: {
          first_name: firstName,
          last_name: lastName,
          nin: nin,
          phone_number: phoneNumber,
          birth_date: birthday,
        },
      };
      const access = localStorage.getItem("accessToken");
      console.log(data);

      try {
        const response = await axios.post(
          "/auth/profile/",
          JSON.stringify({
            data,
          }),
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        console.log(response.data);
        console.log("here");

        if (response.status === 200 && response.data.success) {
          try {
            const lotteryResponse = await axios.post(
              "/lottery/",
              {},
              {
                headers: {
                  Authorization: `Bearer ${access}`,
                },
              }
            );
            console.log(lotteryResponse.data);

            if (
              lotteryResponse.status === 200 &&
              lotteryResponse.data.success
            ) {
              console.log("lottery endpoint success");
              navigate("/Home/Draw");
            } else {
              console.log("lottery endpoint failed", lotteryResponse);
            }
          } catch (error) {
            console.error("Lottery Error:", error);
          }
        }
      } catch (error) {
        // Handle errors here
        console.error("Error:", error);
      }
    } else {
      alert("Erorr");
    }
  };

  return (
    <div className="auth-body">
      <Link to="/Participate">
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
          //mt: 10,
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
          Companion Information
        </h5>
        <p style={{ color: "rgba(0, 0, 0, 0.5)" }}>
          Complete Companion’s information to validate your registration
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
                !validFirstName && firstName && !firstNameFocus
                  ? "invalid-input"
                  : "input"
              }
            >
              <PersonIcon fontSize="medium" className="icon" />
              <input
                type="text"
                placeholder="First name"
                onChange={(e) => setFirstName(e.target.value)}
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
                required
              />
            </div>
            <div
              className={
                !validLastName && lastName && !lastNameFocus
                  ? "invalid-input"
                  : "input"
              }
            >
              <PersonIcon fontSize="medium" className="icon" />
              <input
                type="text"
                placeholder="Last name"
                onChange={(e) => setLastName(e.target.value)}
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
                required
              />
            </div>
            <div
              className={
                !validNin && nin && !ninFocus ? "invalid-input" : "input"
              }
            >
              <FaIdCard fontSize="medium" className="icon" />
              <input
                type="text"
                placeholder="NIN"
                onChange={(e) => setNin(e.target.value)}
                onFocus={() => setNinFocus(true)}
                onBlur={() => setNinFocus(false)}
                required
              />
            </div>
            {!validNin && nin && !ninFocus && (
              <div className="error-container">
                <span className="error-msg">
                  Please enter a valid NIN -18 Numbers-
                </span>
              </div>
            )}
            <div
              className={
                !validBirthday && birthday && !birthdayFocus
                  ? "invalid-input"
                  : "input"
              }
            >
              <CalendarMonthIcon className="icon" />
              <input
                type="text"
                placeholder="Birthday"
                onChange={(e) => setBirthday(e.target.value)}
                onFocus={() => setBirthdayFocus(true)}
                onBlur={() => setBirthdayFocus(false)}
                required
              />
            </div>
            {!validBirthday && birthday && !birthdayFocus && (
              <div className="error-container">
                <span className="error-msg">invalid date : YYYY-MM-DD </span>
              </div>
            )}

            <div
              className={
                !validPhoneNumber && phoneNumber && !phoneNumberFocus
                  ? "invalid-input"
                  : "input"
              }
            >
              <LocalPhoneIcon className="icon" />
              <input
                type="text"
                placeholder="Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                onFocus={() => setPhoneNumberFocus(true)}
                onBlur={() => setPhoneNumberFocus(false)}
                required
              />
            </div>
            {!validPhoneNumber && phoneNumber && !phoneNumberFocus && (
              <div className="error-container">
                <span className="error-msg">
                  Invalid phone number , example:0755555555
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
    </div>
  );
};

export default Companion;
