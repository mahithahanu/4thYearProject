import { Outlet } from "react-router-dom";
import OrganizerHeader from "../components/OrganizerHeader"; // your organizer header
// import Footer from "../components/Footer"; // optional
import Footer from "./footer";

export default function OrganizerLayout() {
  return (
    <>
      <OrganizerHeader />
      <Outlet />
     <Footer />
    
    </>
  );
}
