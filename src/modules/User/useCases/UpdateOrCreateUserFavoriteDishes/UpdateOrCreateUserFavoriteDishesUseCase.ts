import { UserFavoriteDishes } from "@prisma/client";
import { IUserFavoriteDishesRepository } from "../../../../modules/User/repositories/interfaces/IUserFavoriteDishesRepository";
import ValidationException from "../../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../../exceptions";

export default class UpdateOrCreateUserFavoriteDishesUseCase {
  private userFavoriteDishesRepository: IUserFavoriteDishesRepository;

  constructor(userFavoriteDishesRepository: IUserFavoriteDishesRepository) {
    this.userFavoriteDishesRepository = userFavoriteDishesRepository;
  }

  async execute(userId: string, dishId: string) {
    const updatedUserFavoriteDishes =
      await this.userFavoriteDishesRepository.updateOrCreate(userId, dishId);

    return updatedUserFavoriteDishes;
  }
}
