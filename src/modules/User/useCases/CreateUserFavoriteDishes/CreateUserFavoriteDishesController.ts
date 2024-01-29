import { NextFunction, Request, Response } from "express";
import { CreateUserFavoriteDishesDTO } from "./CreateUserFavoriteDishesDTO";
import CreateUserFavoriteDishesUseCase from "./CreateUserFavoriteDishesUseCase";

export default class CreateUserFavoriteDishesController {
  constructor(
    private createUserFavoriteDishesUseCase: CreateUserFavoriteDishesUseCase,
  ) {
    this.createUserFavoriteDishesUseCase = createUserFavoriteDishesUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { userId, dishId } = request.body as CreateUserFavoriteDishesDTO;

      const UserFavoriteDishes =
        await this.createUserFavoriteDishesUseCase.execute({
          userId,
          dishId,
        });

      return response.status(201).json(UserFavoriteDishes);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
