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
    testCases: [
      {
        input: String,
        output: String,
      },
    ],
  },
  {
    collection: `Exercises`,
  }
);

// Pre-save hook to set the default value of id
exerciseSchema.pre("save", async function (next) {
  const Exercise = this.constructor;
  if (!this.id) {
    try {
      const lastExercise = await Exercise.findOne({}, {}, { sort: { id: -1 } });
      if (lastExercise) {
        this.id = lastExercise.id + 1;
      } else {
        this.id = 1; // If there are no other exercises in the collection
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
