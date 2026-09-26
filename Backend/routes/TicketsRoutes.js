const express = require("express");
const Ticket = require("../models/Ticket");
const counter = require("../models/counter");
const router = express.Router();

// const generateTicketId = () =>
//   `TKT-${Math.floor(100000 + Math.random() * 900000)}`;

router.post("/api/tickets", async (req, res) => {
  try {
    const { customer_name, customer_email, subject, description } = req.body;
    if (!customer_name || !customer_email || !subject || !description) {
      return res.status(400).json({ error: "All Fields are required" });
    }

    const generateTicketId = await counter.findOneAndUpdate(
      { id: "ticket_seq" },
      { $inc: { seq: 1 } },
      { returnDocument: "after", upsert: true },
    );

    const ticketId = `TKT-${generateTicketId.seq}`;
    const newTicket = new Ticket({
      ticket_id: ticketId,
      customer_name,
      customer_email,
      subject,
      description,
      status: "Open",
    });
    await newTicket.save();

    res.status(201).json({
      ticket_id: newTicket.ticket_id,
      created_at: newTicket.createdAt,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create ticket", details: err.message });
  }
});
router.get("/api/tickets", async (req, res) => {
  try {
    const { status, search } = req.query;
    let filter = {};

    if (status && status !== "All") {
      filter.status = status;
    }

    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { customer_name: regex },
        { customer_email: regex },
        { ticket_id: regex },
        { subject: regex },
      ];
    }

    const tickets = await Ticket.find(filter).select(
      "ticket_id customer_name subject status createdAt -_id",
    );

    res.status(200).json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/api/tickets/:ticket_id", async (req, res) => {
  try {
    const { ticket_id } = req.params;

    const ticket = await Ticket.findOne({ ticket_id });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ticket details" });
  }
});

router.put("/api/tickets/:ticket_id", async (req, res) => {
  try {
    const { ticket_id } = req.params;
    const { status, notes } = req.body;

    const ticket = await Ticket.findOne({ ticket_id });
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    if (status) {
      ticket.status = status;
    }

    if (notes) {
      ticket.notes.push({ note_text: notes });
    }
    await ticket.save();

    res.status(200).json({
      success: true,
      updated_at: ticket.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update ticket" });
  }
});

module.exports = router;
