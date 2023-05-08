import React from 'react';
import logo from '../../assets/logo.png';
import './footer.css';

const Footer = () => (
  <div className="gpt3__footer" id="footer">
    <div className="gpt3__footer-heading">
      <h1 className="gradient__text">Step in to the future before others</h1>
    </div>

    <div className="gpt3__footer-btn">
      <p>Request Early Access</p>
    </div>

    <div className="gpt3__footer-links">
      <div className="gpt3__footer-links_logo">
        <img src={logo} alt="company logo" />
        <p>Elevated Villa, Cyber City, Gurugram, <br /> All Rights Reserved</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Links</h4>
        <p>Overons</p>
        <p>Social Media</p>
        <p>Counters</p>
        <p>Contact</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Get in touch</h4>
        <p>Elevated Villa, Cyber City, Gurugram</p>
        <p>9304967610</p>
        <p>elevatedSoul2225@gmail.com</p>
      </div>
    </div>

    <div className="gpt3__footer-copyright">
      <p>@elevatedSoul. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;