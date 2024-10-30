import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import SettingsModal from "./components/SettingsModal";
import ShiftEditPage from "./components/ShiftEditPage";
import ShiftCards from "./components/ShiftCards";
import Header from "./components/Header"; // Импортируем Header

const App = () => {
  const [shifts, setShifts] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedShifts = localStorage.getItem("shifts");
    if (savedShifts) {
      setShifts(JSON.parse(savedShifts));
    }
  }, []);

  useEffect(() => {
    if (shifts.length > 0) {
      localStorage.setItem("shifts", JSON.stringify(shifts));
    } else {
      localStorage.removeItem("shifts");
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
      id: Date.now(),
      createdDate: new Date(),
      number: shifts.length + 1,
    };
    setShifts((prevShifts) => [...prevShifts, newShift]);
  };

  const deleteShift = (id) => {
    setShifts((prevShifts) => prevShifts.filter((shift) => shift.id !== id));
  };

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/edit-shift/${id}`);
  };

  const openSettings = () => setIsSettingsOpen(true);

  return (
    <div className={`container ${theme}`}>
      <Header
        title="Смены"
        addShift={addShift}
        openSettings={openSettings}
        theme={theme}
      />

      {/* Используем компонент ShiftCards */}
      <ShiftCards
        shifts={shifts}
        formatDate={formatDate}
        handleCardClick={handleCardClick}
        deleteShift={deleteShift}
        theme={theme}
      />

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

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/edit-shift/:id" element={<ShiftEditPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const NotFound = () => {
  return <h2>Страница не найдена (404)</h2>;
};

export default AppRouter;
