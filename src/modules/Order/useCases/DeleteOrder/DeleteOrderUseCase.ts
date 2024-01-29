import { HttpExceptionEnum } from "../../../../exceptions";
import ValidationException from "../../../../exceptions/ValidationException";
import { IOrderRepository } from "../../repositories/interfaces/IOrderRepository";

export default class DeleteOrderUseCase {
  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(orderId: string) {
    const orderToDelete = await this.orderRepository.getById(orderId);

    if (!orderToDelete) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Ordem não encontrada.`,
        },
        404,
      );
    }

    await this.orderRepository.delete(orderId);

    return "Ordem excluída com sucesso";
  }
}
