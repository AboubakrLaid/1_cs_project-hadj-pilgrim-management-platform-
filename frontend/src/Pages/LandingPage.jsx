import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div>hey</div>
      <Link to="/Login">Login</Link>
      <br />
      <Link to="/Register">Register</Link>
    </>
  );
};

export default LandingPage;
