import { Restaurant } from "@prisma/client";
import { IRestaurantRepository } from "../../repositories/interfaces/IRestaurantRepository";
import ValidationException from "../../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../../exceptions";

export default class UpdateRestaurantUseCase {
  private restaurantRepository: IRestaurantRepository;

  constructor(restaurantRepository: IRestaurantRepository) {
    this.restaurantRepository = restaurantRepository;
  }

  async execute(
    restaurantId: string,
    updatedRestaurantData: Partial<Restaurant>,
  ) {
    const existingRestaurant =
      await this.restaurantRepository.getById(restaurantId);

    if (!existingRestaurant) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Empresa não encontrada.`,
        },
        404,
      );
    }

    const updatedRestaurant = await this.restaurantRepository.update(
      restaurantId,
      updatedRestaurantData,
    );

    return updatedRestaurant;
  }
}
