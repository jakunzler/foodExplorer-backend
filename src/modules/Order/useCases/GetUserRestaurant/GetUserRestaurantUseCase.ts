import { IUserRestaurantRepository } from "../../repositories/interfaces/IUserRestaurantRepository";

export default class GetUserRestaurantUseCase {
  private userRestaurantRepository: IUserRestaurantRepository;

  constructor(userRestaurantRepository: IUserRestaurantRepository) {
    this.userRestaurantRepository = userRestaurantRepository;
  }

  async execute(userRestaurantId: string) {
    return this.userRestaurantRepository.getById(userRestaurantId);
  }
}
