import { getPrisma } from "../../../../db_mysql/prisma";
import DishRepository from "../../repositories/DishRepository";
import DeleteDishController from "./DeleteDishController";
import DeleteDishUseCase from "./DeleteDishUseCase";

export default async function DeleteDish() {
  const prisma = await getPrisma();

  const dishRepository = new DishRepository(prisma);

  const deleteDishUseCase = new DeleteDishUseCase(dishRepository);
  const deleteDishController = new DeleteDishController(deleteDishUseCase);

  return { deleteDishUseCase, deleteDishController };
}
