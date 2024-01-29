import { NextFunction, Request, Response } from "express";
import { CreateOrderDTO } from "./CreateOrderDTO";
import CreateOrderUseCase from "./CreateOrderUseCase";

export default class CreateOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {
    this.createOrderUseCase = createOrderUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { description, status, totalAmount, userId, restaurantId } =
        request.body as CreateOrderDTO;

      const order = await this.createOrderUseCase.execute({
        description,
        status,
        totalAmount,
        userId,
        restaurantId,
      });

      return response.status(201).json(order);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
