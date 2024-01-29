import { IRestaurantRepository } from "../../repositories/interfaces/IRestaurantRepository";

export default class GetRestaurantUseCase {
  private restaurantRepository: IRestaurantRepository;

  constructor(restaurantRepository: IRestaurantRepository) {
    this.restaurantRepository = restaurantRepository;
  }

  async execute(restaurantId: string) {
    return this.restaurantRepository.getById(restaurantId);
  }
}
