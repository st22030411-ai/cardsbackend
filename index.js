import express from "express";
import { connectDB } from "./db.js";
import { Card } from "./models/Card.js";

import cors from "cors";


const app = express();
connectDB();

app.use(express.json());
app.use(cors());


app.post("/createCard", async (req, res) => {
  try {
    const card = await Card.create(req.body);
    res.status(201).json({ message: "Card created successfully", card });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating card");
  }
});


app.get("/getAllCards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving cards");
  }
});


app.get("/getCard/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).send("Card not found");
    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving card");
  }
});


app.put("/updateCard/:id", async (req, res) => {
  try {
    const updated = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      overwrite: true,
    });
    if (!updated) return res.status(404).send("Card not found");
    res.status(200).json({ message: "Card fully updated", updated });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating card");
  }
});


app.patch("/updateCardPartial/:id", async (req, res) => {
  try {
    const updated = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).send("Card not found");
    res.status(200).json({ message: "Card partially updated", updated });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating card");
  }
});


app.delete("/deleteCard/:id", async (req, res) => {
  try {
    const deleted = await Card.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Card not found");
    res.status(200).json({ message: "Card deleted successfully", deleted });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting card");
  }
});



app.get("/review", (req, res) => {
  const endpoints = [
    "POST   /createCard",
    "GET    /getAllCards",
    "GET    /getCard/:id",
    "PUT    /updateCard/:id",
    "PATCH  /updateCardPartial/:id",
    "DELETE /deleteCard/:id",
    "GET    /review"
  ];
  res.status(200).send(`Available endpoints:\n\n${endpoints.join("\n")}`);
});

app.patch("/updateLike/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    card.like = !card.like;


    await card.save();

    res.json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");
});
