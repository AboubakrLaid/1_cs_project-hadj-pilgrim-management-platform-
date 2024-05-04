import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ShuffleIcon from "@mui/icons-material/Shuffle";
//import { SidebarData } from "./SidebarData";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { FaUserDoctor } from "react-icons/fa6";
import { RiFilePaper2Fill } from "react-icons/ri";
import { FaUserCog } from "react-icons/fa";
import Photo from "../assets/AdminImg.png";
import Newyear from "../assets/NewYear.png";
import Random from "../assets/Random.png";
const SidebarDataGeneral = [
  {
    title: "Dashboard",
    path: "/Admin",
    icon: <HomeIcon />,
  },
  {
    title: "Season",
    path: "/Admin/Season",
    icon: <img src={Newyear} />,
  },
  {
    title: "Lottery",
    path: "/Admin/Method",
    icon: <img src={Random} />,
  },
  {
    title: "Admins",
    path: "/Admin/Admins",
    icon: <FaUserCog />,
  },
];

const SidebarDataAdmin = [
  {
    title: "Dashboard",
    path: "/Admin",
    icon: <HomeIcon />,
  },
  {
    title: "Members",
    path: "/Admin/Members",
    icon: <PersonIcon />,
  },
  {
    title: "Doctors",
    path: "/Admin/Doctors",
    icon: <FaUserDoctor />,
  },
  {
    title: "Lottery",
    path: "/Admin/Lottery",
    icon: <RiFilePaper2Fill />,
  },
];

const AdminInterface = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const lastPathSegment = location.pathname.split("/").pop(); // Get the last segment of the pathname

    if (lastPathSegment === "Admin") {
      setSelectedItem("Dashboard");
    } else if (lastPathSegment === "Method") {
      setSelectedItem("Lottery");
    } else {
      setSelectedItem(lastPathSegment);
    }
  }, [location.pathname]);

  const handleItemClick = (item) => {
    setSelectedItem(item.title);
    //localStorage.setItem("selectedItem", item.title);
    navigate(item.path);
  };
  return (
    //--------------------------------------------SIDEBAR------------------------------------//

    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          width: { xs: "100%", md: "300px" },
          borderTopRightRadius: { xs: "0px", md: "20px" },
          borderBottomLeftRadius: { xs: "20px", md: "0px" },
          height: { xs: "200px", md: "100%" },
        }}
      >
        <Box
          sx={{
            height: { xs: "100%", md: "30%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: "30%", md: "100%" },
            borderTopRightRadius: { xs: "0px", md: "20px" },
            borderBottomLeftRadius: { xs: "20px", md: "0px" },
            backgroundColor: "#996986",
            borderBottom: "2px solid rgba(0, 0, 0, 0.4)",
          }}
        >
          <Avatar
            src={Photo}
            alt={name}
            sx={{
              width: { xs: "70px", sm: "90px", md: "110px" },
              height: { xs: "70px", sm: "90px", md: "110px" },
            }}
          />
          <div style={{ color: "white", fontWeight: "600", marginTop: "10px" }}>
            {name}
          </div>
        </Box>
        <Box
          sx={{
            paddingTop: "20px",
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            justifyContent: "space-between",
            height: { xs: "100%", md: "70%" },
            background: "#ab7595",
            width: "100%",
          }}
        >
          {role == "GeneralAdmin" && (
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
                      sx={{
                        flex: "70%",
                        fontWeight: "600",
                        fontSize: { xs: "14px", md: "21px" },
                      }}
                    >
                      {item.title}
                    </Box>
                  </li>
                );
              })}
            </ul>
          )}
          {role == "Admin" && (
            <ul className="Sidebar-List">
              {SidebarDataAdmin.map((item, index) => {
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
                      sx={{
                        flex: "70%",
                        fontWeight: "600",
                        fontSize: { xs: "14px", md: "21px" },
                      }}
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
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              alignItems: "center",
              mb: 1,
              ":hover": {
                cursor: "pointer",
                color: "red",
              },
            }}
          >
            <LogoutIcon />
            <span
              style={{
                fontWeight: "600",
                fontSize: { xs: "14px", md: "21px" },
              }}
            >
              logout
            </span>
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          overflowY: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminInterface;
