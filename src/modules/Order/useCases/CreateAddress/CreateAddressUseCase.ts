import { IAddressRepository } from "../../repositories/interfaces/IAddressRepository";
import { CreateAddressDTO } from "./CreateAddressDTO";

export default class CreateAddressUseCase {
  private addressRepository: IAddressRepository;

  constructor(addressRepository: IAddressRepository) {
    this.addressRepository = addressRepository;
  }

  async execute({
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
  }: CreateAddressDTO) {
    return this.addressRepository.create({
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
  }
}
