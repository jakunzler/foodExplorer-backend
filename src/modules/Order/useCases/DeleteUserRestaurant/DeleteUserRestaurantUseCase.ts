import { HttpExceptionEnum } from "../../../../exceptions";
import ValidationException from "../../../../exceptions/ValidationException";
import { IUserRestaurantRepository } from "../../repositories/interfaces/IUserRestaurantRepository";

export default class DeleteUserRestaurantUseCase {
  private userRestaurantRepository: IUserRestaurantRepository;

  constructor(userRestaurantRepository: IUserRestaurantRepository) {
    this.userRestaurantRepository = userRestaurantRepository;
  }

  async execute(userRestaurantId: string) {
    const userRestaurantToDelete =
      await this.userRestaurantRepository.getById(userRestaurantId);

    if (!userRestaurantToDelete) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Empresa não encontrada.`,
        },
        404,
      );
    }

    await this.userRestaurantRepository.delete(userRestaurantId);

    return "Empresa de usuário excluída com sucesso";
  }
}
