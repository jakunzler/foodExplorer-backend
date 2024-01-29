import { NextFunction, Request, Response } from "express";
import UpdateOrderUseCase from "./UpdateOrderUseCase";

export default class UpdateOrderController {
  constructor(private updateOrderUseCase: UpdateOrderUseCase) {
    this.updateOrderUseCase = updateOrderUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { orderId } = request.params;
      const newData = request.body;

      const order = await this.updateOrderUseCase.execute(orderId, newData);

      return response.status(200).json(order);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
