import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./footer";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />   {/* 👈 page content comes here */}
      <Footer />
    </>
  );
}
