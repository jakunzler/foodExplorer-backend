import { NextFunction, Request, Response } from "express";
import UpdateUserRestaurantUseCase from "./UpdateUserRestaurantUseCase";

export default class UpdateUserRestaurantController {
  constructor(
    private updateUserRestaurantUseCase: UpdateUserRestaurantUseCase,
  ) {
    this.updateUserRestaurantUseCase = updateUserRestaurantUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { userRestaurantId } = request.params;
      const newData = request.body;

      const userRestaurant = await this.updateUserRestaurantUseCase.execute(
        userRestaurantId,
        newData,
      );

      return response.status(200).json(userRestaurant);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
