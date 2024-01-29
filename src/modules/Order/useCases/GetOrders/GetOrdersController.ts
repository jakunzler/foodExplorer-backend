import { NextFunction, Request, Response } from "express";
import GetOrdersUseCase from "./GetOrdersUseCase";

export default class GetOrdersController {
  constructor(private getOrdersUseCase: GetOrdersUseCase) {
    this.getOrdersUseCase = getOrdersUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const orders = await this.getOrdersUseCase.execute();

      return response.status(200).json(orders);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
