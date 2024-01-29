import { IUserFavoriteDishesRepository } from "../../repositories/interfaces/IUserFavoriteDishesRepository";
import { CreateUserFavoriteDishesDTO } from "./CreateUserFavoriteDishesDTO";

export default class CreateUserFavoriteDishesUseCase {
  private userFavoriteDishesRepository: IUserFavoriteDishesRepository;

  constructor(userFavoriteDishesRepository: IUserFavoriteDishesRepository) {
    this.userFavoriteDishesRepository = userFavoriteDishesRepository;
  }

  async execute({ userId, dishId }: CreateUserFavoriteDishesDTO) {
    return this.userFavoriteDishesRepository.create({
      userId,
      dishId,
    });
  }
}
