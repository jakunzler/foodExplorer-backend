import { UserFavoriteDishes } from "@prisma/client";
import { CreateUserFavoriteDishesDTO } from "../../useCases/CreateUserFavoriteDishes/CreateUserFavoriteDishesDTO";

export interface IUserFavoriteDishesRepository {
  create(
    userFavoriteDishes: CreateUserFavoriteDishesDTO,
  ): Promise<UserFavoriteDishes>;
  getById(favoriteId: string): Promise<UserFavoriteDishes | null>;
  getByUserId(userId: string): Promise<UserFavoriteDishes[] | null>;
  update(
    favoriteId: string,
    updatedUserFavoriteDishesData: Partial<UserFavoriteDishes>,
  ): Promise<UserFavoriteDishes>;
  updateOrCreate(userId: string, dishId: string): Promise<UserFavoriteDishes>;
  delete(favoriteId: string): Promise<UserFavoriteDishes>;
}
