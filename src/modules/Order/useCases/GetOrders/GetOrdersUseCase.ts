import { IOrderRepository } from "../../../../modules/Order/repositories/interfaces/IOrderRepository";

export default class GetOrdersUseCase {
  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute() {
    return this.orderRepository.getAllOrders();
  }
}
