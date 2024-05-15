import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const Number = /^[0-9]+$/;

const EditSeats = ({ onClose, seats, total, onData }) => {
  EditSeats.propTypes = {
    onClose: PropTypes.func.isRequired,
    seats: PropTypes.object.isRequired,
    total: PropTypes.object.isRequired,
    onData: PropTypes.object.isRequired,
  };
  const [addedSeats, setAddedSeats] = useState(0);
  const [validAddedSeats, setValidAddedSeats] = useState(false);
  const [addedSeatsFocus, setAddedSeatsFocus] = useState(false);

  useEffect(() => {
    setValidAddedSeats(Number.test(addedSeats) && addedSeats <= seats + total);
  }, [addedSeats]);

  console.log("giving seats", seats);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validAddedSeats) {
      localStorage.setItem("seats", parseInt(addedSeats) - total);
      onData(parseInt(addedSeats) - total);
      onClose();
      console.log("seats", parseInt(addedSeats) - total);
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        transform: "translate(-50%,-50%)",
        left: "50%",
        top: "50%",
        width: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "auto",
        p: { xs: 1, sm: 2 },
        borderRadius: 10,
        backgroundColor: "rgba(255, 255, 255, 1)",
        maxHeight: "95%",
        gap: "20px",
      }}
    >
      <h5
        style={{
          color: "#000000",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        Edit the seats
      </h5>

      <CloseIcon
        onClick={onClose}
        sx={{
          position: "absolute",
          top: "24px",
          right: "24px",
          cursor: "pointer",
          ":hover": { color: "red" },
        }}
      />
      <Stack
        direction={"column"}
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
        }}
      >
        <span style={{ fontWeight: 500 }}>
          available extra seats :{" "}
          <span style={{ color: "#AB7595", fontWeight: 600 }}>{seats}</span>
        </span>
        <form
          className="auth-form Login-form"
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "75%",
          }}
        >
          <div
            className={
              !validAddedSeats && addedSeats && !addedSeatsFocus
                ? "invalid-input"
                : "input"
            }
            style={{
              borderRadius: "5px",
              height: "40px",
              width: "250px",
            }}
          >
            <AddCircleOutlineOutlinedIcon
              fontSize="small"
              sx={{ color: "rgb(0, 0, 0, 0.7)", ml: "8px" }}
            />
            <input
              type="text"
              placeholder="New total seats "
              style={{
                fontSize: "12px",
                fontWeight: 600,
              }}
              onChange={(e) => setAddedSeats(e.target.value)}
              onFocus={() => setAddedSeatsFocus(true)}
              onBlur={() => setAddedSeatsFocus(false)}
            />
          </div>
          {!validAddedSeats && addedSeats && !addedSeatsFocus && (
            <div className="error-container">
              <span className="error-msg" style={{ top: -10 }}>
                number of seats is not available
              </span>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="button"
            style={{
              height: "40px",
              width: "150px",
              borderRadius: 30,
            }}
          >
            Accept
          </button>
        </form>
      </Stack>
    </Box>
  );
};

export default EditSeats;
