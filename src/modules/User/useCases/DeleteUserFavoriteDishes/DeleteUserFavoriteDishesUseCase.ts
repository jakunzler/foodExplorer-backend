import { IUserFavoriteDishesRepository } from "../../../../modules/User/repositories/interfaces/IUserFavoriteDishesRepository";
import ValidationException from "../../../../exceptions/ValidationException";
import { AuthExceptionEnum, HttpExceptionEnum } from "../../../../exceptions";

export default class DeleteUserFavoriteDishesUseCase {
  private userFavoriteDishesRepository: IUserFavoriteDishesRepository;

  constructor(userFavoriteDishesRepository: IUserFavoriteDishesRepository) {
    this.userFavoriteDishesRepository = userFavoriteDishesRepository;
  }

  async execute(favoriteId: string) {
    const favoriteToDelete =
      await this.userFavoriteDishesRepository.getById(favoriteId);

    if (!favoriteToDelete) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Não é válido.`,
        },
        404,
      );
    }

    await this.userFavoriteDishesRepository.delete(favoriteId);

    return "Favorito excluído com sucesso!";
  }
}
