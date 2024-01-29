import { IRestaurantRepository } from "../../repositories/interfaces/IRestaurantRepository";
import { CreateRestaurantDTO } from "./CreateRestaurantDTO";

export default class CreateRestaurantUseCase {
  private restaurantRepository: IRestaurantRepository;

  constructor(restaurantRepository: IRestaurantRepository) {
    this.restaurantRepository = restaurantRepository;
  }

  async execute({
    name,
    cnpj,
    userRestaurant,
    orders,
    dishes,
  }: CreateRestaurantDTO) {
    return this.restaurantRepository.create({
      name,
      cnpj,
      userRestaurant,
      orders,
      dishes,
    });
  }
}
