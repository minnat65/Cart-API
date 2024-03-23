import { Router } from "express";
import { createUser, getAllUsers, getUserDetailsById } from '../services/user';

const router = Router();

router.post('/users', async (req, res) => {
  res.status(201).json(await createUser(req.body));
});

router.get('/users', async (req, res) => {
  const users = await getAllUsers()
  res.status(200).json(users);
});

router.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  res.status(200).json(await getUserDetailsById(Number(userId)));
});

export { router as userRouter };