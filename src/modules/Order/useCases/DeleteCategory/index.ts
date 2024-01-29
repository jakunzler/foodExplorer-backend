import { getPrisma } from "../../../../db_mysql/prisma";
import CategoryRepository from "../../../../modules/Order/repositories/CategoryRepository";
import DeleteCategoryController from "./DeleteCategoryController";
import DeleteCategoryUseCase from "./DeleteCategoryUseCase";

export default async function DeleteCategory() {
  const prisma = await getPrisma();

  const categoryRepository = new CategoryRepository(prisma);

  const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);
  const deleteCategoryController = new DeleteCategoryController(
    deleteCategoryUseCase,
  );

  return { deleteCategoryUseCase, deleteCategoryController };
}
