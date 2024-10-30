import React, { useEffect, useState } from "react";
import "./SettingsModal.css";

const SettingsModal = ({ closeModal, toggleTheme, theme }) => {
  const [isClosing, setIsClosing] = useState(false); // Для анимации закрытия
  const [isOpening, setIsOpening] = useState(false); // Для анимации открытия

  useEffect(() => {
    // Включаем анимацию открытия при монтировании компонента
    setTimeout(() => {
      setIsOpening(true);
    }, 10);
  }, []);

  const handleClose = () => {
    setIsClosing(true); // Запускаем анимацию закрытия
  };

  // Закрытие модального окна при клике вне содержимого
  const handleOverlayClick = (e) => {
    // Проверяем, что клик был по фону, а не по содержимому
    if (e.target.classList.contains("modalOverlay")) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isClosing) {
      const timeoutId = setTimeout(() => {
        closeModal();
      }, 300); // Длительность анимации закрытия
      return () => clearTimeout(timeoutId);
    }
  }, [isClosing, closeModal]);

  return (
    <div
      className={`modalOverlay ${isClosing ? "closing" : ""} ${
        isOpening ? "opening" : ""
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className={`modalContent ${isClosing ? "closing" : ""} ${
          isOpening ? "opening" : ""
        }`}
      >
        <h2>Настройки</h2>
        <div className="themeToggle">
          <label>Тема:</label>
          <button onClick={toggleTheme}>
            {theme === "light" ? "Светлая" : "Тёмная"}
          </button>
        </div>
        <footer className="modalFooter">
          <p>Разработчик: Winter</p>
        </footer>
        <button className="closeButton" onClick={handleClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
