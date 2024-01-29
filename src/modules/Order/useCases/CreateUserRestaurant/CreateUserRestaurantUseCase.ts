import { IUserRestaurantRepository } from "../../repositories/interfaces/IUserRestaurantRepository";
import { CreateUserRestaurantDTO } from "./CreateUserRestaurantDTO";

export default class CreateUserRestaurantUseCase {
  private userRestaurantRepository: IUserRestaurantRepository;

  constructor(userRestaurantRepository: IUserRestaurantRepository) {
    this.userRestaurantRepository = userRestaurantRepository;
  }

  async execute({
    user,
    userId,
    restaurant,
    restaurantId,
  }: CreateUserRestaurantDTO) {
    return this.userRestaurantRepository.create({
      user,
      userId,
      restaurant,
      restaurantId,
    });
  }
}
