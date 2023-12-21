const Offer = require("../models/offerModel");
const mongoose = require("mongoose");
const multer = require("multer");

// get all offers hedhy normalement yjibli nrm

// const getOffers = async (req, res) => {
//   try {
//     const Offers = await Offer.find({}).sort({ createdAt: -1 });
//     console.log("Retrieved Offers:", Offers);
//     res.status(200).json(Offers);
//   } catch (error) {
//     console.error("Error retrieving offers:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find({}).sort({ createdAt: -1 });

    // Convert binary image data to base64
    const offersWithBase64Image = offers.map((offer) => {
      const image =
        offer.image && offer.image.data
          ? {
              data: offer.image.data.toString("base64"),
              contentType: offer.image.contentType,
            }
          : null;

      return {
<<<<<<< HEAD
=======
        _id: offer._id,
>>>>>>> origin/Yosser
        title: offer.title,
        description: offer.description,
        status: offer.status,
        duration: offer.duration,
        budget: offer.budget,
        image,
        createdAt: offer.createdAt,
        updatedAt: offer.updatedAt,
      };
    });

    res.status(200).json(offersWithBase64Image);
  } catch (error) {
    console.error("Error retrieving offers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// get single offer
const getOffer = async (req, res) => {
  const { id } = req.params;
  // lazmou ykoun valid type of id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such offer" });
  }
  const newOffer = await Offer.findById(id);

  if (!newOffer) {
    return res.status(404).json({ error: "No such offer" });
  }

  res.status(200).json(newOffer);
};


const createOffer = async (req, res) => {
  try {
    console.log("req.file:", req.file);
    const { title, description, status, duration, budget } = req.body;

    // Check if an image is provided
    // if (!req.file) {
    //   return res.status(400).json({ error: "Image is required." });
    // }
    console.log("req.file:", req.file);

    // Get image data from multer
    const image = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    // Create new offer with image
    const newOffer = await Offer.create({
      title,
      description,
      status,
      duration,
      budget,
      image,
    });

    res.status(200).json({
      success: true,
      message: "Offer created successfully!",
      offer: newOffer,
    });
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(400).json({ error: error.message });
  }
};

// delete offer

const deleteOffer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such offer to delete" });
  }

  const newOffer = await Offer.findOneAndDelete({ _id: id });

  if (!newOffer) {
    return res.status(400).json({ error: "No such offer to delete" });
  }

  res.status(200).json({
    success: true,
    message: "Offer deleted successfully!",
    offer: newOffer,
  });
};

//update offer

// const updateOffer = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "No such offer to update" });
//   }

//   const newOffer = await Offer.findOneAndUpdate(
//     { _id: id },
//     {
//       ...req.body,
//     }
//   );

//   if (!newOffer) {
//     return res.status(400).json({ error: "No such offer to update" });
//   }

//   res.status(200).json({
//     success: true,
//     message: "Offer updated successfully!",
//     offer: newOffer,
//   });
// };



const updateOffer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such offer to update" });
  }

  try {
    const existingOffer = await Offer.findById(id);

    if (!existingOffer) {
      return res.status(400).json({ error: "No such offer to update" });
    }

    // Check if an image is provided in the update
    const updatedImage = req.file
      ? {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        }
      : existingOffer.image;

    // Update offer details
    const updatedOffer = await Offer.findByIdAndUpdate(
      id,
      {
        ...req.body,
        image: updatedImage,
      },
      { new: true } // Returns the updated document
    );

    res.status(200).json({
      success: true,
      message: "Offer updated successfully!",
      offer: updatedOffer,
    });
  } catch (error) {
    console.error("Error updating offer:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOffer,
  getOffers,
  getOffer,
  deleteOffer,
  updateOffer,
<<<<<<< HEAD
};
=======
};
>>>>>>> origin/Yosser
