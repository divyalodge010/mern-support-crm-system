const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  note_text: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const TicketSchema = new mongoose.Schema({
  ticket_id: {
    type: String,
    required: true,
    unique: true,
  },
  customer_name: {
    type: String,
    required: true,
  },
  customer_email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed"],
    default: "Open",
  },
  notes: [NoteSchema],
},
{timestamps: true}
);

module.exports = mongoose.model('Ticket',TicketSchema);