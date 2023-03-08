
//Pending refactor cart function from cartMongoManager


const { Router } = require("express");

// const {options} = require("../../config/options");

const router = Router();


//MONGODB


const CartMongoManager = require("../../dao/mongoManager/cartManager.mongoose");

const ecommerce = new CartMongoManager();


// Routes

//CREATE cart
router.post("", async (req, res) => {
  let newCart = await ecommerce.addCart();
  res.send({ status: "success", message: newCart });
});

//GET all carts
router.get("", async (req, res) => {
  let carts = await ecommerce.getCarts();
  const cartLimit = req.query.limit;

  let integerCartLimit;

  if (cartLimit) {
    integerCartLimit = parseInt(cartLimit);
    if (isNaN(integerCartLimit)) {
      return res.status(400).send({
        status: "error",
        error: "cartLimit must be a valid number",
      });
    }
    if (integerCartLimit <= 0 || integerCartLimit > carts.length) {
      return res
        .status(404)
        .send({ status: "error", error: "Carts not found" });
    }
  }

  if (integerCartLimit) carts = carts.slice(0, integerCartLimit);

  res.send({ status: "success", payload: carts });
});

//GET cart by id

router.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;

  if (isNaN(cartId)) {
    return res
      .status(400)
      .send({ status: "error", error: "cartId must be a valid number" });
  }

  const integerCartId = parseInt(cartId);

  if (integerCartId <= 0) {
    res.status(404).send({ status: "error", error: "Cart not found" });
  }

  const cartById = await ecommerce.getCartById(integerCartId);

  if (!cartById) {
    return res.status(404).send({ status: "error", error: "Cart not found" });
  }

  res.send({ status: "success", payload: cartById });
});


//DELETE cart by id
router.delete("/:pid", async (req, res) => {
  const pid = +req.params.pid;
  const cartDelete = await ecommerce.deleteCart(pid);
  res.send({ status: "success", message: cartDelete });
});

module.exports = router;

