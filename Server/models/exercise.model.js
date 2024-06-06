const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
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
    testCases: [
      {
        input: String,
        output: String,
      },
    ],
    successRate: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: `Exercises`,
  }
);

exerciseSchema.pre("save", async function (next) {
  const Exercise = this.constructor;
  if (!this.id) {
    try {
      const lastExercise = await Exercise.findOne({}, {}, { sort: { id: -1 } });
      if (lastExercise) {
        this.id = lastExercise.id + 1;
      } else {
        this.id = 1; 
      }
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model("Exercise", exerciseSchema);
