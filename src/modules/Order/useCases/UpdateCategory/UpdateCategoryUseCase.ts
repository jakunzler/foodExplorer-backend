import { Category } from "@prisma/client";
import { ICategoryRepository } from "../../../../modules/Order/repositories/interfaces/ICategoryRepository";
import ValidationException from "../../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../../exceptions";

export default class UpdateCategoryUseCase {
  private categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(categoryId: string, updatedCategoryData: Partial<Category>) {
    const existingCategory = await this.categoryRepository.getById(categoryId);

    if (!existingCategory) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Categoria não encontrada.`,
        },
        404,
      );
    }

    const updatedCategory = await this.categoryRepository.update(
      categoryId,
      updatedCategoryData,
    );

    return updatedCategory;
  }
}
