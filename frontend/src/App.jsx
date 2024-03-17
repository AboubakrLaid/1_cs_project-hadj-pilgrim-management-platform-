import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import RecoverPassword from "./Auth/RecoverPassword";
import LandingPage from "./Pages/LandingPage";
import CheckCode from "./Auth/CheckCode";
import Home from "./Pages/Home";
import PasswordReset from "./Auth/PasswordReset";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/Home" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
          <Route path="/Register" element={<Signup />} />
          <Route path="/Forget-Password" element={<RecoverPassword />} />
          <Route path="/Check-Code" element={<CheckCode />} />
          <Route path="/Reset-Password" element={<PasswordReset />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
