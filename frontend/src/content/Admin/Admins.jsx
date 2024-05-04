import { Box, Stack } from "@mui/system";

import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey, purple } from "@mui/material/colors";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Api/base";
import UserValidation from "./UserValidation";
import { Typography, createTheme, ThemeProvider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const test = [
  {
    name: "John Doe",
    gender: "male",
    wilaya: "Algiers",
    number: 1,
    email: "john.doe@example.com",
  },
  {
    name: "Jane Smith",
    gender: "female",
    wilaya: "Oran",
    number: 2,
    email: "jane.smith@example.com",
  },
  {
    name: "Alice Johnson",
    gender: "female",
    wilaya: "Constantine",
    number: 3,
    email: "alice.johnson@example.com",
  },
  {
    name: "Simon Riga",
    gender: "male",
    wilaya: "Tizi Ouzou",
    number: 4,
    email: "simon.riga@example.com",
  },
  {
    name: "Michael Brown",
    gender: "male",
    wilaya: "Béjaïa",
    number: 5,
    email: "michael.brown@example.com",
  },
  // Add more data as needed
];

const Admins = () => {
  const [data, setData] = useState([]);
  /*
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const fetchData = async () => {
      try {
        const response = await axios.get("/accounts/users", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`, // Set the access token in the Authorization header
          },
        });
        console.log(response);
        setData(response.data);
      } catch (error) {
        // Handle network errors or Axios request errors
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);*/

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

  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectionChange = (newSelection) => {
    // Retrieve the selected user object from the users array
    const selectedUserData =
      newSelection.length > 0
        ? test?.find((user) => user.email === newSelection[0])
        : null;
    setSelectedUser(selectedUserData);
    console.log(selectedUserData);
  };

  /*-----------------------------*/

  const columns = useMemo(
    () => [
      { field: "name", headerName: "Name", width: 160 },
      { field: "gender", headerName: "Gender", width: 80 },
      { field: "wilaya", headerName: "Wilaya", width: 150 },
      { field: "number", headerName: "N°", width: 90 },
      { field: "email", headerName: "Email", width: 220, sortable: false },
    ],
    []
  );

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    //setSelectedUser(null);
    setIsModalOpen(false);

    const accessToken = localStorage.getItem("accessToken");

    const fetchData = async () => {
      try {
        const response = await axios.get("/accounts/users", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`, // Set the access token in the Authorization header
          },
        });
        console.log(response);
        setData(response.data);
      } catch (error) {
        // Handle network errors or Axios request errors
        console.error("Error:", error);
      }
    };

    fetchData();
  };
  const handleValidateUser = () => {
    setIsModalOpen(true);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box sx={{ height: "80%", width: "100%" }}>
        <Box
          sx={{
            height: "150px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            px: 2,
          }}
        >
          <Stack direction={"column"} spacing={2}>
            <Typography
              sx={{
                marginLeft: "20px",
                fontWeight: 600,
                fontSize: { xs: "16px", sm: "28px" },
              }}
            >
              Admins Management
            </Typography>
            <Stack direction={"row"} spacing={2}>
              <button
                style={{
                  backgroundColor: "#121843",
                  height: "36px",
                  width: isSmallScreen ? "100px" : "130px",
                  fontSize: isSmallScreen ? "10px" : "16px",
                  borderRadius: 20,
                  fontWeight: "normal",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0px 15px",
                }}
                className="button"
              >
                Add new
                <AddIcon />
              </button>
              <button
                style={{
                  backgroundColor: "#121843",
                  height: "36px",
                  width: isSmallScreen ? "90px" : "110px",
                  fontSize: isSmallScreen ? "10px" : "16px",
                  borderRadius: 20,
                  fontWeight: "normal",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0px 15px",
                }}
                className="button"
              >
                Delete
                <RemoveIcon />
              </button>
            </Stack>
          </Stack>
          <div style={{ flex: 1 }} />
          {selectedUser && (
            <button
              onClick={handleValidateUser}
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
              Edit
            </button>
          )}

          <button
            onClick={handleLogOut}
            className="button"
            style={{
              marginRight: isSmallScreen ? "10px" : "30px",
              height: "46px",
              width: isSmallScreen ? "110px" : "140px",
              fontSize: isSmallScreen ? "10px" : "18px",
              borderRadius: 30,
            }}
          >
            Log Out
          </button>
        </Box>
        <Stack
          sx={{
            height: { xs: "1200px", md: "100%" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            border: "1px solid blue",
            p: 4,
            gap: 2,
          }}
        >
          <Box
            sx={{
              height: "100%",
              border: "1px solid red",
              width: { xs: "100%", md: "700px" },
            }}
          >
            <ThemeProvider theme={myTheme}>
              <DataGrid
                columns={columns}
                onRowSelectionModelChange={handleSelectionChange}
                rows={test}
                getRowId={(row) => row.email}
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
                  "& .MuiDataGrid-footerContainer": {
                    display: "none",
                  },
                }}
              />
            </ThemeProvider>
          </Box>
          <Box
            sx={{
              height: "100%",
              border: "3px solid #AB7595",
              borderRadius: "20px",
              width: { xs: "100%", md: "100%" },
            }}
          ></Box>
        </Stack>
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
          <UserValidation onClose={handleCloseModal} user={selectedUser} />
        </Box>
      )}
    </>
  );
};

export default Admins;
