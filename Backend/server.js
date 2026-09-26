require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mern-support-crm-system.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());

const PORT = process.env.PORT || 3000;

const ticketsRoutes = require("./routes/TicketsRoutes");

app.use("/", ticketsRoutes);

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
