const express = require("express");
const router = express.Router();
const verifToken = require("../middlewares/verifToken");
const verifRole = require("../middlewares/verifRole");
const { getAdminStats } = require("../controllers/adminController");

// ✅ Route Dashboard admin (protégée)
router.get("/stats", verifToken, verifRole("admin"), getAdminStats);

module.exports = router;
