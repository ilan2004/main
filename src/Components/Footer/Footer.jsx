import React from 'react'
import logo from '../../assets/img/Hertz1.png';
import navIcon1 from '../../assets/img/nav-icon1.svg';
import navIcon2 from '../../assets/img/nav-icon2.svg';
import navicon3 from '../../assets/img/whatsapp.svg';
import './Footer.css'
import {Col,Row,Container} from 'react-bootstrap';
 const Footer = () => {
    const phoneNumber = "+918304963000";
    const emailAddress = "Hertzevsolutions@gmail.com";

    const handlePhoneClick = () => {
        window.location.href = `tel:${phoneNumber}`;
    };

    const handleEmailClick = () => {
        window.location.href = `mailto:${emailAddress}`;
    };
  return (
    <footer className='footer'>
        <Container>
            <Row className="align-items-center">
                <Col sm={6}>
                    <img className='emblem' src={logo}/>
                    <div className="num">
                            <p>Contact No:</p>
                            <p onClick={handlePhoneClick}>{phoneNumber}</p>
                            <p>Head Office :
Office # 388, 7th Main 8th Cross, Mico Layout, Bangalore, Karnataka, Pin- 560076.

Branch Office:
Building- 57, Kalpaka Nagar, Chackai, Trivandrum, Kerala, Pin – 695024

Upcoming Workshop:
Thrissur, Kerala</p>
                        </div>
                    
                </Col>
                <Col sm={6} className= "text-center text-sm-end">
                    <div className='social-icon'>
                    <a href=''><img src={navIcon1}/></a>
                    <a href=''><img src={navIcon2}/></a>
                    <a className='vvda' href="https://wa.me/918304963000"><img src={navicon3}/></a>
                    </div>
                    <p className='mail' onClick={handleEmailClick}>Email: {emailAddress}</p>
                        <p>CopyRight 2024, All Right Reserved</p>
                </Col>
                </Row>
        </Container>
    </footer>
  )
}
export default Footer;
