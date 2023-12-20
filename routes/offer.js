const express = require("express")
const router = express.Router()

const {
  createOffer,
  getOffers,
  getOffer,
  deleteOffer,
  updateOffer,
} = require("../controllers/offerController");

// GET all workouts
router.get('/', getOffers)

// // GET a single workout
router.get("/:id", getOffer);

// POST a new workout
// router.post('/', createOffer)
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
router.post("/", upload.single("image"), createOffer);



// DELETE a workout
router.delete("/:id", deleteOffer);

// // UPDATE a workout

router.patch("/:id", upload.single("image"), updateOffer);


module.exports = router