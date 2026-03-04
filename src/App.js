import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layouts/Layout";

import AuthChoice from "./components/Auth";
import Login from "./components/login";
import Signup from "./components/signup";
import ForgotPassword from "./components/forgotpassword";
import OtpVerification from "./components/otpverification";
import Reset from "./components/resetpassword";

import Homepage from "./components/Homepage";
import OrganizerHomepage from "./components/OrganizerHomepage";
import Posthackathon from "./components/PostHackathon.jsx";
import AllHackathons from "./components/AllHackathons.jsx";
import WorkPlace from "./components/WorkPlace.jsx";
import ProjectsPage from "./components/ProjectsPage.jsx";
import ProjectDetails from "./components/ProjectDetails.jsx";
import ChatsPage from "./chats/ChatPage.jsx";
import HackathonDetails from "./components/HackathonDetails.jsx";
import StudentHackathonForm from "./components/StudentHackathonForm.jsx";
import Teams from "./components/Teams.jsx";
import TeamAnalysis from "./components/TeamAnalysis.jsx";
import TeamInfo from "./components/TeamInfo.jsx";

import EditTeamDetails from "./components/EditTeam.jsx";
import ParticipantAnalysis from "./components/ParticipantAnalysis.jsx";
import TaskBoard from "./components/workplaceTaskDetails.jsx";
import Assessment from "./components/AssignmentQuestions.jsx";
import OrganizerLayout from "./Layouts/OrganizerLayout";
import OrganizerHackathonLayout from "./OrganizerhackathonDetail/OrganizerHackathonLayout";
import GeneralInfo from "./OrganizerhackathonDetail/GeneralInfo.jsx";
import TimelinePage from "./OrganizerhackathonDetail/TimelinePage.jsx";
import RulesPage from "./OrganizerhackathonDetail/RulesPage.jsx";
import ParticipantsPage from "./OrganizerhackathonDetail/ParticipantsPage.jsx";
import PublishingPage from "./OrganizerhackathonDetail/PublishingPage.jsx";
import OrganizerProjectsPage from "./OrganizerhackathonDetail/ProjectsPage.jsx";
import TeamManagement from "./components/TeamManagement.jsx";
import FormTeams from "./OrganizerhackathonDetail/FormTeams.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ❌ NO HEADER & FOOTER (Auth Pages) */}
        <Route path="/auth" element={<AuthChoice />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/:role" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<OtpVerification />} />
        <Route path="/reset" element={<Reset />} />


        {/* ✅ HEADER & FOOTER INCLUDED */}
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/allhackathons" element={<AllHackathons />} />
          <Route path="/workplace" element={<WorkPlace />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/hackthondetails/:id" element={<HackathonDetails />} />
          <Route path="/studenthackathonform/:id" element={<StudentHackathonForm />} />
          <Route path="/workplacetaskdetails" element={<TaskBoard />} />
        </Route>

        <Route path="/chat" element={<ChatsPage />} />
        <Route path="/teamanalysis/:type/:teamName" element={<TeamAnalysis />} />
        <Route path="/assessment" element={<Assessment />} />


        <Route element={<OrganizerLayout />}>
          <Route path="/organizer/dashboard" element={<OrganizerHomepage />} />
          <Route path="/posthackathon" element={<Posthackathon />} />
          <Route path="/editteam" element={<EditTeamDetails />} />
          <Route path="/teaminfo" element={<TeamInfo />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/participantanalysis" element={<ParticipantAnalysis />} />
          <Route path="/teammanagement" element={<TeamManagement />} />

        </Route>

        <Route element={<Layout />}>
          <Route
            path="/manage-hackathon/:hackathonId"
            element={<OrganizerHackathonLayout />}
          >
            <Route path="general" element={<GeneralInfo />} />
            <Route path="timeline" element={<TimelinePage />} />
            <Route path="rules" element={<RulesPage />} />
            <Route path="participants" element={<ParticipantsPage />} />
            <Route path="Organizerproject" element={<OrganizerProjectsPage />} />
            <Route path="publishing" element={<PublishingPage />} />
            <Route path="form-teams" element={<FormTeams />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
