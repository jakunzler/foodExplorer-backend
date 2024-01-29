import { getPrisma } from "../../../../db_mysql/prisma";
import UserFavoriteDishesRepository from "../../../../modules/User/repositories/UserFavoriteDishesRepository";
import GetUserFavoriteDishesController from "./GetUserFavoriteDishesController";
import GetUserFavoriteDishesUseCase from "./GetUserFavoriteDishesUseCase";

export default async function GetUserFavoriteDishes() {
  const prisma = await getPrisma();

  const userFavoriteDishesRepository = new UserFavoriteDishesRepository(prisma);

  const getUserFavoriteDishesUseCase = new GetUserFavoriteDishesUseCase(
    userFavoriteDishesRepository,
  );
  const getUserFavoriteDishesController = new GetUserFavoriteDishesController(
    getUserFavoriteDishesUseCase,
  );

  return { getUserFavoriteDishesUseCase, getUserFavoriteDishesController };
}
