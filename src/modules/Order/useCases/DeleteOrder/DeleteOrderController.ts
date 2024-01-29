import { NextFunction, Request, Response } from "express";
import DeleteOrderUseCase from "./DeleteOrderUseCase";

export default class DeleteOrderController {
  constructor(private deleteOrderUseCase: DeleteOrderUseCase) {
    this.deleteOrderUseCase = deleteOrderUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const { orderId } = request.params;

    try {
      const result = await this.deleteOrderUseCase.execute(orderId);
      return response.status(200).json({ message: result });
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
