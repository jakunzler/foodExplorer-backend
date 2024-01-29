import { getPrisma } from "../../../../db_mysql/prisma";
import UserRestaurantRepository from "../../repositories/UserRestaurantRepository";
import UpdateUserRestaurantController from "./UpdateUserRestaurantController";
import UpdateUserRestaurantUseCase from "./UpdateUserRestaurantUseCase";

export default async function UpdateUserRestaurant() {
  const prisma = await getPrisma();

  const userRestaurantRepository = new UserRestaurantRepository(prisma);

  const updateUserRestaurantUseCase = new UpdateUserRestaurantUseCase(
    userRestaurantRepository,
  );
  const updateUserRestaurantController = new UpdateUserRestaurantController(
    updateUserRestaurantUseCase,
  );

  return { updateUserRestaurantUseCase, updateUserRestaurantController };
}
