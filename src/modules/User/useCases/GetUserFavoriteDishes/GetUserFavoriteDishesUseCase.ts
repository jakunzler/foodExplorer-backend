import { IUserFavoriteDishesRepository } from "../../../../modules/User/repositories/interfaces/IUserFavoriteDishesRepository";

export default class GetUserFavoriteDishesUseCase {
  private userFavoriteDishesRepository: IUserFavoriteDishesRepository;

  constructor(userFavoriteDishesRepository: IUserFavoriteDishesRepository) {
    this.userFavoriteDishesRepository = userFavoriteDishesRepository;
  }

  async execute(userId: string) {
    return this.userFavoriteDishesRepository.getByUserId(userId);
  }
}
