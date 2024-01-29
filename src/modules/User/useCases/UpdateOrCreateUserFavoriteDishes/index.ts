import { getPrisma } from "../../../../db_mysql/prisma";
import UserFavoriteDishesRepository from "../../../../modules/User/repositories/UserFavoriteDishesRepository";
import UpdateOrCreateUserFavoriteDishesController from "./UpdateOrCreateUserFavoriteDishesController";
import UpdateOrCreateUserFavoriteDishesUseCase from "./UpdateOrCreateUserFavoriteDishesUseCase";

export default async function UpdateOrCreateUserFavoriteDishes() {
  const prisma = await getPrisma();

  const userFavoriteDishesRepository = new UserFavoriteDishesRepository(prisma);

  const updateOrCreateUserFavoriteDishesUseCase =
    new UpdateOrCreateUserFavoriteDishesUseCase(userFavoriteDishesRepository);
  const updateOrCreateUserFavoriteDishesController =
    new UpdateOrCreateUserFavoriteDishesController(
      updateOrCreateUserFavoriteDishesUseCase,
    );

  return {
    updateOrCreateUserFavoriteDishesUseCase,
    updateOrCreateUserFavoriteDishesController,
  };
}
