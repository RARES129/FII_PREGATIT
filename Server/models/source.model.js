const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    code: {
      type: String,
    },
    score: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    collection: "sources",
  }
);

module.exports = mongoose.model("sources", sourceSchema);
