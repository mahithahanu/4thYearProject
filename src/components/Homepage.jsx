import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";
import Users from "./users";
import Steps from "./steps";
import Services from "./services";
import Footer from "./footer";
import Aboutus from "./About";



function Homepage() {
  return (
      <div>
        <StudentDashboard/>
        <Users/>
        <Steps/>
        <Services/>
        <Aboutus/>
        <Footer/>
      </div>
  );
}

export default Homepage;
