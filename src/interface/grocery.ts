import { Cart } from "../models/cart";
import { Grocery } from "../models/grocery";
import { Order } from "../models/order";

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IGrocery {
  id: number
  name: string;
  price: number;
  totalStock: number;
  outOfStock: boolean;
}

export interface ICart {
  id: number;
  items: Grocery[]
}

export interface IUser {
  id: number;
  name: string;
  userRole: UserRole;
  orders: Order[]
  cart: Cart
}