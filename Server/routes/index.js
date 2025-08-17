const Router = require("express");
const router = new Router();

const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");
const carouselRouter = require('./carouselRouter');
const frontpadRouter = require('./frontpadRouter')

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/frontpad", frontpadRouter);
router.use("/carousel", carouselRouter);

module.exports = router;
