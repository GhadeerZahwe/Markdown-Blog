const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Type = mongoose.model("Type", typeSchema);

async function insertPredefinedTypes() {
  try {
    const count = await Type.countDocuments();

    if (count === 0) {
      await Type.insertMany([
        {
          _id: "6582d04ce29625e896bde17e",
          name: "Radio",
        },
        {
          _id: "65834f46e29625e896bde187",
          name: "Checkbox",
        },
        {
          _id: "65834f63e29625e896bde188",
          name: "Input",
        },
      ]);
    }
  } catch (err) {
    console.error(err);
  }
}
insertPredefinedTypes();
module.exports = Type;
