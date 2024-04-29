import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "../../Api/base";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FaIdCard } from "react-icons/fa";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Link, useNavigate } from "react-router-dom";

const NIN = /^\d{18}$/;
const date = /^(?:19|20)\d{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;
const Number = /^(0)(5|6|7)([0-9]{8})$/;
const Participation = () => {
  const gender = localStorage.getItem("gender");
  console.log(gender);
  const navigate = useNavigate();

  //State  options
  const [stateOptions, setStateOptions] = useState([]);

  //municipal options
  const [municipalOptions, setMunicipalOptions] = useState([]);

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

  //State
  const [state, setState] = useState("");
  const [validState, setValidState] = useState(false);

  //Municipal
  const [municipal, setMunicipal] = useState("");
  const [validMunicipal, setValidMunicipal] = useState(false);

  useEffect(() => {
    setValidNin(NIN.test(nin));
  }, [nin]);

  useEffect(() => {
    setValidBirthday(date.test(birthday));
  }, [birthday]);

  useEffect(() => {
    setValidPhoneNumber(Number.test(phoneNumber));
  }, [phoneNumber]);

  useEffect(() => {
    setValidState(state);
  }, [state]);

  if (parseInt(state) === 21) {
    console.log("state is int");
  }
  if (parseInt(municipal) === 362) {
    console.log("municipal is int");
  }

  useEffect(() => {
    setValidMunicipal(municipal);
  }, [municipal]);

  //State fetching

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/administrative/wilayas");
        console.log(response.data);

        const fetchedOptions = response.data.map((item) => ({
          value: item.name,
          label: item.id,
        }));

        setStateOptions(fetchedOptions);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/administrative/wilaya/${state}/municipals`
        );
        console.log(response.data);

        const fetchedMun = response.data.map((item) => ({
          value: item.name,
          key: item.id,
        }));
        setMunicipalOptions(fetchedMun);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [state]);

  console.log(municipal);
  const handleWilaya = (e) => {
    setState(e.target.value);
  };
  const handleMunicipal = (e) => {
    setMunicipal(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log("entered");
    e.preventDefault();
    if (
      validBirthday &&
      validNin &&
      validPhoneNumber &&
      validState &&
      validMunicipal
    ) {

      const access = localStorage.getItem("accessToken");


      try {
        const response = await axios.post(
          "/profile/",
          {
            nin: nin,
            phone_number: phoneNumber,
            birth_date: birthday,
            municipal: parseInt(municipal),
            wilaya: parseInt(state),
          },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        console.log(response.data);
        console.log("here");


        if (response.status === 201) {

          navigate("/Home/Draw");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please fill all the fields with valid entry");
    }
  };

  const handleContinue = () => {
    const data = {
      nin: nin,
      phone_number: phoneNumber,
      birth_date: birthday,
      municipal: municipal,
      wilaya: state,
    };
    localStorage.setItem("ParticipateData", data);
    navigate("/Participate/Companion");
  };

  return (
    <div className="auth-body">
      <Link to="/">
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
          Registration
        </h5>
        <p style={{ color: "rgba(0, 0, 0, 0.5)" }}>
          Complete our registration form to start your Hajj experience
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
                placeholder="Birthday (YYYY-MM-DD)"
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

            {/* --------------- State selection ------------- */}

            <div className={!validState && state ? "invalid-input" : "input"}>
              <select
                required
                className="custom-select"
                onChange={handleWilaya}
              >
                <option value="">Select Wilaya</option>
                {stateOptions.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>

            {/*------------------- State selection end---------------*/}

            {/* --------------- Municipal selection ------------- */}

            <div
              className={
                !validMunicipal && municipal ? "invalid-input" : "input"
              }
            >
              <select
                required
                className="custom-select"
                onChange={handleMunicipal}
              >
                <option value="">Select Municipal</option>
                {municipalOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>

            {/*------------------- Municipal selection end---------------*/}

            {gender === "M" && (
              <div className="sub-but">
                <button className="button" onClick={handleSubmit}>
                  Confirm
                </button>
              </div>
            )}
            {gender === "F" && (
              <div className="sub-but">
                <button className="button" onClick={handleContinue}>
                  Continue
                </button>
              </div>
            )}
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default Participation;