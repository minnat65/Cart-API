import { Grocery } from "../models/grocery";
import { appDataSource } from "../config/data-source";
import { IGrocery } from "../interface/grocery";

export const addGroceryToInventory = async (groceryDetails: IGrocery) => {
  if(!groceryDetails.name) {
    throw new Error("Grocery Item's Name is required.");
  }

  if(!groceryDetails.price) {
    throw new Error("Grocery Item's price is required.");
  }

  if(!groceryDetails.totalStock) {
    throw new Error("Grocery Item's totalStock is required.");
  }

  const grocery = await appDataSource.getRepository(Grocery).save(groceryDetails);

  return grocery;
}

export const getAllGroceriesItems = async () => {
  const groceries = await appDataSource.getRepository(Grocery).find();

  return groceries;
}

export const getGroceryItemByItemId = async (itemId: number) => {
  const grocery = await appDataSource.getRepository(Grocery).findOne({
    where: { id: itemId }
  });

  return grocery;
}

export const updateItemById = async (itemId: number, newData: IGrocery) => {
  const item = await appDataSource.getRepository(Grocery).findOne({ where: { id: itemId } });

  if(!item) {
    throw new Error('Item Not Found.');
  }

  await appDataSource.getRepository(Grocery).update(
    itemId,
    {
      ...(newData.name) && { name: newData.name },
      ...(newData.price) && { price: newData.price },
      ...(newData.totalStock) && { totalStock: newData.totalStock },
      ...(newData.outOfStock) && { outOfStock: newData.outOfStock },
    }
  );

  const updatedItem = await appDataSource.getRepository(Grocery).findOne({ where: { id: itemId }});

  return updatedItem;
};

export const deleteItemByItemId = async (itemId: number) => {
  console.log('Deleting an item..');
  const deletedItem = await appDataSource
    .createQueryBuilder()
    .delete()
    .from(Grocery)
    .where({ id: itemId })
    .execute();

  return deletedItem;
};