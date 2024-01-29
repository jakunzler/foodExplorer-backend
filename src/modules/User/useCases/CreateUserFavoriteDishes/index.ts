import { getPrisma } from "../../../../db_mysql/prisma";
import UserFavoriteDishesRepository from "../../repositories/UserFavoriteDishesRepository";
import CreateUserFavoriteDishesController from "./CreateUserFavoriteDishesController";
import CreateUserFavoriteDishesUseCase from "./CreateUserFavoriteDishesUseCase";

export default async function CreateUserFavoriteDishes() {
  const prisma = await getPrisma();

  const userFavoriteDishesRepository = new UserFavoriteDishesRepository(prisma);

  const createUserFavoriteDishesUseCase = new CreateUserFavoriteDishesUseCase(
    userFavoriteDishesRepository,
  );
  const createUserFavoriteDishesController =
    new CreateUserFavoriteDishesController(createUserFavoriteDishesUseCase);

  return {
    createUserFavoriteDishesUseCase,
    createUserFavoriteDishesController,
  };
}
