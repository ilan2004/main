import React from 'react'
import logo from '../../assets/img/dion.png';
import navIcon1 from '../../assets/img/nav-icon1.svg';
import navIcon2 from '../../assets/img/nav-icon2.svg';
import navicon3 from '../../assets/img/whatsapp.svg';
import './Footer.css'
import {Col,Row,Container} from 'react-bootstrap';
 const Footer = () => {
    const phoneNumber = "+918304963000";
    const emailAddress = "info@dionpower.in";

    const handlePhoneClick = () => {
        window.location.href = `tel:${phoneNumber}`;
    };

    const handleEmailClick = () => {
        window.location.href = `mailto:${emailAddress}`;
    };
  return (
    <footer className='footer'>
        <Container className='footer-cont'>
            <Row className="align-items-center">
                <Col sm={6}>
                    <img className='emblem' src={logo}/>
                    <div className="num">
                            
                            
<div className='allad'> <div className="ad1"><spam  className='thick'>Head Office :</spam></div><div className="ad2"> Office # 388, 7th Main 8th Cross, Mico Layout,<spam className='thick'> Bangalore , Karnataka,</spam> Pin : 560076.</div>
</div>
<div className='allad'> <div className="ad1">
<spam  className='thick'>
Branch Office:
</spam>
</div>
<div className="ad2">
Building- 57, Kalpaka Nagar, Chackai,<spam  className='thick'> Trivandrum , Kerala</spam>, Pin  695024
</div>

</div>
<div className='allad'> <div className="ad1">
<spam  className='thick'>

</spam>
</div>
<div className="ad2">
Cherakkyath Building Thengod Kakkanad<spam  className='thick'> Cochin , Kerala</spam>, Pin 680510
</div>

</div>
<div className='allad2'> <div className="ad1">
 <spam  className='thick'>Workshop :</spam></div><div className="ad2"><spam  className='thick'> Office A1, Deepa Apartment, venkitangu, Thrissur.
Pin : 680510 </spam></div>
</div>
</div>

                    
                </Col>
                <Col sm={6} className= "text-center items-center justify-center text-sm-end">
                <div className='map-box'>
                    <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.3818307303235!2d76.090987!3d10.5203517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ed77b014b7d1%3A0x594202c455434ca3!2sDion%20Power%20Solutions%20LLP!5e0!3m2!1sen!2sin!4v1690979022343!5m2!1sen!2sin"
                    className='map'
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    </div>
                    <div className='social-icon'>
                    <a href=''><img src={navIcon1}/></a>
                    <a href='https://www.facebook.com/profile.php?id=61559168102771'><img src={navIcon2}/></a>
                    <a className='vvda' href="https://wa.me/918304963000"><img src={navicon3}/></a>
                    </div>
                    <p className='mail' onClick={handleEmailClick}>Email: {emailAddress}</p>
                    <p>Contact No:</p>
                    <p onClick={handlePhoneClick}>{phoneNumber}</p>
                        <p>CopyRight 2024, All Right Reserved</p>
                </Col>
                </Row>
        </Container>
    </footer>
  )
}
export default Footer;
