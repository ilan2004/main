import "./App.css";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { useEffect, useRef } from "react";

import Navbars from './Components/Navbar/Navbar';
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Hero from './Components/Hero/Hero';
import { useInView } from "framer-motion";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { AuthProvider } from "./Contexts/AuthContext";
import Home from "./Pages/Home";
import Connect from "./Pages/Connect";
import Form from "./Components/Form/Form";
import Layout from "./Components/Dashboard/shared/Layout";
import Dashboard from "./Pages/Dashboard";

export default function App() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  

  const lenis = useLenis(({ scroll }) => {});

  return (

    <BrowserRouter>
    <AuthProvider>
      <div className="App">
        <ReactLenis root>
          <div className="app">
        
            <Routes >
            
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Connect/>}/>
            <Route path="/Dashboard" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                </Route>
            <Route path="/Form" element={<Layout />}>
                    <Route index element={<Form />} />
            </Route>
              
            </Routes>
            <Footer />
          </div>
        </ReactLenis>
      </div>
      </AuthProvider>
    </BrowserRouter>

  );
}

