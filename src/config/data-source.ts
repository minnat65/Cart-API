import { DataSource } from "typeorm";
import { User } from "../models/user";
import { Grocery } from "../models/grocery";
import { Order } from "../models/order";
import { Cart } from "../models/cart";

export const appDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'grocery_booking',
  synchronize: true,
  // logging: true,
  entities: [User, Grocery, Order, Cart],
})