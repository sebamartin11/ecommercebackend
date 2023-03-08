const { cartsModel } = require("../../models/carts.model.js");

class CartMongoManager {
  async getCarts() {
    try {
      const allCarts = await cartsModel.find();
      return allCarts;
    } catch (error) {
      throw new Error(`Couldn't read file ${error}`);
    }
  }

  async addCart() {
    try {
      const newCart = await cartsModel.create({ products: [] });
      return newCart;
    } catch (error) {
      throw new Error(`Error saving: ${error}`);
    }
  }

  async getCartById(id) {
    try {
      const cartById = await cartsModel.findById(id);
      return cartById;
    } catch (error) {
      throw new Error(`Cart with id: ${id} was not found: ${error}`);
    }
  }

  async deleteCart(id) {
    try {
      const response = await cartsModel.findByIdAndDelete(id);
      return `Cart with id: ${response.id} was deleted successfully`;
    } catch (error) {
      throw new Error(`Error deleting: ${error}`);
    }
  }
}

module.exports = CartMongoManager;


//Need to refactor using Mongoose

// async addProductToCart(cid, pid, quantity) {
//   const allCarts = await this.getCarts();
//   const cartById = await this.getCartById(cid);

//   const targetProduct = await cartById.products.find(
//     (product) => product.product == pid
//   );

//   const updatedProduct = targetProduct
//     ? {
//         product: targetProduct.product,
//         quantity: targetProduct.quantity + +quantity,
//       }
//     : { product: pid, quantity: +quantity };

//   const targetCartFiltered = await cartById.products.filter(
//     (id) => id.product !== pid
//   );
//   const updatedCart = {
//     ...cartById,
//     products: [...targetCartFiltered, updatedProduct],
//   };
//   const updatedList = allCarts.map((cart) => {
//     if (cart.id === cid) {
//       return updatedCart;
//     } else {
//       return cart;
//     }
//   });

//   await this.saveCarts(updatedList);
//   return `product id ${pid} update from id cart ${cartById.id} `;
// }

// async deleteProductFromCart(cid, pid) {
//   const allCarts = await this.getCarts();
//   const cartById = await this.getCartById(cid);

//   const targetProduct = await cartById.products.find(
//     (product) => product.product == pid
//   );

//   if (!targetProduct) {
//     throw new Error("Product not found");
//   } else {
//     const filteredCart = await cartById.products.filter(
//       (id) => id.product !== pid
//     );
//     const updatedCart = { ...cartById, products: [...filteredCart] };

//     const updatedList = allCarts.map((cart) => {
//       if (cart.id === cid) {
//         return updatedCart;
//       } else {
//         return cart;
//       }
//     });

//     await this.saveCarts(updatedList);
//     return `product id ${pid} delete from id cart ${cartById.id} `;
//   }
// }