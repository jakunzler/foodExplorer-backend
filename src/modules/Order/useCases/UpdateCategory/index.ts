import { getPrisma } from "../../../../db_mysql/prisma";
import CategoryRepository from "../../../../modules/Order/repositories/CategoryRepository";
import UpdateCategoryController from "./UpdateCategoryController";
import UpdateCategoryUseCase from "./UpdateCategoryUseCase";

export default async function UpdateCategory() {
  const prisma = await getPrisma();

  const categoryRepository = new CategoryRepository(prisma);

  const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
  const updateCategoryController = new UpdateCategoryController(
    updateCategoryUseCase,
  );

  return { updateCategoryUseCase, updateCategoryController };
}
