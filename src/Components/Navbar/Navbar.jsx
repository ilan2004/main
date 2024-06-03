// Navbar.jsx

import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../../assets/img/dion.png';
import Header from './Header';
import { useAuth } from '../../Contexts/AuthContext';
const Navbars = () => {

  const [activeLink, setActiveLink] = useState(null);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [scrolledBeyond100vh, setScrolledBeyond100vh] = useState(false);
  const { currentUser } = useAuth();
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const prevScrollPos = handleScroll.prevScrollPos || currentScrollPos;

      if (!scrolledBeyond100vh && currentScrollPos >= window.innerHeight) {
        setScrolledBeyond100vh(true);
      }

      if (scrolledBeyond100vh) {
        if (currentScrollPos > prevScrollPos) {
          setScrollDirection('down');
        } else if (currentScrollPos < prevScrollPos) {
          setScrollDirection('up');
        }
      }

      handleScroll.prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolledBeyond100vh]);

  const handleClick = (e) => {
    e.preventDefault(); // Prevent the default link behavior
    const url = currentUser ? '/Dashboard' : '/Login';
    window.open(url, '_blank'); // Open the URL in a new tab
  };
//smooth scroll

  return (
    <Navbar className={scrollDirection === 'down' ? 'scrolling-down' : (scrollDirection === 'up' ? 'scrolling-up' : '')} >
      <Container className='box'>
        <label href='#home'>
          <img className='emblem' src={logo} alt='' />
        </label>
        
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <ul className='alllinks'>
          <li>
            <NavLink
              as={Link}
              to ='/'
              className={activeLink === '#Home' ? 'active navbar-link' : 'navbar-link'} // Update comparison value
            >
              Home
            </NavLink>
            </li>
            <ScrollLink
             to="Services" 
            spy={true} 
            smooth={true} 
             offset={50} 
             duration={800} 
    >
           <li> <NavLink
              onClick={() => handleScrollTo('Services')}
              href='#Services'
              className={activeLink === 'Services' ? 'active navbar-link' : 'navbar-link'}
              
           >
              Services
            </NavLink>
            </li>
            </ScrollLink>
            <ScrollLink
             to="connect" 
            spy={true} 
            smooth={true} 
             offset={50} 
             duration={800} 
    >
      <li>
            <NavLink
              onClick={() => handleScrollTo('#connect')}
              className={activeLink === '#connect' ? 'active navbar-link' : 'navbar-link'} // Update comparison value
              href='#connect'
            >
              Contact Us
            </NavLink>
            </li>
            </ScrollLink>

           <li> <NavLink
            href={currentUser ? '/Dashboard' : '/Login'}
            onClick={handleClick}// Check if user is logged in
              className={activeLink === '#Login' ? 'active navbar-link' : 'navbar-link'} // Update comparison value
              >
              Account
              </NavLink>
              </li>
              </ul>
          </Nav>
          <span className='navbar-text'>
            <button className='vvd'>
              <a className='vvda' href='https://wa.me/918304963000'>
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