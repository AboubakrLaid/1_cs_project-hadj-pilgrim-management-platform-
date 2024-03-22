import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ShuffleIcon from "@mui/icons-material/Shuffle";
//import { SidebarData } from "./SidebarData";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
const SidebarDataGeneral = [
  {
    title: "Dashboard",
    path: "/Admin",
    icon: <HomeIcon />,
  },
  {
    title: "Season",
    path: "/Admin/Season",
    icon: <EventNoteIcon />,
  },
  {
    title: "Algo method",
    path: "/Admin/Method",
    icon: <ShuffleIcon />,
  },
];

const SidebarDataAdmin = [
  {
    title: "Dashboard",
    path: "/Admin/Dashboard",
    icon: <HomeIcon />,
  },
  {
    title: "Season",
    path: "/Admin/Season",
    icon: <EventNoteIcon />,
  },
  {
    title: "arbo method",
    path: "/Admin/Method",
    icon: <ShuffleIcon />,
  },
];

const AdminInterface = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  let role = "adminG";
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const lastPathSegment = location.pathname.split("/").pop(); // Get the last segment of the pathname

    if (lastPathSegment === "Admin") {
      setSelectedItem("Dashboard");
    } else {
      setSelectedItem(lastPathSegment);
    }
  }, [location.pathname]);

  const handleItemClick = (item) => {
    setSelectedItem(item.title);
    localStorage.setItem("selectedItem", item.title);
    navigate(item.path);
  };
  return (
    //--------------------------------------------SIDEBAR------------------------------------//

    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "17%",

          borderTopRightRadius: "20px",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            height: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Center items vertically
            justifyContent: "center",
            width: "100%",
            borderTopRightRadius: "20px",
            backgroundColor: "#996986",
            borderBottom: "2px solid rgba(0, 0, 0, 0.4)",
          }}
        >
          <Avatar src="/broken-image.jpg" sx={{ width: 140, height: 140 }} />
          <div style={{ color: "white", fontWeight: "600", marginTop: "10px" }}>
            Username
          </div>
        </Box>
        <Box
          sx={{
            paddingTop: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "70%",
            background: "rgba(153, 105, 134, 0.95)",
          }}
        >
          {role == "adminG" && (
            <ul className="Sidebar-List">
              {SidebarDataGeneral.map((item, index) => {
                return (
                  <li
                    id={selectedItem === item.title ? "active" : ""}
                    className="row"
                    key={index}
                    onClick={() => handleItemClick(item)}
                  >
                    <Box
                      sx={{
                        flex: "30%",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box
                      sx={{ flex: "70%", fontWeight: "600", fontSize: "21px" }}
                    >
                      {item.title}
                    </Box>
                  </li>
                );
              })}
            </ul>
          )}
          {role == "admin" && (
            <ul className="Sidebar-List">
              {SidebarDataAdmin.map((item, index) => {
                return (
                  <li
                    id={selectedItem === item.title ? "active" : ""}
                    className="row"
                    key={index}
                    onClick={() => setSelectedItem(item.title)}
                  >
                    <Box
                      sx={{
                        flex: "30%",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box
                      sx={{ flex: "70%", fontWeight: "600", fontSize: "13px" }}
                    >
                      {item.title}
                    </Box>
                  </li>
                );
              })}
            </ul>
          )}

          <Stack
            direction="row"
            spacing={1}
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              alignItems: "center",
              mb: 1,
            }}
          >
            <LogoutIcon />
            <div style={{ fontWeight: "600", fontSize: "22px" }}> logout</div>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ width: "83%" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminInterface;
