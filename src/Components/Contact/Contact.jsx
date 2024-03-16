import React, { useRef } from 'react'
import { useState } from 'react'
import Contactimg from '../../assets/img/email.svg';
import {Container,Row, Col} from 'react-bootstrap';
import { useInView } from "framer-motion";
import { SnackbarProvider, useSnackbar } from 'notistack';
import './Contact.css'
import emailjs from '@emailjs/browser';
const ContactWithSnackbar = () => {
    const form = useRef();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const { enqueueSnackbar } = useSnackbar();
  
    const sendEmail = (e) => {
      e.preventDefault();
  
      const firstName = form.current.from_name.value;
      const email = form.current.from_email.value;
      const message = form.current.message.value;
  
      if (!firstName || !email || !message) {
        enqueueSnackbar('Please fill out all required fields', { variant: 'warning' });
        return;
      }
  
      emailjs
        .sendForm('service_t8joh1r', 'template_wgyccnb', form.current, {
          publicKey: 'MtWVrckAyn8Jy7_mP',
        })
        .then(
            () => {
              console.log('SUCCESS!');
              enqueueSnackbar('Email sent successfully', { variant: 'success' });
              // Reset form fields
              form.current.reset();
            },
          (error) => {
            console.log('FAILED...', error.text);
            enqueueSnackbar('Failed to send email. Please try again later.', { variant: 'error' });
          },
        );
    };
  
    return (
      <section className='contact' id='connect'>
        <Container>
          <Row className='align-items-center'>
            <Col md={6}>
              <img  src={Contactimg} alt="Contact US"/>
            </Col>
            <Col md={6}>
              <h2>Get In Touch</h2>
              <form ref={form} onSubmit={sendEmail}>
                <Row>
                  <Col sm={6} className="px-1">
                    <input type='text' name="from_name" placeholder="First Name" />
                  </Col>
                  <Col sm={6} className="px-1">
                    <input type='text' placeholder="Last Name" />
                  </Col>
                  <Col sm={6} className="px-1">
                    <input type='email' name="from_email" placeholder="Email" />
                  </Col>
                  <Col sm={6} className="px-1">
                    <input type='text' name="Phone_no" placeholder="Phone No." />
                  </Col>
                  <Col>
                    <input row="6" name="message" placeholder='Message' ></input>
                    <button type="submit">Send</button>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    );
  };
  
  const Contact = () => (
    <SnackbarProvider>
      <ContactWithSnackbar />
    </SnackbarProvider>
  );
  
  export default Contact;