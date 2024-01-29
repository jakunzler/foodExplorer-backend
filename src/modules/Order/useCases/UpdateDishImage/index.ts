import { getPrisma } from "../../../../db_mysql/prisma";
import DishRepository from "../../../../modules/Order/repositories/DishRepository";
import UpdateDishImageController from "./UpdateDishImageController";
import UpdateDishImageUseCase from "./UpdateDishImageUseCase";

export default async function UpdateDishImage() {
  const prisma = await getPrisma();

  const dishRepository = new DishRepository(prisma);

  const updateDishImageUseCase = new UpdateDishImageUseCase(dishRepository);
  const updateDishImageController = new UpdateDishImageController(
    updateDishImageUseCase,
  );

  return { updateDishImageUseCase, updateDishImageController };
}
