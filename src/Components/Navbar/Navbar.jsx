import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../../assets/img/dion.png';
import Header from './Header';
import { useAuth } from '../../Contexts/AuthContext';
import './Navbar.css';

const Navbars = () => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > prevScrollPos) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const url = currentUser ? '/Dashboard' : '/Login';
    window.open(url, '_blank');
  };

  return (
    <Navbar className={scrollDirection === 'down' ? 'scrolling-down' : (scrollDirection === 'up' ? 'scrolling-up' : '')}>
      <Container className='box'>
        <Navbar.Brand href='#home'>
          <img className='emblem' src={logo} alt='Dion Power' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav'>
          <span className='navbar-toggler-icon'></span>
        </Navbar.Toggle>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={NavLink} to='/' exact className='navbar-link'>
              Home
            </Nav.Link>
            <Nav.Link as={ScrollLink} to='Services' spy={true} smooth={true} offset={-70} duration={800} className='navbar-link'>
              Services
            </Nav.Link>
            <Nav.Link as={ScrollLink} to='connect' spy={true} smooth={true} offset={-70} duration={800} className='navbar-link'>
              Contact Us
            </Nav.Link>
            <Nav.Link as={Link} to={currentUser ? '/Dashboard' : '/Login'} onClick={handleClick} className='navbar-link'>
              Account
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
};

export default Navbars;
