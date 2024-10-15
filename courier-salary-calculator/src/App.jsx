import React, { useState, useEffect } from 'react';
import './App.css';
import SettingsModal from './components/SettingsModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [shifts, setShifts] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState('light'); // Тема приложения

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const addShift = () => {
    const newShift = {
      id: Date.now(), // Уникальный ID для каждой смены
      date: new Date().toLocaleDateString(), // Текущая дата
      number: shifts.length + 1, // Номер карточки
    };
    setShifts(prevShifts => [...prevShifts, newShift]); // Добавляем новую смену в массив
  };

  const deleteShift = (id) => {
    setShifts(prevShifts => prevShifts.filter(shift => shift.id !== id)); // Удаляем только выбранную карточку
  };

  return (
    <div className={`container ${theme}`}>
      <header className="header">
        <h1 className="title">Смены</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="addButton" onClick={addShift}>
            Добавить смену
          </button>
          <button className="settingsButton" onClick={() => setIsSettingsOpen(true)}>
            <FontAwesomeIcon icon={faCog} className={`icon ${theme}`} />
          </button>
        </div>
      </header>

      <div className="content">
        {shifts.length === 0 ? (
          <p className="noShiftsText">Смен пока нет</p>
        ) : (
          <div className="shiftList">
            {shifts.map(shift => (
              <div key={shift.id} className="shiftCard">
                <p style={{ fontSize: '0.8em', color: '#888' }}>{shift.date}</p>
                <h3>Карточка номер {shift.number}</h3>
                <button className="trashButton" onClick={() => deleteShift(shift.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} className={`icon ${theme}`} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {isSettingsOpen && (
        <SettingsModal
          closeModal={() => setIsSettingsOpen(false)}
          toggleTheme={toggleTheme}
          theme={theme}
        />
      )}

      <footer>
        <p>Разработчик Winter</p>
      </footer>
    </div>
  );
};

export default App;
