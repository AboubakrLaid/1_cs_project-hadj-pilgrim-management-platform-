import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
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

function NewDoctor({ onClose }) {
  NewDoctor.propTypes = {
    onClose: PropTypes.func.isRequired,
  };
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
      image: e.target.files[0],
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

  /*const handleAddAnother = () => {
    setDoctors((prevDoctors) => [
      ...prevDoctors,
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
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle form submission here
      console.log("Doctors added successfully!", doctors);
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
            onClick={() => {
              // Handle exit action
            }}
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
            <CloseIcon onClick={onClose} />
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
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  value={doctor.state}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                />
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
                  <option value="other">Other</option>
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
                <input
                  type="text"
                  placeholder="Hospital Name"
                  name="hospitalName"
                  value={doctor.hospitalName}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                />
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
              <AddPhotoAlternateIcon fontSize="medium" className="icon" />
              <p>Image</p>
              <input
                style={{ justifyContent: "space-between", marginRight: "10px" }}
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => handleFileChange(e, index)}
              />
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
                height: "190px",
                width: "720px",
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
                  {doctor.availability.map((timeSlot, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell>{timeSlot.time}</TableCell>
                      {timeSlot.days.map((day, colIndex) => (
                        <TableCell
                          key={colIndex}
                          onClick={() =>
                            handleAvailabilityClick(rowIndex, colIndex, index)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {day === "checked" ? (
                            <CheckIcon fontSize="medium" className="icon" />
                          ) : (
                            ""
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
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
