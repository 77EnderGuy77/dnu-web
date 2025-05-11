import "../css/footer.css";

import logo from "../assets/logo_bottom.svg";
import pet_world from "../assets/pet_world_bottom.svg";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-top-left">
          <div className="footer-top-left-logo">
            <img src={logo} alt="logo" className="footer-top-left-logo-img" />
          </div>
          <div className="footer-top-left-text">
            <img src={pet_world} alt="pet_world" />
          </div>
        </div>
        <div className="footer-top-right">
          <div className="footer-top-right-text-container">
            <p className="footer-top-right-text">Контакти</p>
          </div>
          <div className="footer-top-right-email-container">
            <a
              className="footer-top-right-email"
              href="mailto:petworld@gmail.com"
            >
              petworld@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-legal">
          <p className="footer-legal-text">Copyright 2025</p>
          <span className="footer-legal-separator">|</span>
          <a className="footer-legal-link" href="#">
            Політика конфіденційності
          </a>
        </div>
      </div>
    </div>
  );
};
