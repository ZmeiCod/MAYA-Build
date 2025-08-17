const Router = require("express");
const router = new Router();
const carouselController = require("../controllers/carouselController");

router.post("/", carouselController.create);
router.get("/", carouselController.getAll);
router.put("/:id", carouselController.updateSlide);
router.delete("/:id", carouselController.delete);

module.exports = router;
