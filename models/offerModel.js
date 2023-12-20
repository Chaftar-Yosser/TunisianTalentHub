const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const offerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    image: {
      data: Buffer, // Binary data
      contentType: String, // Type of the image (e.g., "image/jpeg")
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
