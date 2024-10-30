import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; // Уберите BrowserRouter
import "./App.css";
import SettingsModal from "./components/SettingsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ShiftEditPage from "./components/ShiftEditPage"; // Импорт страницы редактирования


const App = () => {
  const [shifts, setShifts] = useState([]);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState("light"); // Тема приложения

  // Загружаем сохраненные смены из localStorage при монтировании компонента
  useEffect(() => {
    const savedShifts = localStorage.getItem("shifts");
    if (savedShifts) {
      setShifts(JSON.parse(savedShifts)); // Загружаем данные из localStorage
    }
  }, []);

  // Сохраняем смены в localStorage при изменении массива shifts
  useEffect(() => {
    if (shifts.length > 0) {
      // Добавляем проверку, чтобы не сохранять пустой массив
      localStorage.setItem("shifts", JSON.stringify(shifts)); // Сохраняем смены в localStorage
    } else {
      localStorage.removeItem("shifts"); // Очищаем localStorage, если массив пуст
    }
  }, [shifts]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Вставьте этот код в App.jsx
  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const formattedDate = new Date(date).toLocaleDateString("ru-RU", options);

    const parts = formattedDate.split(", ");
    parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);

    return parts.join(", ");
  };

  const addShift = () => {
    const newShift = {
      id: Date.now(), // Уникальный ID для каждой смены
      createdDate: new Date(), // Сохраняем текущую дату как объект Date
      number: shifts.length + 1, // Номер карточки
    };
    setShifts((prevShifts) => [...prevShifts, newShift]); // Добавляем новую смену в массив
  };

  const deleteShift = (id) => {
    setShifts((prevShifts) => prevShifts.filter((shift) => shift.id !== id)); // Удаляем только выбранную карточку
  };

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/edit-shift/${id}`); // Перенаправление на страницу редактирования карточки
  };

  return (
    <div className={`container ${theme}`}>
      <header className="header">
        <h1 className="title">Смены</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="addButton" onClick={addShift}>
            Добавить смену
          </button>
          <button
            className="settingsButton"
            onClick={() => setIsSettingsOpen(true)}
          >
            <FontAwesomeIcon icon={faCog} className={`icon ${theme}`} />
          </button>
        </div>
      </header>

      <div className="content">
        {shifts.length === 0 ? (
          <p className="noShiftsText">Смен пока нет</p>
        ) : (
          <div className="shiftList">
            {shifts.map((shift) => (
              <div
                key={shift.id}
                className="shiftCard"
                onClick={() => handleCardClick(shift.id)} // Добавляем обработчик клика
              >
                <div className="textInCard">
                  <p style={{ fontSize: "0.8em", color: "#888" }}>
                    {formatDate(shift.createdDate)}{" "}
                    {/* Показываем дату создания */}
                  </p>
                  <h3>Карточка номер {shift.number}</h3>
                </div>
                <button
                  className="trashButton"
                  onClick={(e) => {
                    e.stopPropagation(); // Останавливаем всплытие события клика
                    deleteShift(shift.id);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className={`icon ${theme}`}
                  />
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

// Обертка для маршрутизации
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/edit-shift/:id" element={<ShiftEditPage />} />
      {/* Маршрут для несуществующих страниц */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// Страница "Не найдено"
const NotFound = () => {
  return <h2>Страница не найдена (404)</h2>;
};

export default AppRouter;
