import { IRestaurantRepository } from "../../../../modules/Order/repositories/interfaces/IRestaurantRepository";

export default class GetRestaurantsUseCase {
  private restaurantRepository: IRestaurantRepository;

  constructor(restaurantRepository: IRestaurantRepository) {
    this.restaurantRepository = restaurantRepository;
  }

  async execute() {
    return this.restaurantRepository.getAllRestaurants();
  }
}
