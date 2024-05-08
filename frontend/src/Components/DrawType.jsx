import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../Api/base";

const DrawType = () => {
  const [selectedType, setSelectedType] = useState("");
  const [municipalsnames, setMunicipalsNames] = useState([]);
  const [municipalsids, setMunicipalsIds] = useState([]);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleClick = () => {
    if (selectedType === "wilaya") {
      //fetch municipals
      const state = localStorage.getItem("wilaya_id");

      const fetchData = async () => {
        try {
          const response = await axios.get(
            `/administrative/wilaya/${state}/municipals`
          );
          console.log("response", response.data);

          const fetchedMun = response.data.map((item) => ({
            name: item.name,
          }));
          setMunicipalsNames(fetchedMun);
          const fetchids = response.data.map((item) => ({
            id: item.id,
          }));
          setMunicipalsIds(fetchids);
          console.log("municipals in the draw type fetch are", municipalsids);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchData();
      console.log("municipals in the draw type are", municipalsids);
      if (municipalsids.length > 0 && municipalsnames.length > 0) {
        navigate("/Admin/Lottery");
      }

      //////////
    } else {
      navigate("/Admin/Grouping");
    }
  };
  if (municipalsids.length > 0 && municipalsnames.length > 0) {
    localStorage.setItem("municipals_ids", JSON.stringify(municipalsids));
    localStorage.setItem("municipals_names", JSON.stringify(municipalsnames));
    navigate("/Admin/Lottery");
  }
  return (
    <div className="DrawType-body">
      <button
        onClick={handleLogOut}
        className="button"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          height: "46px",
          width: "140px",
          fontSize: "18px",
          borderRadius: 30,
        }}
      >
        Log Out
      </button>

      <Box
        sx={{
          width: "700px",

          padding: "25px",
          borderRadius: "20px",
          border: "3px solid #AB7595",
          backgroundColor: "white",
          marginBottom: "90px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            fontSize: "28px",
            height: "65px",
            color: "#000000",
          }}
        >
          Draw <span style={{ color: "#ab7595" }}>type</span> Selection
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            textAlign: "center",
            color: "#000000",
          }}
        >
          Please choose which type of selection is more appropriate for draw
          process
        </Typography>
        <div
          className="Lottery-methods"
          style={{
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            className="Methods-box"
            style={{ marginBottom: "8px", width: "200px" }}
          >
            <input
              type="checkbox"
              checked={selectedType === "wilaya"}
              onChange={() => setSelectedType("wilaya")}
            />
            <label>Draw by wilaya</label>
          </div>
          <div className="Methods-box" style={{ width: "200px" }}>
            <input
              checked={selectedType === "municipal"}
              type="checkbox"
              onChange={() => setSelectedType("municipal")}
            />
            <label>Draw by municipal</label>
          </div>
        </div>
        {selectedType && (
          <button
            onClick={handleClick}
            className="button"
            style={{ width: "30%", height: "50px", borderRadius: "15px" }}
          >
            Confirm
          </button>
        )}
      </Box>
    </div>
  );
};

export default DrawType;
