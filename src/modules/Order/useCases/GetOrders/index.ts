import { getPrisma } from "../../../../db_mysql/prisma";
import OrderRepository from "../../../../modules/Order/repositories/OrderRepository";
import GetOrdersController from "./GetOrdersController";
import GetOrdersUseCase from "./GetOrdersUseCase";

export default async function GetOrders() {
  const prisma = await getPrisma();

  const orderRepository = new OrderRepository(prisma);

  const getOrdersUseCase = new GetOrdersUseCase(orderRepository);
  const getOrdersController = new GetOrdersController(getOrdersUseCase);

  return { getOrdersUseCase, getOrdersController };
}
