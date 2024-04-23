import { Box, Stack } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { purple } from "@mui/material/colors";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import Stepper from "../../Components/Stepper";
import { useNavigate } from "react-router-dom";

const Draw = () => {
  const [arrow, setArrow] = useState(0);
  console.log(arrow);
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
            height: "80%",
            width: "100%",
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            },
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",

            gap: { xs: "80px", md: "40px" },
          }}
        >
          <Stack
            direction="column"
            spacing={2}
            sx={{
              py: 6,
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              width: "25%",
            }}
          >
            <Stepper />
          </Stack>

          <Stack
            direction="column"
            spacing={2}
            sx={{
              position: "relative",
              height: "100%",

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
