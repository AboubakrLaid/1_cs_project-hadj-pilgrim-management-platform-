import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayementImg from "../../assets/PayementImg.svg";
import CreditCrad from "../../assets/CreditCard.png";
import AddFile from "../../assets/AddFile.png";
import TaskIcon from "@mui/icons-material/Task";
import axios from "../../Api/base";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
const Number = /^\d{9}$/;

const Payement = () => {
  const [transactionNumber, setTransactionNumber] = useState("");
  const [validTransactionNumber, setValidTransactionNumber] = useState(false);
  const [transactionNumberFocus, setTransactionNumberFocus] = useState(false);

  //File
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setValidTransactionNumber(Number.test(transactionNumber));
  }, [transactionNumber, validTransactionNumber]);

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const access = localStorage.getItem("accessToken");

    if (selectedFile) {
      try {
        const response = await axios.post(
          "/payment/validate/",
          {
            file: selectedFile,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${access}`,
            },
          }
        );
        console.log(response);

        if (response.status === 201 && response.data.success) {
          alert("validated succesfully");
          navigate("/Home/Reservation");
        }
      } catch (error) {
        // Handle errors here
        console.error("Error:", error);
      }
    }
  };

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Box
        style={{
          height: "120px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <h1 style={{ marginLeft: "20px" }}>Welcome Back</h1>
        <div style={{ flex: 1 }} />
        <button
          onClick={handleLogOut}
          className="button"
          style={{
            marginRight: "40px",
            height: "46px",
            width: "140px",
            borderRadius: 30,
          }}
        >
          Log Out
        </button>
      </Box>
      <Box
        sx={{
          height: { xs: "1000px", md: "80%" },

          width: "100%",
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          justifyContent: "space-between",
          alignItems: "center",
          margin: "auto",
          px: { xs: 2, md: 12 },

          gap: { xs: "20px", md: "80px" },
        }}
      >
        <Box
          sx={{
            width: { xs: "80%", sm: "65%", md: "37%" },
            height: "75%",
            border: "1px solid #ab7595",
            boxShadow: "5px 5px 4px #ab7595",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            py: 3,
          }}
        >
          <span style={{ fontSize: "24px", fontWeight: 600 }}>
            Confirmation
          </span>
          <span
            style={{
              color: "rgba(0, 0, 0, 0.8)",
              fontSize: "12px",
              fontWeight: "light",
            }}
          >
            We sent you an Email. Please verify your transaction number
          </span>
          {/* ----------------inputs---------------------*/}
          <form className="auth-form Login-form" onSubmit={handleSubmit}>
            <div>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                required
                id="PDFbutton"
              />
              <label htmlFor="PDFbutton">
                <UploadOutlinedIcon
                  sx={{ mr: 2, color: "rgb(0, 0, 0, 0.5)" }}
                />
                {selectedFile ? "File uploaded" : "Upload receipt (.pdf) "}
              </label>
            </div>
          </form>
          {/* ----------------inputs---------------------*/}

          <button
            className="button"
            onClick={handleSubmit}
            style={{
              width: "300px",
              height: "40px",
            }}
          >
            Validate
          </button>
        </Box>
        <Box
          sx={{
            width: { xs: "90%", md: "40%" },
            height: "75%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 2,
          }}
        >
          <img
            style={{ height: "100%", width: "100%" }}
            src={PayementImg}
            alt="Payement"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Payement;
