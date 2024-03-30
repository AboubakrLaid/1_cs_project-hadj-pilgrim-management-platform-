import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import RecoverPassword from "./Auth/RecoverPassword";
import LandingPage from "./Pages/LandingPage";
import CheckCode from "./Auth/CheckCode";
import Home from "./Pages/Home";
import PasswordReset from "./Auth/PasswordReset";
import Dashboard from "./content/Admin/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminInterface from "./Pages/AdminInterface";
import Season from "./content/Admin/Season";
import NewSeason from "./content/Admin/NewSeason";
import Method from "./content/Admin/Method";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/Home" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
          <Route path="/Register" element={<Signup />} />
          <Route path="/Forget-Password" element={<RecoverPassword />} />
          <Route path="/Check-Code" element={<CheckCode />} />
          <Route path="/Reset-Password" element={<PasswordReset />} />
          <Route path="/Admin" element={<AdminInterface />}>
            <Route index element={<Dashboard />} />
            <Route path="Season" element={<Season />} />
            <Route path="NewSeason" element={<NewSeason />} />
            <Route path="Method" element={<Method />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
