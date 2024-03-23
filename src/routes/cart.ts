import { Router } from "express";
import { addToCart, getCartDetails } from "../services/cart";
import { isAuthorize } from "../middleware/authorization";
import { UserRole } from "../interface/grocery";

const router = Router();

router.post('/carts', isAuthorize(UserRole.USER), async (req, res) => {
  const cartData = req.body;
  const { cartId } = req.query;

  res.status(200).json(await addToCart(Number(cartId), cartData));
});

router.get('/carts', async (req, res) => {});

router.get('/carts/:cartId', isAuthorize(UserRole.USER), async (req, res) => {
  const { cartId } = req.params;

  res.status(200).json(await getCartDetails(Number(cartId)));
});

router.patch('/carts/:cartId', (req, res) => {});

export { router as cartRouter };