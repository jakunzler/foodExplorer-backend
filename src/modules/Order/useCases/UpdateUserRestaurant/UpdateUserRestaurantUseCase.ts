import { UserRestaurant } from "@prisma/client";
import { IUserRestaurantRepository } from "../../repositories/interfaces/IUserRestaurantRepository";
import ValidationException from "../../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../../exceptions";

export default class UpdateUserRestaurantUseCase {
  private userRestaurantRepository: IUserRestaurantRepository;

  constructor(userRestaurantRepository: IUserRestaurantRepository) {
    this.userRestaurantRepository = userRestaurantRepository;
  }

  async execute(
    userRestaurantId: string,
    updatedUserRestaurantData: Partial<UserRestaurant>,
  ) {
    const existingUserRestaurant =
      await this.userRestaurantRepository.getById(userRestaurantId);

    if (!existingUserRestaurant) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Empresa não encontrada.`,
        },
        404,
      );
    }

    const updatedUserRestaurant = await this.userRestaurantRepository.update(
      userRestaurantId,
      updatedUserRestaurantData,
    );

    return updatedUserRestaurant;
  }
}
