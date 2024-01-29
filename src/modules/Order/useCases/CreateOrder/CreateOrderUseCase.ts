import { IOrderRepository } from "../../repositories/interfaces/IOrderRepository";
import { CreateOrderDTO } from "./CreateOrderDTO";

export default class CreateOrderUseCase {
  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute({
    description,
    status,
    totalAmount,
    userId,
    restaurantId,
  }: CreateOrderDTO) {
    return this.orderRepository.create({
      description,
      status,
      totalAmount,
      userId,
      restaurantId,
    });
  }
}
