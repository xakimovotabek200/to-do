"use client";

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Register from "./auth/register/page";
import Calendar from "./Calendar/page";

function Home() {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Register />
  } else {
    if (location.pathname === "/") {
      return <Calendar />;
    }
  }
  useEffect(() => {
  }, [token]);


  return <Calendar/>;
}

export default Home;
