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
            <Navbars />
            <Routes >
            
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Connect/>}/>
            <Route path="/Form"

                element={
                  <PrivateRoute>
                    <Form />
                  </PrivateRoute>
                }
              ></Route>
              
            </Routes>
            <Footer />
          </div>
        </ReactLenis>
      </div>
      </AuthProvider>
    </BrowserRouter>

  );
}

