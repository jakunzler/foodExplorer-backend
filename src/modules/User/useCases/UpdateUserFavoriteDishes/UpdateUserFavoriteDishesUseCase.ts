import { UserFavoriteDishes } from "@prisma/client";
import { IUserFavoriteDishesRepository } from "../../../../modules/User/repositories/interfaces/IUserFavoriteDishesRepository";
import ValidationException from "../../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../../exceptions";

export default class UpdateUserFavoriteDishesUseCase {
  private userFavoriteDishesRepository: IUserFavoriteDishesRepository;

  constructor(userFavoriteDishesRepository: IUserFavoriteDishesRepository) {
    this.userFavoriteDishesRepository = userFavoriteDishesRepository;
  }

  async execute(
    favoriteId: string,
    updatedUserFavoriteDishesData: Partial<UserFavoriteDishes>,
  ) {
    const existingUserFavoriteDishes =
      await this.userFavoriteDishesRepository.getById(favoriteId);

    if (!existingUserFavoriteDishes) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Favorito não encontrado.`,
        },
        404,
      );
    }

    const updatedUserFavoriteDishes =
      await this.userFavoriteDishesRepository.update(
        favoriteId,
        updatedUserFavoriteDishesData,
      );

    return updatedUserFavoriteDishes;
  }
}
