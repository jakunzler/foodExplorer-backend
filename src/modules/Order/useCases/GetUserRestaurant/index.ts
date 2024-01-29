import { getPrisma } from "../../../../db_mysql/prisma";
import UserRestaurantRepository from "../../repositories/UserRestaurantRepository";
import GetUserRestaurantController from "./GetUserRestaurantController";
import GetUserRestaurantUseCase from "./GetUserRestaurantUseCase";

export default async function GetUserRestaurant() {
  const prisma = await getPrisma();

  const userRestaurantRepository = new UserRestaurantRepository(prisma);

  const getUserRestaurantUseCase = new GetUserRestaurantUseCase(
    userRestaurantRepository,
  );
  const getUserRestaurantController = new GetUserRestaurantController(
    getUserRestaurantUseCase,
  );

  return { getUserRestaurantUseCase, getUserRestaurantController };
}
