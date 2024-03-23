import { appDataSource } from "../config/data-source";
import { ICart, IGrocery } from "../interface/grocery";
import { Cart } from "../models/cart";
import { Grocery } from "../models/grocery";

export const addToCart = async (cartId: number, item : IGrocery): Promise<ICart> => {
  // cart already exist for a user
  // update the cart item list
  const cart = await appDataSource.getRepository(Cart).findOne({ where: { id: cartId }});
  console.log(cart);
  if(!cart) {
    throw new Error('User does not have cart.')
  }

  const cartItem = await appDataSource.getRepository(Grocery).findOne({ where: { id: item.id }})
  if(!cartItem || cartItem.outOfStock) {
    throw new Error('Item is not available.');
  }

  cart.items.push(item);

  const newCart = await appDataSource.getRepository(Cart).save(cart);

  return newCart;
}

export const getCartDetails = async (cartId: number) => {
  const cart = await appDataSource.getRepository(Cart).findOne(
    { 
      where: { id: cartId },
      // relations: {
      //   items: true,
      // }
    }
  )

  return cart;
}