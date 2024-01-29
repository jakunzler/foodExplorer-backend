import { HttpExceptionEnum } from "../../../../exceptions";
import ValidationException from "../../../../exceptions/ValidationException";
import { IDishRepository } from "../../../../modules/Order/repositories/interfaces/IDishRepository";
import { DiskStorage } from "../../../../providers/DiskStorage";

export default class UpdateDishImageUseCase {
  private dishRepository: IDishRepository;

  constructor(dishRepository: IDishRepository) {
    this.dishRepository = dishRepository;
  }

  async execute(dishId: string, dishImage: string) {
    const existingDish: any = await this.dishRepository.getById(dishId);
    const diskStorage = new DiskStorage();

    if (!existingDish) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Usuário não encontrado.`,
        },
        404,
      );
    }

    if (existingDish.image) {
      await diskStorage.deleteFile(existingDish.image);
    }

    const filename = await diskStorage.saveFile(dishImage);
    existingDish.image = filename;

    const updatedDish = await this.dishRepository.update(dishId, {
      image: existingDish.image,
    });

    return updatedDish;
  }
}
