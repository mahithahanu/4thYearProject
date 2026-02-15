import React from "react";
import StudentDashboard from "./StudentDashboard";
import Users from "./users";
import Steps from "./steps";
import Services from "./services";
import Aboutus from "./About";
import HackathonCard from "./DashcardHackathonCards";
import { Toaster } from "react-hot-toast";

function Homepage() {
  const user = JSON.parse(localStorage.getItem("isLoggedIn") || "null");
  console.log("User on homepage:", user);

  return (
    <div>
      {/* Global toaster */}
      <Toaster position="top-right" />

      <StudentDashboard />
      <Users />

      {/* Show only if logged in */}
      {user && <HackathonCard />}
      {/* console.log("User on homepage:", user); */}

      <Steps />
      <Services />
      <Aboutus />
    </div>
  );
}

export default Homepage;
