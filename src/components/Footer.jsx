import React from "react";
import footer from "../assets/img/bg-footer.svg";
import logo from "../assets/img/logo.png";
import vk from "../assets/img/vk.svg";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        {/* <div className="footer-left">
          <ul>
            <li>
              <a
                href="https://мая.рф"
                target="_blank"
                rel="noopener noreferrer"
              >
                Калорийность и состав
              </a>
            </li>
            <li>
              <a
                href="https://мая.рф"
                target="_blank"
                rel="noopener noreferrer"
              >
                Политика конфиденциальности
              </a>
            </li>
          </ul>
        </div> */}
        <div className="footer-center">
          <img src={logo} alt="logo" className="footer-logo" />
          <h3>г. Симферополь</h3>
        </div>
        <div className="footer-right">
          <ul>
            <li>
              <a
                href="https://vk.com/mayasimf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={vk} alt="vk" className="footer-right__icon" />
              </a>
            </li>
          </ul>
          <a className="footer-right__tel" href="tel:+79784441414"> + 7 (978) 444 14 14 </a>
        </div>
      </div>
      <div className='footer-bg'>
            <img src={footer} alt="footer" />
        </div>
    </div>
  );
}
