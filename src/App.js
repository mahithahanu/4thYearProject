import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthChoice from "./components/Auth";
import Login from "./components/login";
import Signup from "./components/signup";
import ForgotPassword from "./components/forgotpassword";
import OtpVerification from "./components/otpverification";
import Reset from "./components/resetpassword";
import Homepage from "./components/Homepage"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthChoice />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<OtpVerification/>}/>
         <Route path="/reset" element={<Reset/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
