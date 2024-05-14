import { Box, Stack } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { purple } from "@mui/material/colors";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../../Components/Calendar";
import axios from "../../Api/base";

const Draw = () => {
  const [arrow, setArrow] = useState(0);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
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
          <NotificationsNoneIcon
            style={{ color: purple[200] }}
            sx={{ fontSize: 40, marginRight: "20px", cursor: "pointer" }}
          />
        </Box>
        <Box
          sx={{
            height: { xs: "1500px", md: "80%" },

            width: "100%",
            display: "flex",
            flexDirection: {
              xs: "column",

              md: "row",
            },

            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            px: { xs: "10px", md: "20px", lg: "50px", xl: "70px" },
            gap: { xs: "20px", md: "40px" },
          }}
        >
          <Stack
            direction="column"
            spacing={2}
            sx={{
              borderRadius: "20px",
              boxShadow: "5px 3px rgba(0, 0, 0, 0.1)",
              py: 3,
              height: "600px",
              alignItems: "center",
              width: { xs: "100%", md: "330px" },
            }}
          >
            <Calendar />
            <Stack
              direction={"row"}
              spacing={1}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                height: "15%",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  borderRadius: "5px",
                  height: "100%",
                  width: "20%",
                  bgcolor: "#E7D9CA",
                  color: "#AB7595",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: 600,
                  fontSize: "60px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                8
              </Box>
              <Box
                sx={{
                  height: "100%",
                  width: "5%",
                  color: "black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: 400,
                  fontSize: "60px",
                }}
              >
                :
              </Box>
              <Box
                sx={{
                  borderRadius: "5px",
                  height: "100%",
                  width: "20%",
                  bgcolor: "#CCCCCC",
                  color: "black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: 500,
                  fontSize: "50px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                00
              </Box>
              <Stack
                direction={"column"}
                spacing={0}
                sx={{
                  height: "100%",
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                    height: "50%",
                    width: "60%",
                    bgcolor: "#E7D9CA",
                    color: "#AB7595",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: 500,
                    fontSize: "16px",
                  }}
                >
                  AM
                </Box>
                <Box
                  sx={{
                    borderBottomLeftRadius: "5px",
                    borderBottomRightRadius: "5px",
                    height: "50%",
                    width: "60%",
                    bgcolor: "#F9F9F9",
                    color: "#cccccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: 500,
                    fontSize: "16px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  PM
                </Box>
              </Stack>
            </Stack>
          </Stack>

          <Stack
            direction="column"
            spacing={2}
            sx={{
              position: "relative",

              height: { xs: "50%", md: "100%" },

              width: "70%",
            }}
          >
            <span style={{ fontWeight: 600, fontSize: "26px" }}>
              Draw Process FAQs
            </span>
            {/* --------------------- First ligne ------------------------------*/}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",

                width: "100%",
              }}
            >
              {arrow !== 1 ? (
                <ArrowRightIcon
                  onClick={() => setArrow(1)}
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
                How does the draw process work for the selection of pilgrims ?
              </span>
            </Stack>
            {arrow === 1 && (
              <span
                style={{
                  fontWeight: 400,
                  fontSize: "14px",
                  marginLeft: "30px",
                  borderLeft: "2px solid #AB7595",
                  paddingLeft: "20px",
                }}
              >
                The draw process ensures fairness among all participants by
                employing a carefully crafted algorithm. For each group of
                municipalities, a predetermined number of candidates are
                selected, gradually accumulating the total pilgrims for the
                year. This process accounts for various factors such as age and
                the number of previous participations by the candidates,
                ensuring an equitable selection process
              </span>
            )}

            {/* --------------------- Second ligne ------------------------------*/}

            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",

                width: "100%",
              }}
            >
              {arrow !== 2 ? (
                <ArrowRightIcon
                  onClick={() => setArrow(2)}
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
                Is the draw process transparent?
              </span>
            </Stack>

            {/* --------------------- Third ligne ------------------------------*/}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",

                width: "100%",
              }}
            >
              {arrow !== 3 ? (
                <ArrowRightIcon
                  onClick={() => setArrow(3)}
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
                What criteria are taken into account in the draw for the Hajj ?
              </span>
            </Stack>

            {/* --------------------- Fourth ligne ------------------------------*/}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",

                width: "100%",
              }}
            >
              {arrow !== 4 ? (
                <ArrowRightIcon
                  onClick={() => setArrow(4)}
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
                What should I do in the event of a non-selection?
              </span>
            </Stack>

            {/* --------------------- Fifth ligne ------------------------------*/}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",

                width: "100%",
              }}
            >
              {arrow !== 5 ? (
                <ArrowRightIcon
                  onClick={() => setArrow(5)}
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
                Are there any guidelines for participants to follow during the
                draw registration?
              </span>
            </Stack>

            {/* --------------------- Sixth ligne ------------------------------*/}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",

                width: "100%",
              }}
            >
              {arrow !== 6 ? (
                <ArrowRightIcon
                  onClick={() => setArrow(6)}
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
                Is there a limit on the number of participants selected from
                each region in the draw?
              </span>
            </Stack>

            {/* --------------------- Seventh ligne ------------------------------*/}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",

                width: "100%",
              }}
            >
              {arrow !== 7 ? (
                <ArrowRightIcon
                  onClick={() => setArrow(7)}
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
                Are there any special considerations for families participating
                in the draw together?
              </span>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Draw;
