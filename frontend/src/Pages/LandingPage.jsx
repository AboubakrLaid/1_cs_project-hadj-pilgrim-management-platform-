import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import Content1 from "../content/LandingPage/Content1";
import Content2 from "../content/LandingPage/Content2";
import Content3 from "../content/LandingPage/Content3";
import Content4 from "../content/LandingPage/Content4";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="Landing-page-Head">
        <Stack
          direction="row"
          sx={{
            height: "90px",
            width: "100%",

            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgba(231, 217, 202, 0.2)",
            p: 3,
          }}
        >
          <h1>logo</h1>
          <span>Home</span>
          <button
            className="button"
            style={{ width: "120px", height: "50px", borderRadius: "15px" }}
            onClick={handleLogin}
          >
            login
          </button>
        </Stack>
        <p>
          Hajj with Ease <br />
          Faith with Peace
        </p>
        <span>
          Welcome to our portal, where every visitor is invited to explore the
          magnificence of Hajj with comprehensive support to enable you to fully
          immerse yourself in this unforgettable experience.
        </span>
        <button
          className="button"
          style={{
            width: "180px",
            height: "60px",
            borderRadius: "15px",
            marginBottom: "260px",
          }}
        >
          Get started
        </button>
      </div>
      <Content1 />
      <Content2 />
      <Content3 />
      <Content4 />
    </>
  );
};

export default LandingPage;
