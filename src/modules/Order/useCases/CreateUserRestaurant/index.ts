import { getPrisma } from "../../../../db_mysql/prisma";
import UserRestaurantRepository from "../../repositories/UserRestaurantRepository";
import CreateUserRestaurantController from "./CreateUserRestaurantController";
import CreateUserRestaurantUseCase from "./CreateUserRestaurantUseCase";

export default async function CreateUserRestaurant() {
  const prisma = await getPrisma();

  const userRestaurantRepository = new UserRestaurantRepository(prisma);

  const createUserRestaurantUseCase = new CreateUserRestaurantUseCase(
    userRestaurantRepository,
  );
  const createUserRestaurantController = new CreateUserRestaurantController(
    createUserRestaurantUseCase,
  );

  return { createUserRestaurantUseCase, createUserRestaurantController };
}
