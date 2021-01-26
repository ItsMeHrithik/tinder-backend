import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import Cards from './dbCards.js';

//App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  "mongodb+srv://admin:admin@cluster0.v5dxm.mongodb.net/tinderdb?retryWrites=true&w=majority";

//middleWares

app.use(express.json())
app.use(cors())

//DB config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/tinder/card", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/card", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
//Listerns
app.listen(port, () => console.log(`listening on localhost: ${port}`));
