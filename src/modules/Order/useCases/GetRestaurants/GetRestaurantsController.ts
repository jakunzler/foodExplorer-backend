import { NextFunction, Request, Response } from "express";
import GetRestaurantsUseCase from "./GetRestaurantsUseCase";

export default class GetRestaurantsController {
  constructor(private getRestaurantsUseCase: GetRestaurantsUseCase) {
    this.getRestaurantsUseCase = getRestaurantsUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const restaurants = await this.getRestaurantsUseCase.execute();

      return response.status(200).json(restaurants);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
