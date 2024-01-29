import { getPrisma } from "../../../../db_mysql/prisma";
import UserFavoriteDishesRepository from "../../../../modules/User/repositories/UserFavoriteDishesRepository";
import DeleteUserFavoriteDishesController from "./DeleteUserFavoriteDishesController";
import DeleteUserFavoriteDishesUseCase from "./DeleteUserFavoriteDishesUseCase";

export default async function DeleteUserFavoriteDishes() {
  const prisma = await getPrisma();

  const userFavoriteDishesRepository = new UserFavoriteDishesRepository(prisma);

  const deleteUserFavoriteDishesUseCase = new DeleteUserFavoriteDishesUseCase(
    userFavoriteDishesRepository,
  );

  const deleteUserFavoriteDishesController =
    new DeleteUserFavoriteDishesController(deleteUserFavoriteDishesUseCase);

  return {
    deleteUserFavoriteDishesUseCase,
    deleteUserFavoriteDishesController,
  };
}
