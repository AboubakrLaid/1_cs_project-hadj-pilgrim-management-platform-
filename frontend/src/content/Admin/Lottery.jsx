import {
  Box,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "../../Api/base";
import CheckIcon from "@mui/icons-material/Check";

const Lottery = () => {
  const state = localStorage.getItem("wilaya_id");
  const [municipals, setMunicipals] = useState([]);
  const [selectedMunicipal, setSelectedMunicipal] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/administrative/wilaya/${state}/municipals`
        );
        console.log(response.data);

        const fetchedMun = response.data.map((item) => ({
          id: item.id,
          name: item.name,
          selected: false,
        }));
        setMunicipals(fetchedMun);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [state]);

  const handleSelectMunicipal = (municipal) => {
    if (!municipal.selected) {
      setSelectedMunicipal(municipal.id);
      console.log(municipal.id);
    } else {
      setSelectedMunicipal(null);
    }
  };

  const handledraw = async () => {
    const updatedMunicipals = municipals.map((item) =>
      item.id === selectedMunicipal ? { ...item, selected: true } : item
    );
    setMunicipals(updatedMunicipals);
  };

  return (
    <div className="lottery-body">
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {selectedMunicipal && (
          <button
            className="button"
            onClick={handledraw}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              height: "50px",
              width: "160px",
              fontSize: "18px",
              borderRadius: 30,
            }}
          >
            Start draw
          </button>
        )}
        <List
          sx={{
            height: "500px",
            width: "250px",
            overflow: "auto",
          }}
        >
          {municipals.map((municipal) => (
            <ListItem
              key={municipal.id}
              disabled={municipal.selected}
              sx={{
                bgcolor: municipal.selected
                  ? "#E7D9CA"
                  : municipal.id === selectedMunicipal
                  ? "#E7D9CA"
                  : "white",
                border: "1px solid black",
                fontWeight: 600,
              }}
            >
              <ListItemButton
                onClick={() => handleSelectMunicipal(municipal)}
                disabled={municipal.selected}
              >
                {municipal.selected && <CheckIcon />}
                <ListItemText
                  sx={{ color: "black" }}
                  primary={municipal.name}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default Lottery;
