import React from "react";
import useAuth from "../Context/useAuth";

const Home = () => {
  const { auth } = useAuth();

  return (
    <div>
      weclcome {auth?.accessToken} with the role {auth?.role}
    </div>
  );
};

export default Home;
