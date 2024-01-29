import { NextFunction, Request, Response } from "express";
import DeleteRestaurantUseCase from "./DeleteRestaurantUseCase";

export default class DeleteRestaurantController {
  constructor(private deleteRestaurantUseCase: DeleteRestaurantUseCase) {
    this.deleteRestaurantUseCase = deleteRestaurantUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const { restaurantId } = request.params;

    try {
      const result = await this.deleteRestaurantUseCase.execute(restaurantId);
      return response.status(200).json({ message: result });
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
