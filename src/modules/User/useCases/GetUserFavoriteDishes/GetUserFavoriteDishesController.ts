import { NextFunction, Request, Response } from "express";
import GetUserFavoriteDishesUseCase from "./GetUserFavoriteDishesUseCase";

export default class GetUserFavoriteDishesController {
  constructor(
    private getUserFavoriteDishesUseCase: GetUserFavoriteDishesUseCase,
  ) {
    this.getUserFavoriteDishesUseCase = getUserFavoriteDishesUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { userId } = request.query;

      if (typeof userId === "string") {
        const UserFavoriteDishes =
          await this.getUserFavoriteDishesUseCase.execute(userId);
        return response.status(200).json(UserFavoriteDishes);
      } else {
        return response.status(400).json({ message: "UserId inválido" });
      }
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
