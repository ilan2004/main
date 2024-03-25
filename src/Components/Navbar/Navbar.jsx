import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { animateScroll as scroll } from 'react-scroll';
import logo from '../../assets/img/Hertz.png';
import Transition from '../Transition/Transition';
import Header from './Header';

const Navbars = () => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [activeLink, setActiveLink] = useState(null); // Define activeLink state
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const prevScrollPos = handleScroll.prevScrollPos || currentScrollPos;
      
      if (currentScrollPos > prevScrollPos) {
        setScrollDirection('down');
      } else if (currentScrollPos < prevScrollPos) {
        setScrollDirection('up');
      }
      
      handleScroll.prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onUpdateActiveLink = (link) => {
    setActiveLink(link);
  };

  return (
    <Navbar className={scrollDirection === 'down' ? 'scrolling-down' : (scrollDirection === 'up' ? 'scrolling-up' : '')} >
      <Container className='box'>
        <Navbar.Brand href='#home'>
          <img className='emblem' src={logo} alt='' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic=navbar=nav'>
          <span className='navbar-toggler-icon'></span>
        </Navbar.Toggle>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link
              href='#Home'
              className={activeLink === 'Home' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => onUpdateActiveLink('#Home')}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href='#Services'
              className={activeLink === 'Services' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => onUpdateActiveLink('#Services')}
            >
              Services
            </Nav.Link>
            <Nav.Link
              href='#connect'
              className={activeLink === 'connect' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => onUpdateActiveLink('#connect')}
            >
              Contact Us
            </Nav.Link>
          </Nav>
          <span className='navbar-text'>
            <button className='vvd'>
              <a className='vvda' href='https://wa.me/917349344224'>
                <span>Let's Connect</span>
              </a>
            </button>
          </span>
        </Navbar.Collapse>
        <Header />
      </Container>
      
    </Navbar>
  );
}

export default Navbars;
