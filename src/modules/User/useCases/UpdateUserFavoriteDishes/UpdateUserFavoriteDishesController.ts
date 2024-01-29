import { NextFunction, Request, Response } from "express";
import UpdateUserFavoriteDishesUseCase from "./UpdateUserFavoriteDishesUseCase";

export default class UpdateUserFavoriteDishesController {
  constructor(
    private updateUserFavoriteDishesUseCase: UpdateUserFavoriteDishesUseCase,
  ) {
    this.updateUserFavoriteDishesUseCase = updateUserFavoriteDishesUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { favoriteId } = request.params;
      const newData = request.body;

      const userFavoriteDishes =
        await this.updateUserFavoriteDishesUseCase.execute(favoriteId, newData);

      return response.status(200).json(userFavoriteDishes);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
