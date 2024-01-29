import { getPrisma } from "../../../../db_mysql/prisma";
import UserFavoriteDishesRepository from "../../../../modules/User/repositories/UserFavoriteDishesRepository";
import UpdateUserFavoriteDishesController from "./UpdateUserFavoriteDishesController";
import UpdateUserFavoriteDishesUseCase from "./UpdateUserFavoriteDishesUseCase";

export default async function UpdateUserFavoriteDishes() {
  const prisma = await getPrisma();

  const userFavoriteDishesRepository = new UserFavoriteDishesRepository(prisma);

  const updateUserFavoriteDishesUseCase = new UpdateUserFavoriteDishesUseCase(
    userFavoriteDishesRepository,
  );
  const updateUserFavoriteDishesController =
    new UpdateUserFavoriteDishesController(updateUserFavoriteDishesUseCase);

  return {
    updateUserFavoriteDishesUseCase,
    updateUserFavoriteDishesController,
  };
}
