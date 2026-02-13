import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Users from "./users";
import Steps from "./steps";
import OrganizerWorkingProcess from "./OrganizerServices";
import Aboutus from "./About";
import OrganizerHackathonCard from "./OrganizerDashboardCard";



function OrganizerHomepage() {
  return (
      <div>
        <Home/>
        <Users/>
        <OrganizerHackathonCard/>
        <Steps/>
        <OrganizerWorkingProcess/>
        <Aboutus/>
      </div>
  );
}

export default OrganizerHomepage;
