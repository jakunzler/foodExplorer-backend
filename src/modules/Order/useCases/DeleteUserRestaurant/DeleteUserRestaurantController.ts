import { NextFunction, Request, Response } from "express";
import DeleteUserRestaurantUseCase from "./DeleteUserRestaurantUseCase";

export default class DeleteUserRestaurantController {
  constructor(
    private deleteUserRestaurantUseCase: DeleteUserRestaurantUseCase,
  ) {
    this.deleteUserRestaurantUseCase = deleteUserRestaurantUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const { userRestaurantId } = request.params;

    try {
      const result =
        await this.deleteUserRestaurantUseCase.execute(userRestaurantId);
      return response.status(200).json({ message: result });
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
