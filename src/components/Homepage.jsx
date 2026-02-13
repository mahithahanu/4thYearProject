import React from "react";
import StudentDashboard from "./StudentDashboard";
import Users from "./users";
import Steps from "./steps";
import Services from "./services";
import Aboutus from "./About";
import HackathonCard from "./DashcardHackathonCards";
import { Toaster } from "react-hot-toast";

function Homepage() {
  return (
    <div>
      {/* Global toaster */}
      <Toaster position="top-right" />

      <StudentDashboard />
      <Users />
       <HackathonCard/>
      <Steps />
      <Services />
      <Aboutus />
    </div>
  );
}

export default Homepage;
