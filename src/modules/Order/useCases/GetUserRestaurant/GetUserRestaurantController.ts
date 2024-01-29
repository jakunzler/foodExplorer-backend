import { NextFunction, Request, Response } from "express";
import GetUserRestaurantUseCase from "./GetUserRestaurantUseCase";

export default class GetUserRestaurantController {
  constructor(private getUserRestaurantUseCase: GetUserRestaurantUseCase) {
    this.getUserRestaurantUseCase = getUserRestaurantUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { userRestaurantId } = request.params;
      const userRestaurant =
        await this.getUserRestaurantUseCase.execute(userRestaurantId);

      return response.status(200).json(userRestaurant);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
