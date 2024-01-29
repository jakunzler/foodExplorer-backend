import { getPrisma } from "../../../../db_mysql/prisma";
import DishRepository from "../../repositories/DishRepository";
// import IngredientRepository from "../../repositories/IngredientRepository";
import CreateDishController from "./CreateDishController";
import CreateDishUseCase from "./CreateDishUseCase";

export default async function CreateDish() {
  const prisma = await getPrisma();

  const dishRepository = new DishRepository(prisma);
  // const ingredientRepository = new IngredientRepository(prisma);

  const createDishUseCase = new CreateDishUseCase(
    dishRepository,
    // ingredientRepository,
  );
  const createDishController = new CreateDishController(createDishUseCase);

  return { createDishUseCase, createDishController };
}
