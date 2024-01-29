import { getPrisma } from "../../../../db_mysql/prisma";
import UserRestaurantRepository from "../../repositories/UserRestaurantRepository";
import DeleteUserRestaurantController from "./DeleteUserRestaurantController";
import DeleteUserRestaurantUseCase from "./DeleteUserRestaurantUseCase";

export default async function DeleteUserRestaurant() {
  const prisma = await getPrisma();

  const userRestaurantRepository = new UserRestaurantRepository(prisma);

  const deleteUserRestaurantUseCase = new DeleteUserRestaurantUseCase(
    userRestaurantRepository,
  );
  const deleteUserRestaurantController = new DeleteUserRestaurantController(
    deleteUserRestaurantUseCase,
  );

  return { deleteUserRestaurantUseCase, deleteUserRestaurantController };
}
