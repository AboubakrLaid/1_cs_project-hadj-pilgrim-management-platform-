import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayementImg from "../../assets/PayementImg.svg";
import CreditCrad from "../../assets/CreditCard.png";
import AddFile from "../../assets/AddFile.png";
import TaskIcon from "@mui/icons-material/Task";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
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
            <div
              className={
                !validTransactionNumber &&
                transactionNumber &&
                !transactionNumberFocus
                  ? "invalid-input"
                  : "input"
              }
              style={{ width: "300px", borderRadius: "15px" }}
            >
              <img src={CreditCrad} className="icon" />
              <input
                type="text"
                placeholder="Transaction number"
                onChange={(e) => setTransactionNumber(e.target.value)}
                onFocus={() => setTransactionNumberFocus(true)}
                onBlur={() => setTransactionNumberFocus(false)}
                required
              />
            </div>
          </form>
          {/* ----------------inputs---------------------*/}
          <Box
            // onClick={handleAddFile}

            onClick={() => {
              // Programmatically trigger the file input when the Box is clicked
              document.getElementById("fileInput").click();
            }}
            sx={{
              height: "140px",
              width: "300px",
              position: "relative",
              bottom: "16px",
              bgcolor: "rgba(0, 0, 0, 0.1)",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 4,
              textAlign: "center",
              gap: 1,
              cursor: "pointer",
              transition: "all 0.2s linear ",
              ":hover": {
                cursor: "pointer",
                bgcolor: "rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              style={{ display: "none" }}
              id="fileInput"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
              }}
            />
            {!selectedFile && (
              <img
                src={AddFile}
                alt="AddImage"
                style={{
                  height: "40px",
                  width: "40px",
                }}
              />
            )}
            {!selectedFile && (
              <span style={{ fontSize: "14px", color: "rgba(0, 0, 0, 0.5)" }}>
                <span style={{ fontWeight: 600, color: "black" }}>
                  Click to upload
                </span>{" "}
                or drag and drop the receipt as PNG,JPG image
              </span>
            )}
            {selectedFile && (
              <>
                <TaskIcon fontSize="large" style={{ color: "#4bb543" }} />
                <span
                  style={{
                    fontSize: "14px",
                    color: "rgba(75, 181, 67, 0.9)  ",
                    fontWeight: 600,
                  }}
                >
                  File Uploaded Succefully
                </span>
              </>
            )}
          </Box>

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
