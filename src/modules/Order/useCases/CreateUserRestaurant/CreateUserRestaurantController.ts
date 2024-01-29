import { NextFunction, Request, Response } from "express";
import { CreateUserRestaurantDTO } from "./CreateUserRestaurantDTO";
import CreateUserRestaurantUseCase from "./CreateUserRestaurantUseCase";

export default class CreateUserRestaurantController {
  constructor(
    private createUserRestaurantUseCase: CreateUserRestaurantUseCase,
  ) {
    this.createUserRestaurantUseCase = createUserRestaurantUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { user, userId, restaurant, restaurantId } =
        request.body as CreateUserRestaurantDTO;

      const userRestaurant = await this.createUserRestaurantUseCase.execute({
        user,
        userId,
        restaurant,
        restaurantId,
      });

      return response.status(201).json(userRestaurant);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
