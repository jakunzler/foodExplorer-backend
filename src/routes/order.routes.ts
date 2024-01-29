import CreateOrder from "../modules/Order/useCases/CreateOrder";
import GetOrders from "../modules/Order/useCases/GetOrders";
import UpdateOrder from "../modules/Order/useCases/UpdateOrder";
import DeleteOrder from "../modules/Order/useCases/DeleteOrder";
import { Router } from "express";
import passport from "passport";

const orderRouter = Router({ mergeParams: true });

orderRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { createOrderController } = await CreateOrder();
      return createOrderController.handle(request, response, next);
    } catch (error) {
      return response.status(400).json({ message: "Erro ao criar pedido" });
    }
  },
);

orderRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { getOrdersController } = await GetOrders();
      return getOrdersController.handle(request, response, next);
    } catch (error) {
      return response.status(400).json({ message: "Erro ao buscar pedido" });
    }
  },
);

orderRouter.put(
  "/:orderId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { updateOrderController } = await UpdateOrder();
      return updateOrderController.handle(request, response, next);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao atualizar pedido." });
    }
  },
);

orderRouter.delete(
  "/:orderId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { deleteOrderController } = await DeleteOrder();
      return deleteOrderController.handle(request, response, next);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao deletar pedido." });
    }
  },
);

export default orderRouter;
