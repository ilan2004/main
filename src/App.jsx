import React, { useRef } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Home from "./Pages/Home";
import Connect from "./Pages/Connect";
import './App.css'
import Form from "./Components/Form/Form";
import Layout from "./Components/Dashboard/shared/Layout";
import Dashboard from "./Pages/Dashboard";
import Footer from "./Components/Footer/Footer";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "./Contexts/AuthContext";

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
                <Route path='/login' element={<Connect />} />
                <Route path="/dashboard" element={<PrivateRoute><Layout /></PrivateRoute>}>
                  <Route index element={<Dashboard />} />
                </Route>
                <Route path="/form" element={<PrivateRoute><Layout /></PrivateRoute>}>
                  <Route index element={<Form />} />
                </Route>
              </Routes>
              <Footer />
            </div>
          </ReactLenis>
        </div>
        </NextUIProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
