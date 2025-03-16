const mongoose = require('mongoose');

const cardProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true },
  due: { type: Date, index: true },
  stability: { type: Number },
  difficulty: { type: Number },
  elapsed_days: { type: Number },
  scheduled_days: { type: Number },
  reps: { type: Number },
  lapses: { type: Number },
  state: { type: Number },
  last_review: { type: Date },
});

const CardProgress = mongoose.model('CardProgress', cardProgressSchema );

module.exports = CardProgress;