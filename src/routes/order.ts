import { Router } from "express";
import { createOrder, getAllOrders, getOrderById, getOrderByUser } from "../services/order";
import { isAuthorize } from "../middleware/authorization";
import { UserRole } from "../interface/grocery";

const router = Router();

router.post('/orders', isAuthorize(UserRole.USER), async (req, res) => {
  const user = req.body;

  res.status(200).json(await createOrder(user))
});

router.get('/orders', isAuthorize(UserRole.ADMIN), async (req, res) => {
  res.status(200).json(await getAllOrders());
});

router.get('/orders/:orderId', isAuthorize(UserRole.USER), async (req, res) => {
  const { orderId } = req.params;

  res.status(200).json(await getOrderById(Number(orderId)));
});

router.get('/orders/users/:userId', isAuthorize(UserRole.USER), async (req, res) => {
  const { userId } = req.params;

  res.status(200).json(await getOrderByUser(Number(userId)));
});

export { router as orderRouter };