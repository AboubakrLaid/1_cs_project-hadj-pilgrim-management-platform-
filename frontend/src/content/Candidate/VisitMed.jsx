import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Box, Stack, createTheme, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Api/base";

const data = [
  {
    hospital_name: "Hospital A",
    municipal: "Municipal 1",
    days_off: "Friday -Saturday",
  },
  {
    hospital_name: "Hospital B",
    municipal: "Municipal 1",
    days_off: "Friday -Saturday",
  },
  {
    hospital_name: "Hospital C",
    municipal: "Municipal 1",
    days_off: "Friday -Saturday",
  },
  {
    hospital_name: "Hospital D",
    municipal: "Municipal 1",
    days_off: "Friday -Saturday",
  },
  {
    hospital_name: "Hospital E",
    municipal: "Municipal 1",
    days_off: "Friday -Saturday",
  },
  {
    hospital_name: "Hospital F",
    municipal: "Municipal 1",
    days_off: "Friday -Saturday",
  },
];

const VisitMed = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };
  const [hospitals, setaHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  /*useEffect(() => {
    const fetchInfo = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios.get("/pilgrimage/all", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Set the access token in the Authorization header
          },
        });
        console.log(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchInfo();
  }, []);
*/
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const fetchHosp = async () => {
      try {
        const response = await axios.get(
          "/accounts/hospitals-in-wilaya-with-schedule/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Set the access token in the Authorization header
            },
          }
        );
        console.log(response);
        const formattedData = response.data.map((admin, index) => ({
          id: index,
          availableTime: admin.work_schedule[0].times,
          name: admin.hospital_name,
        }));
        setaHospitals(formattedData);
      } catch (error) {
        // Handle network errors or Axios request errors
        console.error("Error:", error);
      }
    };

    fetchHosp();
  }, []);

  const handleSelectionChange = (newSelection) => {
    // Retrieve the selected user object from the users array
    const selectedHospital =
      newSelection.length > 0
        ? data?.find((hosp) => hosp.hospital_name === newSelection[0])
        : null;
    setSelectedHospital(selectedHospital);
    console.log(selectedHospital);
  };

  /*-----------------------------*/

  const columns = useMemo(
    () => [
      { field: "hospital_name", headerName: "Hospital", width: 200 },
      {
        field: "days_off",
        headerName: "Schedule",
        width: 150,
        sortable: false,
      },
    ],
    []
  );

  //-------------Theme ------------

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
  //-----------------------------

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
          height: { xs: "1200px", md: "80%" },
          width: "100%",
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          justifyContent: "flect-start",
          alignItems: "center",
          margin: "auto",
          px: 4,
          gap: { xs: "20px", md: "80px" },
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", md: "40%" },
            height: "100%",
          }}
        >
          <ThemeProvider theme={myTheme}>
            <DataGrid
              columns={columns}
              onRowSelectionModelChange={handleSelectionChange}
              rows={data}
              getRowId={(row) => row.hospital_name}
              hideFooterSelectedRowCount
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
                  boxShadow: "5px 5px 2px #e6d6df",
                  borderRadius: "20px",
                  width: "100%",
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
        <Box
          sx={{
            width: { xs: "90%", md: "42%" },
            height: "90%",

            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            py: 2,
          }}
        >
          <Stack
            direction={"row"}
            spacing={2}
            sx={{
              width: "100%",
              height: "170px",
              justifyContent: "space-between",
              //border: "1px solid black",
            }}
          >
            <Box
              sx={{
                p: 4,
                height: "100%",
                width: "40%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                borderRadius: "20px",
                boxShadow: "5px 5px 2px #e6d6df",
              }}
            >
              <span style={{ fontSize: "24px", fontWeight: 600 }}>
                Hajj fees
              </span>
              <span
                style={{ fontSize: "24px", fontWeight: 600, color: "#AB7595" }}
              >
                750000 DA
              </span>
            </Box>
            <Box
              sx={{
                p: 4,
                height: "100%",
                width: "40%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                borderRadius: "20px",
                boxShadow: "5px 5px 2px #e6d6df",
              }}
            >
              <span style={{ fontSize: "24px", fontWeight: 600 }}>
                Visit deadline
              </span>
              <span
                style={{ fontSize: "24px", fontWeight: 600, color: "#AB7595" }}
              >
                2024/11/05
              </span>
            </Box>
          </Stack>
          <Box
            sx={{
              p: 4,
              height: "280px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "20px",
              boxShadow: "5px 5px 2px #e6d6df",
              gap: 2,
            }}
          >
            <span
              style={{ fontSize: "24px", fontWeight: 600, color: "#AB7595" }}
            >
              Advice
            </span>
            <ul
              style={{
                fontSize: "18px",
                fontWeight: 600,
                width: "100%",
                display: "inline-block",
              }}
            >
              <li>Your vaccine book is mandatory </li>
            </ul>
            <Stack
              direction={"row"}
              spacing={2}
              sx={{
                width: "100%",
                height: "100px",
              }}
            >
              <ul
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  display: "inline-block",
                }}
              >
                <li style={{ marginBottom: "40px" }}>medical record </li>
                <li>List of medications </li>
              </ul>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    height: "70%",
                    width: "30px",
                    border: "1px solid black",
                    borderLeft: "none",
                  }}
                />
              </Box>
              <Box
                sx={{
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    height: "50%",
                    width: "30px",
                    borderBottom: "1px solid black",
                    position: "relative",
                    right: "16px",
                  }}
                />
              </Box>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  right: "24px",
                }}
              >
                <span style={{ fontSize: "18px", fontWeight: 600 }}>
                  in case of illness
                </span>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VisitMed;
