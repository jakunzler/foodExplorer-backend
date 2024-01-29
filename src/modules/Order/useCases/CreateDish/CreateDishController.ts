import { NextFunction, Request, Response } from "express";
import { CreateDishDTO } from "./CreateDishDTO";
import CreateDishUseCase from "./CreateDishUseCase";

export default class CreateDishController {
  constructor(private createDishUseCase: CreateDishUseCase) {
    this.createDishUseCase = createDishUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        name,
        status,
        category,
        ingredients,
        summary_description,
        full_description,
        price,
        image,
        restaurantId,
      } = request.body as CreateDishDTO;

      const dish = await this.createDishUseCase.execute({
        name,
        status,
        category,
        ingredients,
        summary_description,
        full_description,
        price,
        image,
        restaurantId,
      });

      return response.status(201).json(dish);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
