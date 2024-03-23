import { Order } from "../models/order";
import { Cart } from "../models/cart";
import { appDataSource } from "../config/data-source";
import { IUser } from "../interface/grocery";
import { User } from "../models/user";

export const createOrder = async (user: IUser) => {
  const cart = await appDataSource.getRepository(Cart).findOne({
    where: { id: user.cart.id },
    relations: {
      items: true
    }
  });

  // if no items then throw error
  if(!cart?.items.length) {
    throw new Error('Cart is empty, add some grocery items to the cart.')
  }

  // create the order
  const order = new Order();
  let totalPrice = 0;
  cart.items.forEach((item) => {
    totalPrice += item.price;
  });
  // TODO: check if selected item is out-of-stock or not
  order.totalPrice = totalPrice;
  order.OrderDate = new Date().toISOString();
  order.user = user,
  order.items = cart.items
  const orderCreated = await appDataSource.getRepository(Order).save(order)

  // clear the cart after successful order
  await appDataSource.getRepository(Cart).save({
    id: user.cart.id,
    items: [],
  });

  return orderCreated;
}

export const getAllOrders = async () => {
  const orders = await appDataSource.getRepository(Order).find();

  return orders;
}

export const getOrderById = async (orderId: number) => {
  const order = await appDataSource.getRepository(Order).findOne({ where: { id: orderId }});

  return order;
}

export const getOrderByUser = async (userId: number) => {
  const order = await appDataSource.getRepository(User).findOne({
    where: { id: userId },
    relations: {
      orders: true,
    }
  })

  return order;
}