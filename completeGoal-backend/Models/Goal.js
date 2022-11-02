const mongoose = require("mongoose");
const { Schema } = mongoose;

const log = {
  desc: {
    type: String,
    required: true,
  },
  increasedBy: {
    type: Schema.Types.Number,
    required: true,
    default: 0,
  },
  progressNow: {
    type: Schema.Types.Number,
    required: true,
    default: 0,
  },
  time: {
    type: Date,
    required: true,
    default: Date.now,
  },
};

const color_scheme = {
  name: {
    type: String,
    required: true,
  },
  bg: {
    type: String,
    required: true,
  },
  headerFooter: {
    type: String,
    required: true,
  },
  textColor: {
    type: String,
    required: true,
  },
  progressBarColor: {
    type: String,
    required: true,
  },
};

const GoalSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  initProgress: {
    type: Schema.Types.Number,
    required: true,
    default: 0,
  },
  nowprogress: {
    type: Schema.Types.Number,
    required: true,
    default: 0,
  },
  logs: {
    type: [log],
    required: true,
    default: [],
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  daily_progress: {
    type: Schema.Types.Number,
    required: true,
    default: 0,
  },
  color_scheme: {
    type: color_scheme,
    required: true,
    default: {},
  },
});

const Goal = mongoose.model("goal", GoalSchema);
module.exports = Goal;
