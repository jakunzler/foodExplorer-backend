import { Order } from "@prisma/client";
import { IOrderRepository } from "../../repositories/interfaces/IOrderRepository";
import ValidationException from "../../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../../exceptions";

export default class UpdateOrderUseCase {
  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(orderId: string, updatedOrderData: Partial<Order>) {
    const existingOrder = await this.orderRepository.getById(orderId);

    if (!existingOrder) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Empresa não encontrada.`,
        },
        404,
      );
    }

    const updatedOrder = await this.orderRepository.update(
      orderId,
      updatedOrderData,
    );

    return updatedOrder;
  }
}
