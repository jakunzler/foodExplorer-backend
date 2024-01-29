import { getPrisma } from "../../../../db_mysql/prisma";
import AddressRepository from "../../../../modules/Order/repositories/AddressRepository";
import DeleteAddressController from "./DeleteAddressController";
import DeleteAddressUseCase from "./DeleteAddressUseCase";

export default async function DeleteAddress() {
  const prisma = await getPrisma();

  const addressRepository = new AddressRepository(prisma);

  const deleteAddressUseCase = new DeleteAddressUseCase(addressRepository);
  const deleteAddressController = new DeleteAddressController(
    deleteAddressUseCase,
  );

  return { deleteAddressUseCase, deleteAddressController };
}
