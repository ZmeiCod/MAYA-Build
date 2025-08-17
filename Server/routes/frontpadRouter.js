const Router = require("express");
const router = new Router();
const frontpadController = require("../controllers/frontpadController");

router.post("/", frontpadController.create);
module.exports = router;