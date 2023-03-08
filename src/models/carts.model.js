const mongoose = require("mongoose");
const { productsCollection } = require("./products.model");

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
  products: {
    type: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: productsCollection,
        },
        products: {
          type: Number,
        },
      },
    ],
    default: [],
  },
});

module.exports = { cartsModel: mongoose.model(cartsCollection, cartsSchema) };
