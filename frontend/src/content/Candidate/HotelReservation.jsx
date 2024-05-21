import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import Hotel from "../../assets/Hotel.png";
import Arrow from "../../assets/Arrow.svg";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Hotels = [
  {
    name: "Grand Hotel",
    nbrOfFloors: 20,
    id: 1,
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { id: 101, nbrBeds: 2 },
          { id: 102, nbrBeds: 1 },
          { id: 103, nbrBeds: 3 },
          { id: 104, nbrBeds: 2 },
          { id: 105, nbrBeds: 1 },
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          { id: 201, nbrBeds: 3 },
          { id: 202, nbrBeds: 2 },
        ],
      },
      {
        floorNumber: 3,
        rooms: [
          { id: 208, nbrBeds: 3 },
          { id: 207, nbrBeds: 2 },
        ],
      },
      {
        floorNumber: 4,
        rooms: [
          { id: 281, nbrBeds: 3 },
          { id: 292, nbrBeds: 2 },
        ],
      },
      {
        floorNumber: 5,
        rooms: [
          { id: 208, nbrBeds: 3 },
          { id: 210, nbrBeds: 2 },
        ],
      },
    ],
  },
  {
    name: "Ocean View Resort",
    nbrOfFloors: 15,
    id: 2,
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { id: 101, nbrBeds: 1 },
          { id: 102, nbrBeds: 2 },
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          { id: 201, nbrBeds: 2 },
          { id: 202, nbrBeds: 1 },
        ],
      },
    ],
  },
  {
    name: "Mountain Lodge",
    nbrOfFloors: 10,
    id: 3,
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { id: 101, nbrBeds: 2 },
          { id: 102, nbrBeds: 3 },
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          { id: 201, nbrBeds: 1 },
          { id: 202, nbrBeds: 2 },
        ],
      },
    ],
  },
  {
    name: "City Central Hotel",
    nbrOfFloors: 10,
    id: 4,
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { id: 101, nbrBeds: 1 },
          { id: 102, nbrBeds: 2 },
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          { id: 201, nbrBeds: 3 },
          { id: 202, nbrBeds: 1 },
        ],
      },
    ],
  },
];

const HotelReservation = () => {
  const gender = "F";
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [arrow, setArrow] = useState(0);
  const [arrow2, setArrow2] = useState(0);

  useEffect(() => {
    setHotels(Hotels);
  }, []);

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
    console.log("Selected hotel: ", hotel);
  };

  const handleSelectedRoom = (room) => {
    setSelectedRoom(room);
    console.log("Selected room: ", room);
  };

  return (
    <Box
      sx={{
        height: { xs: "1120px", md: "100%" },
        width: "100%",
        position: "relative",
      }}
    >
      <Box
        style={{
          height: "120px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          px: 4,
        }}
      >
        <h1 style={{ marginLeft: "20px" }}>Hotel Selection</h1>
        <div style={{ flex: 1 }} />

        {selectedRoom && (
          <button
            onClick={console.log("Selected room: ", selectedRoom)}
            className="button"
            style={{
              marginRight: "40px",
              height: "46px",
              width: "160px",
              borderRadius: 30,
            }}
          >
            Confirm Selection
          </button>
        )}

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
          px: { xs: 2, sm: 0, md: gender === "F" ? 2 : 14 },
          display: "flex",
          gap: "60px",
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center",
          height: { xs: "1000px", md: "calc(100% - 120px)" },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/*   ------------------------------List of Hotels--------------------------------------*/}
        <Stack
          direction={"column"}
          sx={{
            boxShadow: "8px 8px 4px #e6d6df",
            borderRadius: "15px",
          }}
        >
          <ListItem
            sx={{
              bgcolor: "white",
              height: "50px",
              overflow: "hidden",
              width: "300px",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              borderBottom: "2px solid #dfdfdf",

              "& .MuiTypography-root": {
                fontWeight: 600,
                color: "#343A40",
                textAlign: "center",
                fontsize: "14px",
              },
            }}
          >
            <ListItem sx={{ width: "150px" }}>
              <ListItemText primary="Hotel" />
            </ListItem>
            <ListItem sx={{ width: "110px" }}>
              <ListItemText primary="NB Floors" />
            </ListItem>
          </ListItem>

          <List
            sx={{
              width: "300px",
              height: "200px",
              overflow: "auto",
              paddingRight: "10px",
              borderRadius: "15px",
            }}
          >
            {hotels?.map((hotel) => (
              <ListItemButton
                key={hotel?.id}
                onClick={() => handleSelectHotel(hotel)}
                disabled={hotel?.nbrOfFloors === 0}
                sx={{
                  p: 0,
                }}
              >
                <ListItem
                  key={hotel.name}
                  sx={{
                    bgcolor:
                      hotel?.nbrOfFloors === 0
                        ? "#C1C1C1"
                        : selectedHotel && selectedHotel.id === hotel.id
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
                      alignItems: "center",
                      textAlign: "center",
                    },
                  }}
                >
                  <ListItem
                    sx={{
                      width: "200px",
                      height: "50px",
                    }}
                  >
                    <ListItemText primary={hotel.name} />
                  </ListItem>
                  <ListItem
                    sx={{
                      width: "100px",
                      height: "50px",
                    }}
                  >
                    <ListItemText primary={hotel.nbrOfFloors} />
                  </ListItem>
                </ListItem>
              </ListItemButton>
            ))}
          </List>
        </Stack>
        {!selectedHotel && (
          <img
            src={Hotel}
            alt="Hotel"
            style={{ width: "400px", height: "60%" }}
          />
        )}
        {selectedHotel && (
          <Stack
            sx={{
              width: "150px",
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontWeight: 600, fontsize: "18px" }}>
              Room selection
            </span>
            <img src={Arrow} alt="Arrow" style={{ width: "100%" }} />
          </Stack>
        )}

        {selectedHotel && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                justifyContent: "flex-start",
              }}
            >
              {gender === "F" && (
                <span style={{ fontWeight: 600, fontSize: "18px" }}>
                  For you :
                </span>
              )}
              <Box
                sx={{
                  height: "400px",
                  width: "320px",
                  borderRadius: "20px",
                  boxShadow: "8px 8px 5px #e6d6df",
                  overflow: "auto",
                  py: 2,
                }}
              >
                <Stack
                  direction="column"
                  spacing={2}
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {selectedHotel?.floors?.map((floor, index) => (
                    <>
                      <Stack
                        key={index}
                        direction="row"
                        spacing={2}
                        sx={{
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        {arrow !== index + 1 ? (
                          <ArrowRightIcon
                            onClick={() => setArrow(index + 1)}
                            sx={{
                              color: "#AB7595",
                              fontSize: 50,
                              cursor: "pointer",
                              ":hover": { color: "#ac5f82" },
                            }}
                          />
                        ) : (
                          <ArrowDropDownIcon
                            onClick={() => setArrow(0)}
                            sx={{
                              color: "#AB7595",
                              fontSize: 50,
                              cursor: "pointer",
                              ":hover": { color: "#ac5f82" },
                            }}
                          />
                        )}
                        <span style={{ fontWeight: 600, fontSize: "16px" }}>
                          Floor {index + 1}
                        </span>
                      </Stack>
                      {arrow == index + 1 && (
                        <Stack
                          direction={"column"}
                          sx={{
                            position: "relative",
                            left: "15%",
                            borderRadius: "15px",
                            width: "200px",
                            height: "170px",
                          }}
                        >
                          <ListItem
                            sx={{
                              bgcolor: "white",
                              height: "50px",
                              overflow: "hidden",
                              width: "180px",
                              borderTopLeftRadius: "20px",
                              borderTopRightRadius: "20px",
                              borderBottom: "2px solid #dfdfdf",
                              fontsize: "8px",
                              "& .MuiTypography-root": {
                                fontWeight: 600,
                                color: "#343A40",
                                textAlign: "center",
                              },
                            }}
                          >
                            <ListItem sx={{ width: "80px" }}>
                              <ListItemText primary="Room" />
                            </ListItem>
                            <ListItem sx={{ width: "80px" }}>
                              <ListItemText primary="Beds" />
                            </ListItem>
                          </ListItem>

                          <List
                            sx={{
                              width: "180px",
                              height: "200px",
                              overflow: "auto",
                              paddingRight: "10px",
                              borderRadius: "15px",
                            }}
                          >
                            {floor?.rooms?.map((room) => (
                              <ListItemButton
                                key={room?.id}
                                onClick={() => handleSelectedRoom(room)}
                                disabled={room?.nbrBeds === 0}
                                sx={{
                                  p: 0,
                                }}
                              >
                                <ListItem
                                  key={room.id}
                                  sx={{
                                    bgcolor:
                                      room?.nbrBeds === 0
                                        ? "#C1C1C1"
                                        : selectedRoom &&
                                          selectedRoom.id === room.id
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
                                      alignItems: "center",
                                      textAlign: "center",
                                    },
                                  }}
                                >
                                  <ListItem
                                    sx={{
                                      width: "80px",
                                      height: "50px",
                                    }}
                                  >
                                    <ListItemText primary={room.id} />
                                  </ListItem>
                                  <ListItem
                                    sx={{
                                      width: "80px",
                                      height: "50px",
                                    }}
                                  >
                                    <ListItemText primary={room.nbrBeds} />
                                  </ListItem>
                                </ListItem>
                              </ListItemButton>
                            ))}
                          </List>
                        </Stack>
                      )}
                    </>
                  ))}
                </Stack>
              </Box>
            </Box>

            {/*-------------------------------- Case Female -----------------*/}
            {gender === "F" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  justifyContent: "flex-start",
                }}
              >
                <span style={{ fontWeight: 600, fontSize: "18px" }}>
                  For your companion :
                </span>

                <Box
                  sx={{
                    height: "400px",
                    width: "320px",
                    borderRadius: "20px",
                    boxShadow: "8px 8px 5px #e6d6df",
                    overflow: "auto",
                    py: 2,
                  }}
                >
                  <Stack
                    direction="column"
                    spacing={2}
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {selectedHotel?.floors?.map((floor, index) => (
                      <>
                        <Stack
                          key={index}
                          direction="row"
                          spacing={2}
                          sx={{
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          {arrow2 !== index + 1 ? (
                            <ArrowRightIcon
                              onClick={() => setArrow2(index + 1)}
                              sx={{
                                color: "#AB7595",
                                fontSize: 50,
                                cursor: "pointer",
                                ":hover": { color: "#ac5f82" },
                              }}
                            />
                          ) : (
                            <ArrowDropDownIcon
                              onClick={() => setArrow2(0)}
                              sx={{
                                color: "#AB7595",
                                fontSize: 50,
                                cursor: "pointer",
                                ":hover": { color: "#ac5f82" },
                              }}
                            />
                          )}
                          <span style={{ fontWeight: 600, fontSize: "16px" }}>
                            Floor {index + 1}
                          </span>
                        </Stack>
                        {arrow2 == index + 1 && (
                          <Stack
                            direction={"column"}
                            sx={{
                              position: "relative",
                              left: "15%",
                              borderRadius: "15px",
                              width: "200px",
                              height: "170px",
                            }}
                          >
                            <ListItem
                              sx={{
                                bgcolor: "white",
                                height: "50px",
                                overflow: "hidden",
                                width: "180px",
                                borderTopLeftRadius: "20px",
                                borderTopRightRadius: "20px",
                                borderBottom: "2px solid #dfdfdf",
                                fontsize: "8px",
                                "& .MuiTypography-root": {
                                  fontWeight: 600,
                                  color: "#343A40",
                                  textAlign: "center",
                                },
                              }}
                            >
                              <ListItem sx={{ width: "80px" }}>
                                <ListItemText primary="Room" />
                              </ListItem>
                              <ListItem sx={{ width: "80px" }}>
                                <ListItemText primary="Beds" />
                              </ListItem>
                            </ListItem>

                            <List
                              sx={{
                                width: "180px",
                                height: "200px",
                                overflow: "auto",
                                paddingRight: "10px",
                                borderRadius: "15px",
                              }}
                            >
                              {floor?.rooms?.map((room) => (
                                <ListItemButton
                                  key={room?.id}
                                  onClick={() => handleSelectedRoom(room)}
                                  disabled={room?.nbrBeds === 0}
                                  sx={{
                                    p: 0,
                                  }}
                                >
                                  <ListItem
                                    key={room.id}
                                    sx={{
                                      bgcolor:
                                        room?.nbrBeds === 0
                                          ? "#C1C1C1"
                                          : selectedRoom &&
                                            selectedRoom.id === room.id
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
                                        alignItems: "center",
                                        textAlign: "center",
                                      },
                                    }}
                                  >
                                    <ListItem
                                      sx={{
                                        width: "80px",
                                        height: "50px",
                                      }}
                                    >
                                      <ListItemText primary={room.id} />
                                    </ListItem>
                                    <ListItem
                                      sx={{
                                        width: "80px",
                                        height: "50px",
                                      }}
                                    >
                                      <ListItemText primary={room.nbrBeds} />
                                    </ListItem>
                                  </ListItem>
                                </ListItemButton>
                              ))}
                            </List>
                          </Stack>
                        )}
                      </>
                    ))}
                  </Stack>
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default HotelReservation;
