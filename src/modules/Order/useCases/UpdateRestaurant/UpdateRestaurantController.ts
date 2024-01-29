import { NextFunction, Request, Response } from "express";
import UpdateRestaurantUseCase from "./UpdateRestaurantUseCase";

export default class UpdateRestaurantController {
  constructor(private updateRestaurantUseCase: UpdateRestaurantUseCase) {
    this.updateRestaurantUseCase = updateRestaurantUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { restaurantId } = request.params;
      const newData = request.body;

      const restaurant = await this.updateRestaurantUseCase.execute(
        restaurantId,
        newData,
      );

      return response.status(200).json(restaurant);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
