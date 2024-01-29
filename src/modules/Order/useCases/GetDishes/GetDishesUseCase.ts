import { IDishRepository } from "../../../../modules/Order/repositories/interfaces/IDishRepository";

export default class GetDishesUseCase {
  private dishRepository: IDishRepository;

  constructor(dishRepository: IDishRepository) {
    this.dishRepository = dishRepository;
  }

  async execute() {
    return this.dishRepository.getAllDishes();
  }
}
