import { Box, Stack } from "@mui/system";
import { Avatar } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Api/base";
import { Typography, createTheme, ThemeProvider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import NewDoctor from "./NewDoctor";
const data = [
  {
    profile_pic: null,
    first_name: "Alice",
    last_name: "Smith",
    email: "alice.smith@example.com",
    gender: "Female",
    hospital_name: "Hospital ABC",
    day_off: "Saturday, Sunday",
    contact: "9876543210",
    availableTime:
      "Monday 10:00-12:00, Wednesday 14:00-16:00, Friday 10:00-12:00",
  },
  // Add other users if needed...
];

const Doctors = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [deleted, setDeleted] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [addDoc, setAddDoc] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const renderSchedule = () => {
    if (!selectedUser) return null;

    if (selectedUser.availableTime) {
      return (
        <span
          style={{
            fontWeight: 500,
            fontSize: "14px",
            color: "#A7A7A7",
          }}
        >
          {" "}
          {selectedUser.availableTime}
        </span>
      );
    } else {
      return <p>Data for available time not found</p>;
    }
  };

  //-----------Fetching doctors
  /* useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("/accounts/admins/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response.data);

        const formattedData = response.data.map((admin) => ({
          id: admin.id,
          name: `${admin.first_name} ${admin.last_name}`,
          gender: admin.gender,
          wilaya: admin?.wilaya?.name,
          number: admin?.wilaya?.id, // You need to specify how to get the number for each admin
          email: admin.email,
        }));

        setData(formattedData);
        console.log("the admin new data", data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchAdmins();

    console.log("deleted in the fetch admin", deleted);
    console.log("addAdmin in the fetch admin", addAdmin);
  }, [deleted, addAdmin]);*/

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

  const handleSelectionChange = (newSelection) => {
    // Retrieve the selected user object from the users array
    const selectedUserData =
      newSelection.length > 0
        ? data?.find((user) => user.email === newSelection[0])
        : null;
    setSelectedUser(selectedUserData);
    console.log(selectedUserData);
  };

  /*-----------------------------*/

  const columns = useMemo(
    () => [
      {
        field: "profile_pic",
        headerName: "Profile",
        width: 90,
        renderCell: (params) => (
          <Avatar
            alt={params.row.fullName}
            src={`data:image/png;base64,${params.row.profile_pic}`} // Assuming the image format is PNG
          />
        ),
        sortable: false,
        filterable: false,
      },
      {
        field: "name",
        headerName: "Name",
        width: 150,
        renderCell: (params) =>
          `${params.row.first_name} ${params.row.last_name}`, // Concatenate first and last name
      },
      { field: "gender", headerName: "Gender", width: 80 },
      { field: "email", headerName: "Email", width: 220, sortable: false },
      { field: "hospital_name", headerName: "Hospital", width: 200 },
      { field: "day_off", headerName: "Days off", width: 130 },
      { field: "contact", headerName: "Contact", width: 130 },
    ],
    []
  );

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  /*const handleCloseModal = () => {
    //setSelectedUser(null);
    setIsModalOpen(false);

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
  };*/
  const handleEditUser = () => {
    setIsModalOpen(true);
  };

  /*const handleEdit = async (e) => {
    e.preventDefault();
    console.log(state);
    try {
      const response = await axios.patch(
        `/accounts/admins/${selectedUser.id}/`,
        { wilaya: parseInt(state) },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        alert("Admin edited successfully");
        setDeleted(!deleted);
        handleCloseModal();
      }
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
    }
  };*/

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log(selectedUser);

    /* try {
      const response = await axios.delete(
        `/accounts/admins/${selectedUser.id}/`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);

      if (response.status === 201 && response.data.success) {
        alert("Admin deleted successfully");
        setDeleted(!deleted);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
    }*/
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
          <Stack direction={"row"} spacing={2}>
            <button
              onClick={() => setIsModalOpen(true)}
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
            {selectedUser && (
              <button
                onClick={handleDelete}
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
            )}
          </Stack>
          <div style={{ flex: 1 }} />
          {selectedUser && (
            <button
              onClick={handleEditUser}
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
            height: { xs: "800px", md: "100%" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: { xs: "100%", md: selectedUser ? "75%" : "95%" },
            }}
          >
            <ThemeProvider theme={myTheme}>
              <DataGrid
                columns={columns}
                onRowSelectionModelChange={handleSelectionChange}
                rows={data}
                getRowId={(row) => row.email}
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
          {selectedUser && (
            <Box
              sx={{
                borderLeft: "2px solid #AB7595",
                width: { xs: "100%", md: "25%" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <CloseIcon
                onClick={() => {
                  setSelectedUser(null);
                }}
                sx={{
                  position: "absolute",
                  right: "20px",
                  bottom: "90%",
                  "&:hover": { cursor: "pointer", color: "red" },
                }}
              />
              <Stack
                spacing={1}
                direction={"column"}
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  mt: { xs: 0, md: 6 },
                }}
              >
                <Avatar
                  alt={selectedUser?.fullName}
                  src={`data:image/png;base64,${selectedUser?.profile_pic}`}
                  sx={{
                    width: { xs: 150, md: 120, lg: 196 },
                    height: { xs: 150, md: 120, lg: 196 },
                    border: "3px solid #9B9B9C",
                  }}
                />
                <span style={{ fontWeight: 600, fontSize: "16px" }}>
                  {selectedUser?.first_name} {selectedUser?.last_name}
                </span>
                <span
                  style={{
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#A7A7A7",
                    position: "relative",
                    bottom: "8px",
                  }}
                >
                  {selectedUser?.municipal}
                </span>
                <Stack direction={"row"} spacing={2}>
                  <MailIcon
                    fontSize="medium"
                    sx={{
                      color: "#A7A7A7",
                      "&:hover": {
                        cursor: "pointer",
                        color: "grey",
                      },
                    }}
                  />
                  <PhoneIcon
                    fontSize="medium"
                    sx={{
                      color: "#A7A7A7",
                      "&:hover": {
                        cursor: "pointer",
                        color: "grey",
                      },
                    }}
                  />
                </Stack>
                <Stack direction={"row"} spacing={6}>
                  <Stack direction={"column"} spacing={"2px"}>
                    <span style={{ fontWeight: 600, fontSize: "12px" }}>
                      Days off
                    </span>
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: "14px",
                        color: "#A7A7A7",
                      }}
                    >
                      {selectedUser?.day_off}
                    </span>
                  </Stack>
                  <Stack direction={"column"} spacing={"2px"}>
                    <span style={{ fontWeight: 600, fontSize: "12px" }}>
                      Gender
                    </span>
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: "14px",
                        color: "#A7A7A7",
                      }}
                    >
                      {selectedUser?.gender}
                    </span>
                  </Stack>
                </Stack>
                <span style={{ fontWeight: 600, fontSize: "14px" }}>
                  Aailable times
                </span>
                {renderSchedule()}
              </Stack>
            </Box>
          )}
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
          <NewDoctor onClose={handleCloseModal} />
        </Box>
      )}
    </>
  );
};

export default Doctors;
