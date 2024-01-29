import { NextFunction, Request, Response } from "express";
import { CreateAddressDTO } from "./CreateAddressDTO";
import CreateAddressUseCase from "./CreateAddressUseCase";

export default class CreateAddressController {
  constructor(private createAddressUseCase: CreateAddressUseCase) {
    this.createAddressUseCase = createAddressUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        street,
        number,
        complement,
        sector,
        city,
        state,
        country,
        zipCode,
        latitude,
        longitude,
        restaurantId,
        orders,
      } = request.body as CreateAddressDTO;

      const address = await this.createAddressUseCase.execute({
        street,
        number,
        complement,
        sector,
        city,
        state,
        country,
        zipCode,
        latitude,
        longitude,
        restaurantId,
        orders,
      });

      return response.status(201).json(address);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
