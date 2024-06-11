const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const sourceSchema = new Schema(
  {
    exerciseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    files: [fileSchema],
    score: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  {
    collection: "sources",
  }
);

module.exports = mongoose.model("sources", sourceSchema);
