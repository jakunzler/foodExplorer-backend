import { NextFunction, Request, Response } from "express";
import UpdateOrCreateUserFavoriteDishesUseCase from "./UpdateOrCreateUserFavoriteDishesUseCase";

export default class UpdateOrCreateUserFavoriteDishesController {
  constructor(
    private updateOrCreateUserFavoriteDishesUseCase: UpdateOrCreateUserFavoriteDishesUseCase,
  ) {
    this.updateOrCreateUserFavoriteDishesUseCase =
      updateOrCreateUserFavoriteDishesUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { userId, dishId } = request.body;

      const userFavoriteDishes =
        await this.updateOrCreateUserFavoriteDishesUseCase.execute(
          userId,
          dishId,
        );

      return response.status(200).json(userFavoriteDishes);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
