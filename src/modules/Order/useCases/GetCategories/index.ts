import { getPrisma } from "../../../../db_mysql/prisma";
import CategoryRepository from "../../../../modules/Order/repositories/CategoryRepository";
import GetCategoriesController from "./GetCategoriesController";
import GetCategoriesUseCase from "./GetCategoriesUseCase";

export default async function GetCategories() {
  const prisma = await getPrisma();

  const categoryRepository = new CategoryRepository(prisma);

  const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);
  const getCategoriesController = new GetCategoriesController(
    getCategoriesUseCase,
  );

  return { getCategoriesUseCase, getCategoriesController };
}
