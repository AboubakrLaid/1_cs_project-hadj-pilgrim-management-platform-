import {
  Box,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import axios from "../Api/base";
import Arrow from "../assets/Arrow.png";

const Grouping = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [clicked, setClicked] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedMunicipals, setSelectedMunicipals] = useState([]);
  const [municipals, setMunicipals] = useState([]);

  const handleSelectMunicipal = (municipal) => {
    const municipalObject = {
      id: municipal.id,
      name: municipal.name,
      population: municipal.population,
    };

    const isSelected = selectedMunicipals.some(
      (item) => item.id === municipal.id
    );

    if (isSelected) {
      const updatedSelection = selectedMunicipals.filter(
        (item) => item.id !== municipal.id
      );
      setSelectedMunicipals(updatedSelection);
    } else {
      setSelectedMunicipals([...selectedMunicipals, municipalObject]);
    }
  };
  //fetch municipals
  const state = localStorage.getItem("wilaya_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/administrative/wilaya/${state}/municipals`
        );
        console.log("response", response.data);

        const fetchedMun = response.data.map((item) => ({
          id: item.id,
          name: item.name,
          lottery_done: item.is_lottery_done,
          population: item.population,
        }));
        setMunicipals(fetchedMun);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [state]);
  //////////

  const handleConfirm = () => {
    const mun_ids = {
      municipals: selectedMunicipals.map((municipal) => municipal.id),
    };
    const mun_names = {
      municipals: selectedMunicipals.map((municipal) => municipal.name),
    };
    localStorage.setItem("municipals_names", JSON.stringify(mun_names));
    localStorage.setItem("municipals_ids", JSON.stringify(mun_ids));

    //const output = JSON.parse(localStorage.getItem("municipals_ids"));
    navigate("/Admin/Lottery");
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
        <Typography
          sx={{
            marginLeft: "20px",
            fontWeight: 600,
            fontSize: { xs: "14px", sm: "22px" },
          }}
        >
          {localStorage.getItem("wilaya")}&lsquo;s Municipal grouping
        </Typography>
        <div style={{ flex: 1 }} />

        {clicked && (
          <button
            onClick={handleConfirm}
            className="button"
            style={{
              marginRight: isSmallScreen ? "10px" : "30px",
              height: "46px",
              width: isSmallScreen ? "110px" : "140px",
              fontSize: isSmallScreen ? "10px" : "18px",
              borderRadius: 30,
            }}
          >
            Confirm
          </button>
        )}

        {selectedMunicipals.length >= 1 && !clicked && (
          <button
            onClick={() => {
              setClicked(true);
            }}
            className="button"
            style={{
              marginRight: isSmallScreen ? "10px" : "30px",
              height: "46px",
              width: isSmallScreen ? "110px" : "140px",
              fontSize: isSmallScreen ? "10px" : "18px",
              borderRadius: 30,
            }}
          >
            Group
          </button>
        )}

        {!clicked && (
          <button
            className="button"
            style={{
              backgroundColor: "rgba(231, 217, 202, 0.6)",
              marginRight: isSmallScreen ? "10px" : "30px",
              height: "46px",
              width: isSmallScreen ? "110px" : "140px",
              fontSize: isSmallScreen ? "10px" : "18px",
              borderRadius: 30,
              color: "black",
              fontWeight: "bold",
              border: "1px solid black",
            }}
          >
            Pass
          </button>
        )}
        {clicked && (
          <button
            onClick={() => {
              setClicked(false);
              setSelectedMunicipals([]);
            }}
            className="button"
            style={{
              backgroundColor: "rgba(231, 217, 202, 0.6)",
              marginRight: isSmallScreen ? "10px" : "30px",
              height: "46px",
              width: isSmallScreen ? "110px" : "140px",
              fontSize: isSmallScreen ? "10px" : "18px",
              borderRadius: 30,
              color: "black",
              fontWeight: "bold",
              border: "1px solid black",
            }}
          >
            Cancel
          </button>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "60px",
          justifyContent: clicked ? "center" : "",
          alignItems: clicked ? "center" : "",
        }}
      >
        {/*   ------------------------------List of municipals--------------------------------------*/}
        <List
          sx={{
            height: "550px",
            width: "400px",
            overflow: "auto",
            paddingRight: "14px",
          }}
        >
          <ListItem
            sx={{
              bgcolor: "white",
              height: "50px",
              "& .MuiTypography-root": { fontWeight: 600, color: "#343A40" },
            }}
          >
            <ListItem sx={{ width: "70%" }}>
              <ListItemText primary="Municipal" />
            </ListItem>
            <ListItem sx={{ width: "30%" }}>
              <ListItemText primary="Population" />
            </ListItem>
            <ListItem sx={{ width: "30%" }}>
              <ListItemText primary="Status" />
            </ListItem>
          </ListItem>
          {municipals.map((municipal) => (
            <ListItem
              key={municipal?.id}
              disabled={municipal?.is_lottery_done}
              className={selectedMunicipals === "Azail" ? "listItemEnter" : ""}
              sx={{
                bgcolor: municipal?.selected
                  ? "#E7D9CA"
                  : selectedMunicipals.some((item) => item.id === municipal.id)
                  ? "#E7D9CA"
                  : "white",
                borderTop: "1px solid #F3F3F3",
                fontWeight: 600,
                height: "50px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                "& .MuiTypography-root": {
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "#6C757D",
                },
              }}
            >
              <ListItem
                sx={{
                  width: "70%",
                  height: "50px",
                }}
              >
                <ListItemButton
                  onClick={() => handleSelectMunicipal(municipal)}
                  disabled={municipal?.selected}
                >
                  <ListItemText primary={municipal?.name} />
                </ListItemButton>
              </ListItem>
              <ListItem sx={{ height: "50px", width: "30%" }}>
                <ListItemText primary={municipal?.population} />
              </ListItem>
              <ListItem
                sx={{
                  height: "25px",
                  width: "30%",
                  bgcolor: municipal?.lottery_done ? "#067C27" : "#121843",
                  borderRadius: "25px",
                  "& .MuiTypography-root": {
                    color: "white",
                  },
                }}
              >
                <ListItemText
                  primary={municipal?.lottery_done ? "grouped" : "Not yet"}
                />
              </ListItem>
            </ListItem>
          ))}
        </List>

        {clicked && (
          <img src={Arrow} style={{ height: "150px", width: "100px" }} />
        )}

        {clicked && (
          <List
            sx={{
              width: "300px",
              overflow: "auto",
              maxHeight: "80%",
              paddingRight: "14px",
              boxShadow: "5px 5px 5px #ab7595",
              borderRadius: "15px",
            }}
          >
            <ListItem
              sx={{
                bgcolor: "white",
                height: "50px",
                "& .MuiTypography-root": {
                  fontWeight: 600,
                  color: "#343A40",
                },
              }}
            >
              <ListItem sx={{ width: "70%" }}>
                <ListItemText primary="Municipal" />
              </ListItem>
              <ListItem sx={{ width: "30%" }}>
                <ListItemText primary="Population" />
              </ListItem>
            </ListItem>
            {selectedMunicipals.map((municipal) => (
              <ListItem
                key={municipal?.id}
                sx={{
                  bgcolor: municipal?.selected
                    ? "#E7D9CA"
                    : selectedMunicipals.includes(municipal.id)
                    ? "#E7D9CA"
                    : "white",
                  borderTop: "1px solid #F3F3F3",
                  fontWeight: 600,
                  height: "50px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  "& .MuiTypography-root": {
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#6C757D",
                  },
                }}
              >
                <ListItem
                  sx={{
                    width: "70%",
                    height: "50px",
                  }}
                >
                  <ListItemText primary={municipal?.name} />
                </ListItem>
                <ListItem sx={{ height: "50px", width: "30%" }}>
                  <ListItemText primary={municipal?.population} />
                </ListItem>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default Grouping;