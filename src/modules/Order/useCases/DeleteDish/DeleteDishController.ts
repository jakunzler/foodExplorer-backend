import { NextFunction, Request, Response } from "express";
import DeleteDishUseCase from "./DeleteDishUseCase";

export default class DeleteDishController {
  constructor(private deleteDishUseCase: DeleteDishUseCase) {
    this.deleteDishUseCase = deleteDishUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const { dishId } = request.params;

    try {
      const result = await this.deleteDishUseCase.execute(dishId);
      return response.status(200).json({ message: result });
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
