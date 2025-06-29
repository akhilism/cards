import axios from "axios";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import "../styles/CardDetail.css";
import { api } from "../api";
import { dummyText } from "./dummyText";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CardDetail = ({ id, onUpdate, onDelete }) => {
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(`${api}/${id}`)
      .then((res) => {
        console.log("res", res);
        setData(res.data);
      })
      .catch((err) => console.log("res1", err));
  }, []);
  return (
    <div>
      {!data ? (
        <p> Loading...</p>
      ) : (
        <div className="card-detail-container">
          <img src={data.image} alt={data.title} />
          <h3>
            {data.title} {data.id}{" "}
          </h3>
          <Typography>
            {data.description} {dummyText}{" "}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "10px",
            }}
          >
            <h3 style={{ margin: 0 }}>${data.price}</h3>
            <h3 style={{ margin: 0 }}>{data.quantity} items</h3>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "10px",
            }}
          >
            <h3 style={{ margin: 0 }}>{data.country}</h3>
            <h3 style={{ margin: 0 }}>
              {new Date(data.last_day).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h3>
          </div>
          <div style={{ marginTop: "20px", display: "flex", gap: "1rem" }}>
            <button
              className="iconBtn"
              onClick={() => onUpdate(data)}
              style={{ background: "#2196f3" }}
            >
              {" "}
              <EditIcon />
            </button>
            <button
              className="delete-btn iconBtn"
              onClick={() => onDelete(data.id)}
            >
              {" "}
              <DeleteIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetail;
