import React, { useRef } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Home from "./Pages/Home";
import './App.css'
import Form from "./Components/Form/Form1";
import Layout from "./Components/Dashboard/shared/Layout";
import Dashboard from "./Pages/Dashboard";
import Footer from "./Components/Footer/Footer";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "./Contexts/AuthContext";
import LoginBox from "./Components/Login/Login1";
import ManageDashboard from "./Pages/Manager/MangeDashboard";
import ManagerLayout from "./Components/ManagerDash/shared/Layout";
import ManagerForm from "./Components/ManagerDash/Form/Form";

import { Loginpage } from "./Pages/Loginpage/loginpage";
export default function App() {
  const ref = useRef(null);

  useLenis(({ scroll }) => {});

  return (
    <BrowserRouter>
      <AuthProvider>
        <NextUIProvider>
        <div className="App">
          <ReactLenis root>
            <div className="app">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Loginpage/>} />
                <Route path="/dashboard" element={<PrivateRoute><Layout /></PrivateRoute>}>
                  <Route index element={<Dashboard />} />
                </Route>
                <Route path="/ManagerDashboard" element={<PrivateRoute><ManagerLayout /></PrivateRoute>}>
                  <Route index element={<ManageDashboard />} />
                </Route>
                <Route path="/form" element={<PrivateRoute><Layout /></PrivateRoute>}>
                  <Route index element={<Form />} />
                </Route>
                <Route path="/Manageform" element={<PrivateRoute><ManagerLayout /></PrivateRoute>}>
                  <Route index element={<ManagerForm />} />
                </Route>
              </Routes>

            </div>
          </ReactLenis>
        </div>
        </NextUIProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

