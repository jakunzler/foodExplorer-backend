import { NextFunction, Request, Response } from "express";
import { CreateRestaurantDTO } from "./CreateRestaurantDTO";
import CreateRestaurantUseCase from "./CreateRestaurantUseCase";

export default class CreateRestaurantController {
  constructor(private createRestaurantUseCase: CreateRestaurantUseCase) {
    this.createRestaurantUseCase = createRestaurantUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, cnpj, userRestaurant, orders, dishes } =
        request.body as CreateRestaurantDTO;

      const restaurant = await this.createRestaurantUseCase.execute({
        name,
        cnpj,
        userRestaurant,
        orders,
        dishes,
      });

      return response.status(201).json(restaurant);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
