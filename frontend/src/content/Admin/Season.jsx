import { Box, Stack } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { purple } from "@mui/material/colors";
import { useRef, useState, useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "../../Api/base";
import { CiTimer } from "react-icons/ci";
import { TiCalendar } from "react-icons/ti";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { TbCalendarFilled } from "react-icons/tb";
import NewSeason from "./NewSeason";
import Alert from "@mui/material/Alert";

const data = [
  {
    id: 1,
    name: "Item 1",
    content: ["Content 1a", "Content 1b", "Content 1c"],
  },
  { id: 2, name: "Item 2", content: ["Content 2a", "Content 2b"] },
  {
    id: 3,
    name: "Item 3",
    content: ["Content 3a", "Content 3b", "Content 3c", "Content 3d"],
  },
  { id: 4, name: "Item 4", content: ["Content 4a"] },
  {
    id: 5,
    name: "Item 5",
    content: ["Content 5a", "Content 5b", "Content 5c"],
  },
];

const Season = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [finish, setFinish] = useState(false);
  const [alertsuc, setAlertSuc] = useState(false);
  const [alertErr, setAlertErr] = useState(false);
  const [err, setErr] = useState("");

  const handleSeasonFinished = async () => {
    setFinish(true);
    console.log("finished");
    setAlertSuc(true);
    hideAlert();
    try {
      const response = await axios.post("/pilgrimage/finished", {});

      if (response.status === 200) {
        setAlertSuc(true);
        hideAlert();
      }
    } catch (error) {
      // Handle network errors or Axios request errors
      console.error("Error:", error);
      setErr("Invalid email");
    }
  };

  const hideAlert = () => {
    setTimeout(() => {
      setAlertSuc(false);
      setAlertErr(false);
    }, 2000); // 2000 milliseconds = 2 seconds
  };

  // Call hideAlert when the component mounts

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const elementRef1 = useRef(null); // Ref for the first container
  const elementRef2 = useRef(null);

  const [arrowDisable, setArrowDisable] = useState(true);
  const [selectedItem, setSelectedItem] = useState(data[0]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleHorizontalScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
      if (element.scrollLeft <= 0) {
        setArrowDisable(true);
      } else {
        setArrowDisable(false);
      }
    }, speed);
  };

  return (
    <>
      <Box sx={{ height: "100vh" }}>
        {alertErr && (
          <Alert
            sx={{
              position: "absolute",
              opacity: 1,
              transition: "opacity 0.5s ease-in-out",
              boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
            }}
            severity="error"
          >
            {err}
          </Alert>
        )}
        {alertsuc && (
          <Alert
            sx={{
              position: "absolute",
              opacity: 1,
              transition: "opacity 0.5s ease-in-out",
              boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
            }}
            severity="success"
          >
            Season finished successfully{" "}
          </Alert>
        )}
        <Box
          style={{
            height: "15vh",

            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <button className="Finished-button" onClick={handleSeasonFinished}>
            {" "}
            Finish season
          </button>

          <button
            className="button"
            style={{
              marginRight: "40px",
              height: "46px",
              width: "13%",
              borderRadius: 30,
            }}
            onClick={handleOpenModal}
          >
            {" "}
            New season
          </button>
          <NotificationsNoneIcon
            style={{ color: purple[200] }}
            sx={{ fontSize: 40, marginRight: "20px", cursor: "pointer" }}
          />
        </Box>

        <Box
          sx={{
            height: "85vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Center the content horizontally
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "72%",
              height: "30%",
              margin: "auto",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <button
              className="season-scroll-button"
              onClick={() => {
                handleHorizontalScroll(elementRef1.current, 25, 100, -225);
              }}
              //disabled={arrowDisable}
            >
              <ArrowBackIosNewIcon style={{ color: "white" }} />
            </button>

            <div className="season-container" ref={elementRef1}>
              {data.map((item) => (
                <div
                  key={item.id}
                  className="season-box1"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="Season-year">
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        margin: "auto",
                        alignItems: "center",
                        mb: 1,
                        position: "relative",
                        top: "8px",
                      }}
                    >
                      <TiCalendar color="#AB7595" size={24} />
                      <p style={{ fontWeight: 500, marginLeft: "16px" }}>
                        2024
                      </p>
                    </Stack>
                  </div>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "80%",
                      mt: 3,
                      ml: 1,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "rgba(0, 0, 0, 0.43)",
                        fontWeight: 400,
                        fontSize: "12px",
                        height: "30%",
                      }}
                    >
                      <p>number of piligrims</p>
                      <p>active</p>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "rgba(0, 0, 0, 0.43)",
                        fontWeight: 400,
                        fontSize: "12px",
                        height: "30%",
                      }}
                    >
                      <p
                        style={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        Inscription deadline
                      </p>
                      <p>date</p>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "rgba(0, 0, 0, 0.43)",
                        fontWeight: 400,
                        fontSize: "12px",
                        height: "30%",
                      }}
                    >
                      <p
                        style={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        Payement deadline
                      </p>
                      <p>date</p>
                    </Stack>
                  </Box>

                  <div className="Season-phases">
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "16px",
                        position: "relative",
                        bottom: "8px",
                      }}
                    >
                      <CiTimer style={{ color: "#AB7595" }} />
                      <p
                        style={{
                          fontWeight: 400,
                          color: "rgba(0, 0, 0, 0.43)",
                          fontSize: "12px",
                        }}
                      >
                        x phases
                      </p>
                    </Stack>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="season-scroll-button"
              onClick={() => {
                handleHorizontalScroll(elementRef1.current, 25, 100, 225);
              }}
            >
              <ArrowForwardIosIcon style={{ color: "white" }} />
            </button>
          </Box>
          <Box
            sx={{
              width: "50%",
              height: "25%",
              margin: "auto",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <button
              style={{ width: "8%" }}
              className="season-scroll-button"
              onClick={() => {
                handleHorizontalScroll(elementRef2.current, 25, 100, -225);
              }}
              //disabled={arrowDisable}
            >
              <ArrowBackIosNewIcon style={{ color: "white" }} />
            </button>

            <div className="season-container" ref={elementRef2}>
              {selectedItem.content.map((contentItem, index) => (
                <div key={index} className="season-box2">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      height: "90%",
                      width: "90%",
                      margin: "auto",
                    }}
                  >
                    <span
                      style={{
                        textAlign: "center",
                        fontWeight: 600,
                        fontSize: "16px",
                      }}
                    >
                      {" "}
                      Phase n° x
                    </span>
                    <Box
                      sx={{
                        mt: 2,

                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={0}
                        sx={{
                          mb: 1,
                          display: "flex",
                          alignContent: "center",
                          justifyContent: "space-between",
                          color: "rgba(0, 0, 0, 0.43)",
                          fontWeight: 400,
                          fontSize: "12px",
                          height: "30%",
                        }}
                      >
                        <TbCalendarFilled size={18} color="#AB7595" />

                        <p
                          style={{
                            color: "black",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                        >
                          Start date:
                        </p>
                        <p>2023/10/01</p>
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={0}
                        sx={{
                          mb: 1,
                          display: "flex",
                          alignContent: "center",
                          justifyContent: "space-between",
                          color: "rgba(0, 0, 0, 0.43)",
                          fontWeight: 400,
                          fontSize: "12px",
                          height: "30%",
                        }}
                      >
                        <IoCalendarNumberOutline size={16} color="#AB7595" />
                        <p
                          style={{
                            color: "black",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                        >
                          End date:
                        </p>
                        <p>2023/12/01</p>
                      </Stack>
                    </Box>
                  </Box>
                </div>
              ))}
            </div>

            <button
              className="season-scroll-button"
              style={{ width: "8%" }}
              onClick={() => {
                handleHorizontalScroll(elementRef2.current, 25, 100, 225);
              }}
            >
              <ArrowForwardIosIcon style={{ color: "white" }} />
            </button>
          </Box>
        </Box>
      </Box>

      {isModalOpen && (
        <Box
          sx={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "999",
            backgroundColor: "rgba(61, 61, 61, 0.22)",
            backdropFilter: "blur(10px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NewSeason onClose={handleCloseModal} />
        </Box>
      )}
    </>
  );
};
export default Season;
