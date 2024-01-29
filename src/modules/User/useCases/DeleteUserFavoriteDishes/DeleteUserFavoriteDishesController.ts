import { NextFunction, Request, Response } from "express";
import DeleteUserFavoriteDishesUseCase from "./DeleteUserFavoriteDishesUseCase";

export default class DeleteUserFavoriteDishesController {
  constructor(
    private deleteUserFavoriteDishesUseCase: DeleteUserFavoriteDishesUseCase,
  ) {
    this.deleteUserFavoriteDishesUseCase = deleteUserFavoriteDishesUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { favoriteId } = request.params;

      const favorite =
        await this.deleteUserFavoriteDishesUseCase.execute(favoriteId);
      return response.status(200).json(favorite);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
