const express = require("express");
const { getAllResume, getSingleResume } = require("../controllers/resumeController");

const router = express.Router();

router.get("/", getAllResume);
router.post("/single", getSingleResume);

module.exports = router;
