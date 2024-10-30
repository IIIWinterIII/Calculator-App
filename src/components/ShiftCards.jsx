// ShiftCards.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./ShiftCards.css"

const ShiftCards = ({ shifts, formatDate, handleCardClick, deleteShift, theme }) => {
  return (
    <div className="content">
      {shifts.length === 0 ? (
        <p className="noShiftsText">Смен пока нет</p>
      ) : (
        <div className="shiftList">
          {shifts.map((shift) => (
            <div
              key={shift.id}
              className="shiftCard"
              onClick={() => handleCardClick(shift.id)}
            >
              <div className="textInCard">
                <p style={{ fontSize: "0.8em", color: "#888" }}>
                  {formatDate(shift.createdDate)}
                </p>
                <h3>Карточка номер {shift.number}</h3>
              </div>
              <button
                className="trashButton"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteShift(shift.id);
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} className={`icon ${theme}`} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShiftCards;
