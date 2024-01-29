import { NextFunction, Request, Response } from "express";
import GetDishesUseCase from "./GetDishesUseCase";

export default class GetDishesController {
  constructor(private getDishesUseCase: GetDishesUseCase) {
    this.getDishesUseCase = getDishesUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const dishes = await this.getDishesUseCase.execute();

      return response.status(200).json(dishes);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
