import { HttpExceptionEnum } from "../../../../exceptions";
import ValidationException from "../../../../exceptions/ValidationException";
import { IRestaurantRepository } from "../../repositories/interfaces/IRestaurantRepository";

export default class DeleteRestaurantUseCase {
  private restaurantRepository: IRestaurantRepository;

  constructor(restaurantRepository: IRestaurantRepository) {
    this.restaurantRepository = restaurantRepository;
  }

  async execute(restaurantId: string) {
    const restaurantToDelete =
      await this.restaurantRepository.getById(restaurantId);

    if (!restaurantToDelete) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Empresa não encontrada.`,
        },
        404,
      );
    }

    await this.restaurantRepository.delete(restaurantId);

    return "Restaurante excluído com sucesso";
  }
}
