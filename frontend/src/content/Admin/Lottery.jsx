import {
  Box,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { useState, useEffect, useMemo } from "react";
import axios from "../../Api/base";
import CheckIcon from "@mui/icons-material/Check";
import { FaArrowCircleRight } from "react-icons/fa";
import Helmet from "react-helmet";

const data = [
  { nin: "123456789", first_name: "John", last_name: "Doe" },
  { nin: "987654321", first_name: "Jane", last_name: "Smith" },

  { nin: "456789123", first_name: "Alice", last_name: "Johnson" },
  { nin: "456089123", first_name: "Simon", last_name: "Riga" },
  { nin: "876543219", first_name: "Michael", last_name: "Brown" },
  { nin: "654321987", first_name: "Emily", last_name: "Wilson" },
  { nin: "321987654", first_name: "David", last_name: "Martinez" },
  { nin: "543219876", first_name: "Sarah", last_name: "Garcia" },
  { nin: "890123456", first_name: "Matthew", last_name: "Lopez" },
  { nin: "234567890", first_name: "Jessica", last_name: "Perez" },
  { nin: "109876543", first_name: "Christopher", last_name: "Davis" },
  { nin: "765432109", first_name: "Jennifer", last_name: "Rodriguez" },
  { nin: "567890123", first_name: "Andrew", last_name: "Wilson" },
  { nin: "098765432", first_name: "Elizabeth", last_name: "Lee" },
  { nin: "432109876", first_name: "Daniel", last_name: "Taylor" },
  { nin: "789012345", first_name: "Olivia", last_name: "Hernandez" },
  { nin: "210987654", first_name: "James", last_name: "Gonzalez" },
  { nin: "678901234", first_name: "Emma", last_name: "Walker" },
  { nin: "901234567", first_name: "Ryan", last_name: "Lewis" },
  // Add more data as needed
];

const screenHeight = window.innerHeight;

const Lottery = () => {
  //table-------------------------------

  const myTheme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          row: {
            "&.Mui-selected": {
              backgroundColor: "#E7D9CA",
              "&:hover": {
                backgroundColor: "#E7D9CA",
              },
            },
          },
        },
      },
    },
  });

  const columns = useMemo(
    () => [
      { field: "nin", headerName: "NIN", width: 180 },
      { field: "first_name", headerName: "First name", width: 150 },
      { field: "last_name", headerName: "Last name", width: 150 },
    ],
    []
  );

  //---------------------------------------
  const [dataa, setData] = useState(data);
  const state = localStorage.getItem("wilaya_id");
  const [municipals, setMunicipals] = useState([]);
  const [selectedMunicipal, setSelectedMunicipal] = useState("");
  const [numberOfWinners, setNumberOfWinners] = useState(0);
  const [currentWinner, setCurrentWinner] = useState("");
  const [winners, setWinners] = useState([]);
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
          selected: false,
        }));
        setMunicipals(fetchedMun);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [state]);

  useEffect(() => {
    console.log("municipals in effect", municipals);
  }, [municipals]);

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
  useEffect(() => {
    const animateList = () => {
      const winnerid = dataa.findIndex((user) => user.nin === "321987654");
      if (dataa.length > 1) {
        console.log("winnerid", winnerid);
        console.log("dataa", dataa);
        // Check if "Azail" is not the first element
        if (winnerid !== 0 || dataa[0]?.nin !== "321987654") {
          // Move the first item to the end of the list
          const updatedusers = [...dataa.slice(1), dataa[0]];
          console.log("updatesusers", updatedusers);

          console.log("data", dataa);

          // Set the updated list with the first item moved to the end
          setData(updatedusers);

          // Repeat the animation
          //setTimeout(animateList, 22500); // Adjust the delay as needed
        } else {
          setCurrentWinner(dataa[0]?.first_name + " " + dataa[0]?.last_name);
          setWinners([...winners, dataa[0]]);
          setNumberOfWinners(numberOfWinners + 1);
        }
      }
    };

    // Start the animation
    setTimeout(animateList, 500);
  }, [dataa]); //municipals

  return (
    <div className="lottery-body">
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: { xs: "400px", md: "220px" },
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            px: "20px",
          }}
        >
          {/*   ------------------------------List of municipals--------------------------------------*/}
          <List
            sx={{
              height: "200px",
              width: "250px",
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
                <ListItemText primary="Status" />
              </ListItem>
            </ListItem>
            {municipals.map((municipal, index) => (
              <ListItem
                key={municipal?.id}
                disabled={municipal?.selected}
                className={
                  selectedMunicipal === "Azail" && index === 0
                    ? "listItemEnter"
                    : ""
                }
                sx={{
                  bgcolor: municipal?.selected
                    ? "#E7D9CA"
                    : municipal?.id === selectedMunicipal
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
                    {municipal?.selected && <CheckIcon />}
                    <ListItemText primary={municipal?.name} />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ height: "50px", width: "30%" }}>
                  <ListItemText primary={municipal?.id} />
                </ListItem>
              </ListItem>
            ))}
          </List>
          <Stack
            direction={"column"}
            sx={{
              alignItems: "center",
              position: "relative",
              top: { xs: "0px", md: "40px" },
            }}
          >
            <span
              style={{ color: "#AB7595", fontSize: "22px", fontWeight: 600 }}
            >
              Current Winner
            </span>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="winner-icon" />
              <span style={{ fontSize: "22px", fontWeight: 600 }}>
                Winner is {currentWinner}
              </span>
              <div className="winner-icon" />
            </Box>
          </Stack>

          <button
            className="button"
            onClick={handledraw}
            style={{
              height: "50px",
              width: "160px",
              fontSize: "18px",
              borderRadius: 30,
              position: "relative",
            }}
          >
            Start draw
          </button>
        </Box>

        {/*   ------------------------------Table of users and winners--------------------------------------*/}

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={0}
          sx={{
            width: "100%",
            height: { xs: "1100px", md: `${screenHeight - 220}px` },
            px: "80px",
            justifyContent: "space-between",
            alignItems: "center",
            py: "20px",
          }}
        >
          <Box
            sx={{
              width: "50%",
              height: "500px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              position: "relative",
            }}
          >
            <span
              style={{ color: "#AB7595", fontSize: "22px", fontWeight: 600 }}
            >
              All participants
            </span>

            <ThemeProvider theme={myTheme}>
              <DataGrid
                columns={columns}
                rows={dataa}
                getRowId={(row) => row.nin}
                hideFooterSelectedRowCount
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                getRowSpacing={(params) => ({
                  top: params.isFirstVisible ? 0 : 2,
                  bottom: params.isLastVisible ? 0 : 2,
                })}
                rowHeight={45}
                sx={{
                  [`& .${gridClasses.row}`]: {
                    bgcolor: grey[10],
                  },
                  ".MuiDataGrid-columnSeparator": {
                    display: "none",
                  },
                  "&.MuiDataGrid-root": {
                    border: "none",
                    backgroundColor: "white",
                  },

                  "& .MuiDataGrid-columnHeader": {
                    borderBottom: "4px solid #EAEAEA",
                    p: "auto",
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  "& .MuiDataGrid-cell": {
                    p: "auto",
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },

                  "& .MuiButtonBase-root ": {
                    backgroundColor: "rgba(171, 117, 149, 0.9)",
                    borderRadius: "2px",
                    mr: 2,
                    p: "0px",
                    height: "30px",
                  },
                  "& .Mui-disabled ": {
                    backgroundColor: "rgba(171, 117, 149, 0.5)",
                    borderRadius: "2px",
                    mr: 2,
                    p: "0px",
                    height: "30px",
                  },
                }}
              />
              <FaArrowCircleRight
                style={{
                  position: "absolute",
                  left: 40,
                  top: 110,
                  height: "32px",
                  width: "32px",
                  color: "#98c900",
                }}
              />
            </ThemeProvider>
          </Box>
          <Box
            sx={{
              width: "50%",
              height: "500px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{ color: "#AB7595", fontSize: "22px", fontWeight: 600 }}
            >
              Winners ({" "}
              <span style={{ color: "black" }}>{numberOfWinners}</span> /{" "}
              <span style={{ color: "black" }}>{municipals.length}</span>)
            </span>

            <ThemeProvider theme={myTheme}>
              <DataGrid
                columns={columns}
                rows={winners}
                getRowId={(row) => row.nin}
                hideFooterSelectedRowCount
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                getRowSpacing={(params) => ({
                  top: params.isFirstVisible ? 0 : 2,
                  bottom: params.isLastVisible ? 0 : 2,
                })}
                rowHeight={45}
                sx={{
                  [`& .${gridClasses.row}`]: {
                    bgcolor: grey[10],
                  },
                  ".MuiDataGrid-columnSeparator": {
                    display: "none",
                  },
                  "&.MuiDataGrid-root": {
                    border: "none",
                    backgroundColor: "white",
                  },

                  "& .MuiDataGrid-columnHeader": {
                    borderBottom: "4px solid #EAEAEA",
                    p: "auto",
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  "& .MuiDataGrid-cell": {
                    p: "auto",
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },

                  "& .MuiButtonBase-root ": {
                    backgroundColor: "rgba(171, 117, 149, 0.9)",
                    borderRadius: "2px",
                    mr: 2,
                    p: "0px",
                    height: "30px",
                  },
                  "& .Mui-disabled ": {
                    backgroundColor: "rgba(171, 117, 149, 0.5)",
                    borderRadius: "2px",
                    mr: 2,
                    p: "0px",
                    height: "30px",
                  },
                }}
              />
            </ThemeProvider>
          </Box>
        </Stack>
      </Box>
    </div>
  );
};

export default Lottery;
