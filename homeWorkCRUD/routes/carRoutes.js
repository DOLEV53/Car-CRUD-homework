const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

router.get("/", carController.carRead_get);
router.post("/", carController.carCreate_post);
router.put("/:id", carController.carUpdate_put);
router.delete("/:id", carController.carDelete_delete);
router.post("/init", carController.carReset_get);
router.put("/:id/buy", carController.carBuy_put);

module.exports = router;
