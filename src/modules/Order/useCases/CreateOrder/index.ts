import { getPrisma } from "../../../../db_mysql/prisma";
import OrderRepository from "../../repositories/OrderRepository";
import CreateOrderController from "./CreateOrderController";
import CreateOrderUseCase from "./CreateOrderUseCase";

export default async function CreateOrder() {
  const prisma = await getPrisma();

  const orderRepository = new OrderRepository(prisma);

  const createOrderUseCase = new CreateOrderUseCase(orderRepository);
  const createOrderController = new CreateOrderController(createOrderUseCase);

  return { createOrderUseCase, createOrderController };
}
