import { getPrisma } from "../../../../db_mysql/prisma";
import DishRepository from "../../repositories/DishRepository";
// import IngredientRepository from "../../repositories/IngredientRepository";
// import DishIngredientRepository from "../../repositories/DishIngredientRepository";
import UpdateDishController from "./UpdateDishController";
import UpdateDishUseCase from "./UpdateDishUseCase";

export default async function UpdateDish() {
  const prisma = await getPrisma();

  const dishRepository = new DishRepository(prisma);
  // const ingredientRepository = new IngredientRepository(prisma);
  // const dishIngredientRepository = new DishIngredientRepository(prisma);

  const updateDishUseCase = new UpdateDishUseCase(
    dishRepository,
    // ingredientRepository,
    // dishIngredientRepository,
  );
  const updateDishController = new UpdateDishController(updateDishUseCase);

  return { updateDishUseCase, updateDishController };
}
