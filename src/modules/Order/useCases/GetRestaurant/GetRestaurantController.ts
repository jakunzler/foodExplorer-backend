import { NextFunction, Request, Response } from "express";
import GetRestaurantUseCase from "./GetRestaurantUseCase";

export default class GetRestaurantController {
  constructor(private getRestaurantUseCase: GetRestaurantUseCase) {
    this.getRestaurantUseCase = getRestaurantUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { restaurantId } = request.params;
      const restaurant = await this.getRestaurantUseCase.execute(restaurantId);

      return response.status(200).json(restaurant);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
