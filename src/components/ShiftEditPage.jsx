import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ShiftEditPage.css"; // Импорт CSS стилей

const ShiftEditPage = ({ theme }) => {
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
      setMileage3(currentShift.mileage3 || 7);
      setHours(currentShift.hours || "");
      setHours2(currentShift.hours2 || "");
      setHours3(currentShift.hours3 || 120);
      setOrders(currentShift.orders || "");
      setOrders2(currentShift.orders2 || 100);
      setOther(currentShift.other || "");
    }
  }, [id]);

  // Функция для обработки изменения значений
  const handleNumericChange = (setter) => (value) => {
    // Удаляем все, кроме цифр
    let parsedValue = value.replace(/[^0-9]/g, "");
  
    // Проверяем, чтобы первое число не было 0 и длина не превышала 6 символов
    if (parsedValue.startsWith("0")) {
      parsedValue = parsedValue.slice(1); // Убираем ведущий 0
    }
  
    // Ограничиваем длину до 6 цифр
    if (parsedValue.length > 6) {
      parsedValue = parsedValue.slice(0, 6);
    }
  
    // Устанавливаем новое значение
    setter(parsedValue);
  };

  const validateTimeInput = (value) => {
    // Регулярное выражение для времени в формате HH:MM (24-часовой формат)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    
    // Проверяем соответствие формату
    if (timeRegex.test(value)) {
      return value; // Возвращаем значение, если оно верное
    } else {
      return ""; // Если не соответствует, возвращаем пустую строку или можно указать другое поведение
    }
  };
  
  

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
    const parts = formattedDate.split(", ");
    parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    return parts.join(", ");
  };

  // Вычисления для сумм
  const calculateMileageSum = () => {
    const mileageVal1 = parseFloat(mileage) || 0;
    const mileageVal2 = parseFloat(mileage2) || 0;
    return Math.max(0, (mileageVal2 - mileageVal1) * mileage3);
  };

  const calculateHoursSum = () => {
    const hoursVal1 = parseFloat(hours) || 0;
    const hoursVal2 = parseFloat(hours2) || 0;
    return Math.max(0, (hoursVal2 - hoursVal1) * hours3);
  };

  const calculateOrdersSum = () => {
    const ordersVal = parseFloat(orders) || 0;
    return Math.max(0, ordersVal * orders2);
  };

  return (
    <div className={`containerEditPage ${theme}`}>
      <button onClick={handleBack} className="backButton">
        Назад
      </button>
      {shift ? (
        <>
          <h3>{formatDate(shift.createdDate)}</h3>
          <div className="form">
            <label>Пробег:</label>
            <div className="dubleInput">
              <input
                type="text" // Измените на text, чтобы избежать встроенной валидации чисел
                value={mileage}
                onChange={(e) => handleNumericChange(setMileage)(e.target.value)}
                placeholder="Введите пробег"
                className="formInput disabled_scroll"
              />
              <input
                type="text" // Измените на text, чтобы избежать встроенной валидации чисел
                value={mileage2}
                onChange={(e) => handleNumericChange(setMileage2)(e.target.value)}
                placeholder="Введите пробег"
                className="formInput disabled_scroll"
              />
            </div>
            <div className="stakeAndInput">
              <label>Ставка:</label>
              <input
                type="number"
                value={mileage3}
                onChange={(e) => setMileage3(e.target.value)}
                placeholder="Ставка"
                className="inputN3 disabled_scroll"
                min="0"
              />
              <p>Сумма: {calculateMileageSum()}</p>
            </div>
          </div>
          <div className="form">
            <label>Часы работы:</label>
            <div className="dubleInput">
              <input
                type="text" // Измените на text, чтобы избежать встроенной валидации чисел
                value={hours}
                onChange={(e) => setHours(validateTimeInput(e.target.value))}
                placeholder="Введите часы"
                className="formInput disabled_scroll"
              />
              <input
                type="text" // Измените на text, чтобы избежать встроенной валидации чисел
                value={hours2}
                onChange={(e) => setHours2(validateTimeInput(e.target.value))}
                placeholder="Введите часы"
                className="formInput disabled_scroll"
              />
            </div>
            <div className="stakeAndInput">
              <label>Ставка:</label>
              <input
                type="number"
                value={hours3}
                onChange={(e) => setHours3(e.target.value)}
                placeholder="Ваша ставка"
                className="inputN3 disabled_scroll"
                min="0"
              />
              <p>Сумма: {calculateHoursSum()}</p>
            </div>
          </div>
          <div className="form">
            <label>Количество заказов:</label>
            <input
              type="text" // Измените на text, чтобы избежать встроенной валидации чисел
              value={orders}
              onChange={(e) => handleNumericChange(setOrders)(e.target.value)}
              placeholder="Введите количество заказов"
              className="formInput disabled_scroll"
            />
            <div className="stakeAndInput">
              <label>Ставка:</label>
              <input
                type="number"
                value={orders2}
                onChange={(e) => setOrders2(e.target.value)}
                placeholder="Ваша ставка"
                className="inputN3 disabled_scroll"
                min="0"
              />
              <p>Итог: {calculateOrdersSum()}</p>
            </div>
          </div>
          <div className="form">
            <label>Прочее:</label>
            <input
              type="text" // Измените на text, чтобы избежать встроенной валидации чисел
              value={other}
              onChange={(e) => handleNumericChange(setOther)(e.target.value)}
              placeholder="Введите прочие выплаты"
              className="formInput disabled_scroll"
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
