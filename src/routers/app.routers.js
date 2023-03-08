const { Router } = require("express");
const productsRoutes = require("./products/products.routes");
const cartsRoutes = require("./cart/carts.routes");
const filesRoutes = require("./files.routes");

const router = Router();

router.use("/products", productsRoutes);
router.use("/carts", cartsRoutes);
router.use("/file", filesRoutes);

module.exports = router;
