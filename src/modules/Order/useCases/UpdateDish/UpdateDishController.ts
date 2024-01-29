import { NextFunction, Request, Response } from "express";
import UpdateDishUseCase from "./UpdateDishUseCase";

export default class UpdateDishController {
  constructor(private updateDishUseCase: UpdateDishUseCase) {
    this.updateDishUseCase = updateDishUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { dishId } = request.params;
      const newData = request.body;

      const dish = await this.updateDishUseCase.execute(dishId, newData);

      return response.status(200).json(dish);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
