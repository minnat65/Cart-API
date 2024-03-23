import { Router, Request, Response } from 'express';
import { addGroceryToInventory, deleteItemByItemId, getAllGroceriesItems, getGroceryItemByItemId, updateItemById } from '../services/grocery';
import { isAuthorize } from '../middleware/authorization';
import { UserRole } from '../interface/grocery';

const router = Router();

router.post('/groceries', isAuthorize(UserRole.ADMIN), async (req: Request, res: Response) => {
  const groceryDetails = req.body;

  res.status(201).json(await addGroceryToInventory(groceryDetails));
});

router.get('/groceries', async (req: Request, res: Response) => {
  res.status(200).json(await getAllGroceriesItems());
});

router.get('/groceries/:groceryId', isAuthorize(UserRole.ADMIN), async (req: Request, res: Response) => {
  const { groceryId } = req.params;

  res.status(200).json(await getGroceryItemByItemId(Number(groceryId)));
});

router.patch('/groceries/:groceryId', isAuthorize(UserRole.ADMIN), async (req: Request, res: Response) => {
  const { groceryId } = req.params;
  const newData = req.body;

  res.status(200).json(await updateItemById(Number(groceryId), newData));
});

router.delete('/groceries/:groceryId', isAuthorize(UserRole.ADMIN), async (req: Request, res: Response) => {
  const { groceryId } = req.params;

  res.status(204).json(await deleteItemByItemId(Number(groceryId)));
});

export { router as groceryRouter };