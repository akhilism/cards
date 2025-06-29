import React, { useEffect, useState } from "react";
import "../styles/Cards.css";
import CardItem from "../comps/CardItem";
import axios from "axios";
import { api } from "../api";
import Modal from "../comps/Modal";
import CardDetail from "../comps/CardDetail";
import AddIcon from "@mui/icons-material/Add";
import NewCard from "../comps/NewCard";

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [currCard, setCurrCard] = useState(null);
  const [addNew, setAddNew] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const fetchCards = async () => {
    try {
      const res = await axios.get(api);
      setCards(res.data);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/${id}`);
      setCards((prev) => prev.filter((card) => card.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const cardClick = (id) => {
    setShowCard(true);
    setCurrCard(id);
  };

  return (
    <div className="cards-wrapper">
      <div className="cards-header">
        <button className="add-btn" onClick={() => setAddNew(true)}>
          <AddIcon />
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="cards-grid">
          {cards
            .slice()
            .reverse()
            .map((card) => (
              <div key={card.id}>
                <CardItem
                  key={card.id}
                  title={card.title}
                  image={card.image}
                  //   onClick={() => console.log("Open modal for:", card.id)}
                  onClick={() => cardClick(card.id)}
                  onDelete={() => handleDelete(card.id)}
                  onUpdate={() => {
                    setEditingCard(card);
                    setAddNew(true);
                  }}
                />
              </div>
            ))}
        </div>
      )}
      <Modal isOpen={showCard} onClose={() => setShowCard(false)}>
        <CardDetail
          id={currCard}
          onUpdate={(cardData) => {
            setEditingCard(cardData);
            setShowCard(false);
            setAddNew(true);
          }}
          onDelete={async (id) => {
            await handleDelete(id);
            setShowCard(false);
          }}
        />
      </Modal>
      <Modal
        isOpen={addNew}
        onClose={() => {
          setAddNew(false);
          setEditingCard(null);
        }}
      >
        <NewCard
          initialData={editingCard}
          mode={editingCard ? "update" : "add"}
        />
      </Modal>
    </div>
  );
};

export default Cards;
