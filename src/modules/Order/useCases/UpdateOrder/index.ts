import { getPrisma } from "../../../../db_mysql/prisma";
import OrderRepository from "../../repositories/OrderRepository";
import UpdateOrderController from "./UpdateOrderController";
import UpdateOrderUseCase from "./UpdateOrderUseCase";

export default async function UpdateOrder() {
  const prisma = await getPrisma();

  const orderRepository = new OrderRepository(prisma);

  const updateOrderUseCase = new UpdateOrderUseCase(orderRepository);
  const updateOrderController = new UpdateOrderController(updateOrderUseCase);

  return { updateOrderUseCase, updateOrderController };
}
