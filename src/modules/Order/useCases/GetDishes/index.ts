import { getPrisma } from "../../../../db_mysql/prisma";
import DishRepository from "../../../../modules/Order/repositories/DishRepository";
import GetDishesController from "./GetDishesController";
import GetDishesUseCase from "./GetDishesUseCase";

export default async function GetDishes() {
  const prisma = await getPrisma();

  const dishRepository = new DishRepository(prisma);

  const getDishesUseCase = new GetDishesUseCase(dishRepository);
  const getDishesController = new GetDishesController(getDishesUseCase);

  return { getDishesUseCase, getDishesController };
}
