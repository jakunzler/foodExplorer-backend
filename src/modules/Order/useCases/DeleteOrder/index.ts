import { getPrisma } from "../../../../db_mysql/prisma";
import OrderRepository from "../../repositories/OrderRepository";
import DeleteOrderController from "./DeleteOrderController";
import DeleteOrderUseCase from "./DeleteOrderUseCase";

export default async function DeleteOrder() {
  const prisma = await getPrisma();

  const orderRepository = new OrderRepository(prisma);

  const deleteOrderUseCase = new DeleteOrderUseCase(orderRepository);
  const deleteOrderController = new DeleteOrderController(deleteOrderUseCase);

  return { deleteOrderUseCase, deleteOrderController };
}
