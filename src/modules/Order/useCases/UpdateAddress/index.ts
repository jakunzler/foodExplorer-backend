import { getPrisma } from "../../../../db_mysql/prisma";
import AddressRepository from "../../../../modules/Order/repositories/AddressRepository";
import UpdateAddressController from "./UpdateAddressController";
import UpdateAddressUseCase from "./UpdateAddressUseCase";

export default async function UpdateAddress() {
  const prisma = await getPrisma();

  const addressRepository = new AddressRepository(prisma);

  const updateAddressUseCase = new UpdateAddressUseCase(addressRepository);
  const updateAddressController = new UpdateAddressController(
    updateAddressUseCase,
  );

  return { updateAddressUseCase, updateAddressController };
}
