import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckIcon from "@mui/icons-material/Check";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import axios from "../../Api/base";

function NewDoctor({ onClose }) {
  NewDoctor.propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  const [selectedCells, setSelectedCells] = useState([]);

  const postData = {
    work_schedule: [],
  };

  // Group time slots by day
  const workSchedule = {};
  selectedCells?.forEach((cell) => {
    if (!workSchedule[cell.day]) {
      workSchedule[cell.day] = [];
    }
    workSchedule[cell.day].push(cell.time);
  });

  // Transform workSchedule object into an array
  Object.keys(workSchedule).forEach((day) => {
    postData.work_schedule.push({
      day: day,
      times: workSchedule[day],
    });
  });

  // Now postData is formatted as desired
  console.log("postdata ", postData);

  const handleClick = (day, time) => {
    const cellIndex = selectedCells.findIndex(
      (cell) => cell.day === day && cell.time === time
    );
    if (cellIndex === -1) {
      // Cell not found, add it to selectedCells
      setSelectedCells([...selectedCells, { day, time }]);
    } else {
      // Cell found, remove it from selectedCells
      setSelectedCells(selectedCells.filter((_, index) => index !== cellIndex));
    }
  };

  const isSelected = (day, time) => {
    return selectedCells.some((cell) => cell.day === day && cell.time === time);
  };
  console.log(selectedCells);

  const [doctors, setDoctors] = useState([
    {
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      password: "",
      confirmPassword: "",
      state: "",
      phoneNumber: "",
      hospitalName: "",
      roomId: "",
      image: null,
      availability: [
        { time: "8:00-12:00", days: ["", "", "", "", "", "", ""] },
        { time: "14:00-16:00", days: ["", "", "", "", "", "", ""] },
      ],
    },
  ]);

  const [stateOptions, setStateOptions] = useState([]);
  const [hospitalOptions, setHospitalOptions] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get("/administrative/wilayas");
        console.log(response.data);

        const fetchedOptions = response.data.map((item) => ({
          value: item.name,
          label: item.id,
        }));

        setStateOptions(fetchedOptions);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    console.log("fetching hospitals");
    const access = localStorage.getItem("accessToken");
    const fetchHospitals = async () => {
      if (doctors[0].state) {
        try {
          const response = await axios.get("/accounts/hospitals-in-wilaya/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access}`,
            },
          });
          console.log("Hospitals:", response.data);

          const fetchedOptions = response.data.map((item) => ({
            value: item.name,
            label: item.id,
          }));

          setHospitalOptions(fetchedOptions);
          console.log("Hospital options:", hospitalOptions);
        } catch (error) {
          console.error("Error fetching hospitals:", error);
        }
      }
    };

    fetchHospitals();
  }, [doctors[0].state]);
  console.log("Doctors:", doctors);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDoctors = [...doctors];
    updatedDoctors[index] = {
      ...updatedDoctors[index],
      [name]: value,
    };
    setDoctors(updatedDoctors);
  };

  const handleFileChange = (e, index) => {
    const updatedDoctors = [...doctors];
    updatedDoctors[index] = {
      ...updatedDoctors[index],
      image: e,
    };
    setDoctors(updatedDoctors);
  };

  const handleAvailabilityClick = (rowIndex, colIndex, index) => {
    const updatedDoctors = [...doctors];
    updatedDoctors[index].availability[rowIndex].days[colIndex] =
      updatedDoctors[index].availability[rowIndex].days[colIndex] === "checked"
        ? ""
        : "checked";
    setDoctors(updatedDoctors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (doctors[0].gender === "male") {
      doctors[0].gender = "M";
    } else {
      doctors[0].gender = "F";
    }
    doctors[0].state = parseInt(doctors[0].state);
    console.log("Doctors:", doctors[0]);
    try {
      const access = localStorage.getItem("accessToken");
      const response = await axios.post(
        `/accounts/add-medical-admin/`,
        {
          user: {
            first_name: doctors[0].firstName,
            last_name: doctors[0].lastName,
            email: doctors[0].email,
            gender: doctors[0].gender,
            role: "MedicalAdmin",
          },
          hospital_name: doctors[0].hospitalName,
          work_schedule: postData.work_schedule,
          profile_picture: null,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );
      console.log("Response:", response.data);
      onClose();
    } catch (error) {
      console.error("Error adding doctors:", error);
    }
  };

  return (
    <div className="auth-body">
      {doctors.map((doctor, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            transform: "translate(-50%,-50%)",
            left: "50%",
            top: `${50 + index * 70}%`,
            width: "900px",
            height: "650px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            borderRadius: 10,
            backgroundColor: "#ffffff",
          }}
        >
          <Button
            onClick={onClose}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "transparent",
              color: "#000000",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <CloseIcon />
          </Button>

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: "#000000", marginBottom: "-1px", marginTop: "5px" }}
          >
            New Doctor
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "rgba(0, 0, 0, 0.5)",
              textAlign: "center",
              marginBottom: "12px",
              marginTop: "1px",
            }}
          >
            Enter doctor&apos;s information to add it to our hajj management
          </Typography>

          <form className="new-form" onSubmit={handleSubmit}>
            {/* Form inputs */}
            <div
              className="name-inputs"
              style={{ display: "flex", marginBottom: "-5px" }}
            >
              <div className="input" style={{ marginRight: "10px" }}>
                <PersonIcon fontSize="medium" className="icon" />
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={doctor.firstName}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                />
              </div>
              <div className="input" style={{ marginRight: "10px" }}>
                <EmailIcon fontSize="medium" className="icon" />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={doctor.email}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                />
              </div>
              <div className="input">
                <LocationOnIcon fontSize="medium" className="icon" />
                <select
                  name="state"
                  value={doctor.state}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                >
                  <option value="">Select State</option>
                  {stateOptions.map((state) => (
                    <option key={state.label} value={state.label}>
                      {state.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Additional inputs */}
            <div
              className="email-password"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "-5px",
                width: "100%",
              }}
            >
              <div className="input" style={{ marginRight: "10px" }}>
                <PersonIcon fontSize="medium" className="icon" />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={doctor.lastName}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                />
              </div>
              <div className="input" style={{ marginRight: "10px" }}>
                <LockIcon fontSize="medium" className="icon" />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={doctor.password}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                />
              </div>
              <div className="input">
                <LocalPhoneIcon fontSize="medium" className="icon" />
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={doctor.phoneNumber}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                />
              </div>
            </div>
            <div
              className="gender"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "-5px",
                width: "100%",
              }}
            >
              <div className="input" style={{ marginRight: "10px" }}>
                <PersonIcon fontSize="medium" className="icon" />
                <select
                  name="gender"
                  value={doctor.gender}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="input" style={{ marginRight: "10px" }}>
                <VisibilityOffIcon fontSize="medium" className="icon" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={doctor.confirmPassword}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                />
              </div>
              <div className="input">
                <LocalHospitalIcon fontSize="medium" className="icon" />
                <select
                  name="hospitalName"
                  value={doctor.hospitalName}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                >
                  <option value="">Select Hospital</option>
                  {hospitalOptions.map((hospital) => (
                    <option key={hospital.value} value={hospital.value}>
                      {hospital.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div
              className="input"
              style={{
                color: "rgba(0, 0, 0, 0.5)",
                width: "32%",
                marginBottom: "15px",
              }}
            >
              <div>
                <input
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files[0], index)}
                  id={`uploadButton${index}`}
                />
                <label htmlFor={`uploadButton${index}`}>
                  <AccountBoxIcon fontSize="medium" className="icon" />
                  image
                </label>
              </div>
            </div>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(0, 0, 0, 0.5)",
                marginTop: "-5px",
                marginBottom: "10px",
              }}
            >
              Available time:
            </Typography>

            {/* Table Component */}
            <TableContainer
              component={Paper}
              sx={{
                border: "2px solid #ab7595",
                height: "210px",
                width: "740px",
                marginBottom: "1px",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Saturday</TableCell>
                    <TableCell>Sunday</TableCell>
                    <TableCell>Monday</TableCell>
                    <TableCell>Tuesday</TableCell>
                    <TableCell>Wednesday</TableCell>
                    <TableCell>Thursday</TableCell>
                    <TableCell>Friday</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ height: "70px" }}>
                    <TableCell>8:00-12:00</TableCell>
                    {[
                      "Saturday",
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                    ].map((day) => (
                      <TableCell
                        key={day}
                        onClick={() => handleClick(day, "8:00-12:00")}
                      >
                        {isSelected(day, "8:00-12:00") && (
                          <CheckIcon fontSize="medium" className="icon" />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow sx={{ height: "70px" }}>
                    <TableCell>14:00-16:00</TableCell>
                    {[
                      "Saturday",
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                    ].map((day) => (
                      <TableCell
                        key={day}
                        onClick={() => handleClick(day, "14:00-16:00")}
                      >
                        {isSelected(day, "14:00-16:00") && (
                          <CheckIcon fontSize="medium" className="icon" />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <div
              className="button-row"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                type="submit"
                sx={{
                  backgroundColor: "#ab7595",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  borderRadius: "30px",
                  width: "200px",
                  height: "50px",
                  marginTop: "20px",
                  marginBottom: "150px",
                }}
              >
                Confirm
              </Button>
            </div>
          </form>
        </Box>
      ))}
    </div>
  );
}

export default NewDoctor;
