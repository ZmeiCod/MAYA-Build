import React, { useState } from "react";
import cookies from "../assets/ui/cookies.svg";
// import pdf from "../assets/document/Пример.pdf";

export default function Cookies() {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    const date = new Date();
    date.setTime(date.getTime() + 3 * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;

    document.cookie = `cookiesConsent=accepted; ${expires}; path=/`;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookies-banner">
      <img src={cookies} alt="cookies" />
      <div className="cookies-banner__text">
        <span>Мы используем куки файлы для улучшения сайта </span>
        {/* <span> Мы используем куки файлы, вот </span>
        <a href={pdf} target="_blank" rel="noopener noreferrer">
          условия их обработки
        </a> */}
      </div>
      <button onClick={handleClose}>Принять</button>
    </div>
  );
}
