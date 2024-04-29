const express = require("express");
const { getAllResume, getSingleResume, createResume } = require("../controllers/resumeController");

const router = express.Router();

router.get("/", getAllResume);
router.post("/create", createResume);
router.post("/single", getSingleResume);

module.exports = router;
