import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ShiftEditPage.css"; // Импорт CSS стилей

const ShiftEditPage = () => {
  const { id } = useParams(); // Получаем ID смены из URL
  const navigate = useNavigate();
  const [shift, setShift] = useState(null);
  
  // Состояния для полей ввода
  const [mileage, setMileage] = useState("");
  const [mileage2, setMileage2] = useState("");
  const [mileage3, setMileage3] = useState(7); // Начальное значение для ставки
  const [hours, setHours] = useState("");
  const [hours2, setHours2] = useState("");
  const [hours3, setHours3] = useState(120); // Начальное значение для часов работы
  const [orders, setOrders] = useState("");
  const [orders2, setOrders2] = useState(100); // Начальное значение для количества заказов
  const [other, setOther] = useState("");

  useEffect(() => {
    const savedShifts = JSON.parse(localStorage.getItem("shifts"));
    const currentShift = savedShifts.find((s) => s.id === Number(id));
    setShift(currentShift);

    // Инициализация полей ввода из localStorage
    if (currentShift) {
      setMileage(currentShift.mileage || "");
      setMileage2(currentShift.mileage2 || "");
      setMileage3(currentShift.mileage3 || 7); // Установка начального значения, если оно не задано
      setHours(currentShift.hours || "");
      setHours2(currentShift.hours2 || "");
      setHours3(currentShift.hours3 || 120); // Установка начального значения, если оно не задано
      setOrders(currentShift.orders || "");
      setOrders2(currentShift.orders2 || 100); // Установка начального значения, если оно не задано
      setOther(currentShift.other || "");
    }
  }, [id]);

  // Функция для сохранения данных
  const handleSave = () => {
    const updatedShift = {
      ...shift,
      mileage,
      mileage2,
      mileage3,
      hours,
      hours2,
      hours3,
      orders,
      orders2,
      other,
    };
    
    // Обновление массива смен в localStorage
    const savedShifts = JSON.parse(localStorage.getItem("shifts"));
    const updatedShifts = savedShifts.map((s) =>
      s.id === updatedShift.id ? updatedShift : s
    );
    localStorage.setItem("shifts", JSON.stringify(updatedShifts));
    
    navigate("/"); // Возврат на главную страницу после сохранения
  };

  const handleBack = () => {
    navigate("/"); // Возврат на главную страницу при нажатии на "Назад"
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const formattedDate = new Date(date).toLocaleDateString("ru-RU", options);

    // Разделяем строку на части
    const parts = formattedDate.split(", ");
    // Делаем первый символ дня недели заглавным
    parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);

    return parts.join(", "); // Объединяем обратно в строку
  };

  return (
    <div className="containerEditPage">
      <button onClick={handleBack} className="backButton">
        Назад
      </button>
      {shift ? (
        <>
          <h3>{formatDate(shift.createdDate)}</h3>{" "}
          {/* Отображаем дату создания */}
          <div className="form">
            <label>Пробег:</label>
            <div className="dubleInput">
              <input
                type="number"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder="Введите пробег"
                className="formInput"
              />
              <input
                type="number"
                value={mileage2}
                onChange={(e) => setMileage2(e.target.value)}
                placeholder="Введите пробег"
                className="formInput"
              />
            </div>
            <label>Ставка:</label>
            <input
              type="number"
              value={mileage3}
              onChange={(e) => setMileage3(e.target.value)}
              placeholder="Ставка"
              className="inputN3"
            />
          </div>
          <div className="form">
            <label>Часы работы:</label>
            <div className="dubleInput">
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Введите часы"
                className="formInput"
              />
              <input
                type="number"
                value={hours2}
                onChange={(e) => setHours2(e.target.value)}
                placeholder="Введите часы"
                className="formInput"
              />
            </div>
              <label>Ставка:</label>
              <input
                type="number"
                value={hours3}
                onChange={(e) => setHours3(e.target.value)}
                placeholder="Ваша ставка"
                className="inputN3"
              />
          </div>
          <div className="form">
            <label>Количество заказов:</label>
            <input
              type="number"
              value={orders}
              onChange={(e) => setOrders(e.target.value)}
              placeholder="Введите количество заказов"
              className="formInput"
            />
            <label>Ставка:</label>
            <div className="input3AndP">
               <input
              type="number"
              value={orders2}
              onChange={(e) => setOrders2(e.target.value)}
              placeholder="Ваша ставка"
              className="inputN3"
            />
            <p>р.</p>
            </div>
           
          </div>
          <div className="form">
            <label>Прочее:</label>
            <input
              type="number"
              value={other}
              onChange={(e) => setOther(e.target.value)}
              placeholder="Введите прочие выплаты"
              className="formInput"
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={handleSave}
              style={{ marginRight: "10px" }}
              className="saveButton"
            >
              Сохранить изменения
            </button>
          </div>
        </>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
};

export default ShiftEditPage;
