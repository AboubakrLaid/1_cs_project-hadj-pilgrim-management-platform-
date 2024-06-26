import React, { useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  TextField,
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
} from "@mui/material";
import { Add, Remove, CloudUpload } from "@mui/icons-material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import CloseIcon from "@mui/icons-material/Close";
import axios from "../../Api/base";
import PropTypes from "prop-types";

const PatientHealthReview = ({ onClose, user }) => {
  PatientHealthReview.propTypes = {
    onClose: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  const [isSick, setIsSick] = useState(false);
  const [diseases, setDiseases] = useState([{ name: "", treatments: [""] }]);
  const [bloodType, setBloodType] = useState("");
  const [medicalOpinion, setMedicalOpinion] = useState("");
  const [file, setFile] = useState(null);
  const [isAccepted, setIsAccepted] = useState(false);

  const handleCheck = (event) => {
    setIsSick(event.target.checked);
    if (!event.target.checked) {
      setDiseases([{ name: "", treatments: [""] }]);
    }
  };

  const handleAddDisease = () => {
    if (diseases.length < 5) {
      setDiseases([...diseases, { name: "", treatments: [""] }]);
    }
  };

  const handleRemoveDisease = (index) => {
    if (diseases.length > 1) {
      const updatedDiseases = [...diseases];
      updatedDiseases.splice(index, 1);
      setDiseases(updatedDiseases);
    }
  };

  const handleAddTreatment = (index) => {
    if (diseases[index].treatments.length < 3) {
      const updatedDiseases = [...diseases];
      updatedDiseases[index].treatments.push("");
      setDiseases(updatedDiseases);
    }
  };

  const handleRemoveTreatment = (diseaseIndex, treatmentIndex) => {
    if (diseases[diseaseIndex].treatments.length > 1) {
      const updatedDiseases = [...diseases];
      updatedDiseases[diseaseIndex].treatments.splice(treatmentIndex, 1);
      setDiseases(updatedDiseases);
    }
  };

  const handleDiseaseNameChange = (index, event) => {
    const updatedDiseases = [...diseases];
    updatedDiseases[index].name = event.target.value;
    setDiseases(updatedDiseases);
  };

  const handleTreatmentChange = (diseaseIndex, treatmentIndex, event) => {
    const updatedDiseases = [...diseases];
    updatedDiseases[diseaseIndex].treatments[treatmentIndex] =
      event.target.value;
    setDiseases(updatedDiseases);
  };

  const handleBloodTypeChange = (event) => {
    setBloodType(event.target.value);
  };

  const handleMedicalOpinionChange = (event) => {
    setMedicalOpinion(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleRequest = async (e) => {
    console.log("user");
    const data = [
      {
        blood_type: bloodType,
        is_sick: isSick,
        is_healthy: !isSick,
        diseases: diseases.map((disease) => disease.name),
        treatments: diseases.reduce(
          (acc, curr) => acc.concat(curr.treatments),
          []
        ),
        medical_opinion: medicalOpinion,
        is_accepted: isAccepted,
      },
    ];
    console.log("data", data);

    console.log("user", user);
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `/health_reviews/${user.id}/add-patient-health-review/`,
        {
          blood_type: bloodType,
          is_sick: isSick,
          is_healthy: !isSick,
          diseases: data[0].diseases,
          treatments: data[0].treatments,
          medical_opinion: medicalOpinion,
          is_accepted: isAccepted,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
        alert("Request successful");
        onClose();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Request failed : Invalid cardinalities");
    }
  };

  const handleExit = () => {
    // Implement exit action
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "800px",
        maxHeight: "750px",
        backgroundColor: "#ffffff",
        borderRadius: "20px",
        padding: "20px",
        marginTop: "auto",
        marginBottom: "auto",
        boxShadow: `0px 0px 5px rgba(0, 0, 0, 0.2)` /* Apply shadow with border color */,
      }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{
          fontFamily: "Poppins",
          maxFontSize: "30px",
          fontWeight: 700,
          lineHeight: "22px",
          textAlign: "center",
        }}
      >
        Patient Health Review
      </Typography>
      <IconButton
        onClick={handleExit}
        sx={{
          position: "absolute",
          top: "5px",
          right: "5px",
          color: "rgb(0, 0, 0, 0.7)",
        }}
      >
        <CloseIcon onClick={onClose} />
      </IconButton>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={!isSick}
              onChange={handleCheck}
              sx={{ color: "#AB7595" }}
            />
          }
          label="Healthy"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isSick}
              onChange={handleCheck}
              sx={{ color: "#AB7595" }}
            />
          }
          label="Sick"
        />
        {isSick && (
          <Box sx={{ width: "100%" }}>
            {diseases.map((disease, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "10px",
                }}
              >
                <IconButton
                  onClick={() => handleRemoveDisease(index)}
                  sx={{ color: "red" }}
                >
                  <Remove />
                </IconButton>
                <TextField
                  placeholder={`Disease ${index + 1}`}
                  value={disease.name}
                  onChange={(e) => handleDiseaseNameChange(index, e)}
                  sx={{
                    width: "100px",
                    flex: "1",
                    marginRight: "5px",
                    borderRadius: "16px",
                    boxShadow: `0px 0px 5px #AB7595`,
                  }} /* Apply shadow with border color */
                />
                {index === diseases.length - 1 && (
                  <IconButton
                    onClick={handleAddDisease}
                    disabled={diseases.length === 5}
                    sx={{ color: "blue" }}
                  >
                    <Add />
                  </IconButton>
                )}
                {disease.treatments.map((treatment, treatmentIndex) => (
                  <Box
                    key={treatmentIndex}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "10px",
                    }}
                  >
                    <IconButton
                      onClick={() =>
                        handleRemoveTreatment(index, treatmentIndex)
                      }
                      sx={{ color: "red" }}
                    >
                      <Remove />
                    </IconButton>
                    <TextField
                      placeholder={`Treatment ${treatmentIndex + 1}`}
                      value={treatment}
                      onChange={(e) =>
                        handleTreatmentChange(index, treatmentIndex, e)
                      }
                      sx={{
                        width: "100px",
                        flex: "1",
                        marginRight: "5px",
                        borderRadius: "16px",
                        boxShadow: `0px 0px 5px #AB7595`,
                      }}
                    />
                    {treatmentIndex === disease.treatments.length - 1 && (
                      <IconButton
                        onClick={() => handleAddTreatment(index)}
                        disabled={disease.treatments.length === 3}
                        sx={{ color: "blue" }}
                      >
                        <Add />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        )}
        <Box sx={{ width: "368px", margin: "auto" }}>
          <TextField
            placeholder="Blood Type"
            value={bloodType}
            onChange={handleBloodTypeChange}
            InputProps={{
              endAdornment: (
                <IconButton disabled>
                  <BloodtypeIcon sx={{ color: "red" }} />
                </IconButton>
              ),
            }}
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
              borderRadius: "16px",
              boxShadow: `0px 0px 5px #AB7595`,
              width: "100%",
              height: "53px",
            }}
          />

          <label
            htmlFor="file-upload"
            style={{
              height: "53px",
              width: "100%",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "20px",
              boxShadow: `0px 0px 5px #AB7595`,
            }} /* Apply shadow with border color */
          >
            <span style={{ marginLeft: "10px", color: "rgba(0,0,0,0.4)" }}>
              Upload File
            </span>
            <FileDownloadIcon sx={{ color: "#AB7595", marginRight: "10px" }} />
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>

          <TextField
            placeholder="Medical Opinion"
            value={medicalOpinion}
            onChange={handleMedicalOpinionChange}
            multiline
            rows={2.5}
            sx={{
              width: "100%",
              marginBottom: "10px",
              borderRadius: "16px",
              boxShadow: `0px 0px 5px #AB7595`,
            }} /* Apply shadow with border color */
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsAccepted(true);
              handleRequest();
            }}
            sx={{
              marginRight: "10px",
              width: "160px",
              borderRadius: "25px",
              backgroundColor: "#AB7595",
            }}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setIsAccepted(false);
              handleRequest();
            }} // handleRefuse(
            sx={{
              width: "160px",
              borderRadius: "25px",
              backgroundColor: "#E7D9CA",
              color: "#000000",
            }}
          >
            Refuse
          </Button>
        </Box>
      </FormGroup>
    </Box>
  );
};

export default PatientHealthReview;
