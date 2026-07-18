import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  acceptDelivery,
  getCurrentAssiOrder,
  getDelAssignment,
  getMyOrders,
  getOrderbyId,
  placeOrder,
  updateOrderStatus,
} from "../Controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", isAuth, placeOrder);
orderRouter.get("/my-orders", isAuth, getMyOrders);
orderRouter.post("/update-status/:orderId/:shopId", isAuth, updateOrderStatus);
orderRouter.get("/get-assignment", isAuth, getDelAssignment);
orderRouter.post("/accept-order/:assignmentId", isAuth, acceptDelivery);
orderRouter.get("/get-current-order", isAuth, getCurrentAssiOrder);
orderRouter.get("/get-order-by-id/:orderId", isAuth, getOrderbyId);

export default orderRouter;
