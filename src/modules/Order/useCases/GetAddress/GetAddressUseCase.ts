import { IAddressRepository } from "../../../../modules/Order/repositories/interfaces/IAddressRepository";

export default class GetAddressUseCase {
  private addressRepository: IAddressRepository;

  constructor(addressRepository: IAddressRepository) {
    this.addressRepository = addressRepository;
  }

  async execute(addressId: string) {
    return this.addressRepository.getById(addressId);
  }
}
