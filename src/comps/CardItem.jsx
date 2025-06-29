import React from "react";
import "../styles/CardItem.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const CardItem = ({ title, image, onClick, onDelete, onUpdate }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "0.5rem",
          width: "100%",
          padding: "0 12px",
          marginTop: "auto",
        }}
      >
        <button
          className="iconBtn"
          style={{ background: "#2196f3" }}
          onClick={(e) => {
            e.stopPropagation();
            onUpdate();
          }}
        >
          <EditIcon />
        </button>
        <button
          className="delete-btn iconBtn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default CardItem;
