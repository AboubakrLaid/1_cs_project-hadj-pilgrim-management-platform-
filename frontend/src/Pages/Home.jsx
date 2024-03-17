import React from "react";
import useAuth from "../Context/useAuth";

const Home = () => {
  const { auth } = useAuth();

  return <div>weclcome {auth?.accessToken}</div>;
};

export default Home;
