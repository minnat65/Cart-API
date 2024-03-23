// import { dataSource } from "..";
import { User } from "../models/user";
import { appDataSource } from "../config/data-source";
import { Cart } from "../models/cart";
import { UserRole } from "../interface/grocery";
import { ICart } from "../interface/grocery";

// enum UserRole {
//   ADMIN = 'admin',
//   USER = 'user',
// }

export const createUser = async (userData: { name: string, userRole: UserRole }) => {
  if(!userData.name) {
    throw new Error('name is required.');
  }
  const user = new User();
  user.name = userData.name;
  user.userRole = userData.userRole;

  if(userData.userRole === 'user') {
    const cart = await appDataSource.getRepository(Cart).save({
      items: []
    });
    user.cart = cart;
  }

  const users = await appDataSource.getRepository(User).save(user);

  return users;
}

export const getAllUsers = async () => {
  const users = await appDataSource.getRepository(User).find();

  return users;
};

export const getUserDetailsById = async (userId: number) => {
  const user = await appDataSource.getRepository(User).findOne(
    {
      where: { id: userId },
      relations: {
        cart: true,
      }
    }
  );

  return user;
};