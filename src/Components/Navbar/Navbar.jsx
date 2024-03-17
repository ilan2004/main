import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css'
import { useState, useEffect } from 'react';
import logo from '../../assets/img/Hertz1.png';
import navIcon1 from '../../assets/img/nav-icon1.svg';
import navIcon2 from '../../assets/img/nav-icon2.svg';
import navicon3 from '../../assets/img/nav-icon3.svg';
import navicon4 from '../../assets/img/whatsapp.svg';

import { useInView } from "framer-motion";
import { useRef } from "react";
import Header from './Header';
const Navbars = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
      const onScroll = () => {
          if (window.scrollY > 50) {
              setScrolled(true);
          } else {
              setScrolled(false);
          }
      };
  
      window.addEventListener("scroll", onScroll);
  
      return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  const onUpdateActiveLink = (value) => {
      setActiveLink(value);
  };
  
  return (
    <>
      <Navbar className={ scrolled ? 'scrolled': ''}
      ref={ref}
      >
        <Container className='box'  style={{
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1.5s"
      }}>
          <Navbar.Brand href="#home">
            <img className='emblem' src={logo} alt="" /> 
          </Navbar.Brand>
          <Navbar.Toggle  aria-controls='basic=navbar=nav'>
            <span className='navbar-toggler-icon'></span>
          </Navbar.Toggle>
          <Navbar.Collapse id='basic-navbar-nav'>

          <Nav className="me-auto">
            <Nav.Link href="#home" className={activeLink === 'home'? 'active navbar-link' : 'navbar-link'} onClick={ () => onUpdateActiveLink('Home')}>Home</Nav.Link>
            <Nav.Link href="#Skills" className={activeLink === 'Skills'? 'active navbar-link' : 'navbar-link'} onClick={ () => onUpdateActiveLink('skills')}>Services</Nav.Link>
            <Nav.Link href="#Projects" className={activeLink === 'Projects'? 'active navbar-link' : 'navbar-link'} onClick={ () => onUpdateActiveLink('Projects')}>Contact Us</Nav.Link>
          </Nav>
          <span className='navbar-text'>
            {/* <div className="social-icon">
                <a href='#'><img src={navIcon1} alt=''/></a>
                <a href='#'><img src={navIcon2} alt=''/></a>
                <a href='#'><img src={navicon4} alt=''/></a>
            </div> */}
            <button className='vvd' onClick={()=> console.log('connect')}>  <a className='vvda' href="https://wa.me/917349344224">
    <span>Let's Connect</span>
  </a></button> 
            
          </span>
          
          </Navbar.Collapse>
          <Header/>
        </Container>
      </Navbar>
      

      
    </>
  );
}

export default Navbars;