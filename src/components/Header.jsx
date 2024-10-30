// components/Header.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const Header = ({ title, addShift, openSettings, theme }) => {
  return (
    <header className="header">
      <h1 className="title">{title}</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <button className="addButton" onClick={addShift}>
          Добавить смену
        </button>
        <button className="settingsButton" onClick={openSettings}>
          <FontAwesomeIcon icon={faCog} className={`icon ${theme}`} />
        </button>
      </div>
    </header>
  );
};

export default Header;
