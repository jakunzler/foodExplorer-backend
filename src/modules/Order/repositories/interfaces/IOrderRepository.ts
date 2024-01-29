import { Order } from "@prisma/client";
import { CreateOrderDTO } from "../../useCases/CreateOrder/CreateOrderDTO";

export interface IOrderRepository {
  create(order: CreateOrderDTO): Promise<Order>;
  getById(orderId: string): Promise<Order | null>;
  getByUserId(userId: string): Promise<Order[] | null>;
  getByRestaurantId(restaurantId: string): Promise<Order[] | null>;
  getAllOrders(): Promise<Order[] | null>;
  update(orderId: string, updatedOrderData: Partial<Order>): Promise<Order>;
  delete(orderId: string): Promise<Order>;
}
