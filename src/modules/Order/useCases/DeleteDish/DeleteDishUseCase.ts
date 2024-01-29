import { HttpExceptionEnum } from "../../../../exceptions";
import ValidationException from "../../../../exceptions/ValidationException";
import { IDishRepository } from "../../repositories/interfaces/IDishRepository";

export default class DeleteDishUseCase {
  private dishRepository: IDishRepository;

  constructor(dishRepository: IDishRepository) {
    this.dishRepository = dishRepository;
  }

  async execute(dishId: string) {
    const dishToDelete = await this.dishRepository.getById(dishId);

    if (!dishToDelete) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Empresa não encontrada.`,
        },
        404,
      );
    }

    await this.dishRepository.delete(dishId);

    return "Dishe excluído com sucesso";
  }
}
