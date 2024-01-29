import { NextFunction, Request, Response } from "express";
import UpdateDishImageUseCase from "./UpdateDishImageUseCase";

export default class UpdateDishImageController {
  constructor(private updateDishImageUseCase: UpdateDishImageUseCase) {
    this.updateDishImageUseCase = updateDishImageUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      if (!request.file) {
        return response.status(400).json({ error: "Arquivo não disponível" });
      }

      const { dishId } = request.params;
      const avatarFilename: string = request.file.filename;

      const dish = await this.updateDishImageUseCase.execute(
        dishId,
        avatarFilename,
      );

      return response.status(200).json(dish);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
