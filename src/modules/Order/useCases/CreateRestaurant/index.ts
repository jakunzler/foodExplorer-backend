import { getPrisma } from "../../../../db_mysql/prisma";
import RestaurantRepository from "../../repositories/RestaurantRepository";
import CreateRestaurantController from "./CreateRestaurantController";
import CreateRestaurantUseCase from "./CreateRestaurantUseCase";

export default async function CreateRestaurant() {
  const prisma = await getPrisma();

  const restaurantRepository = new RestaurantRepository(prisma);

  const createRestaurantUseCase = new CreateRestaurantUseCase(
    restaurantRepository,
  );
  const createRestaurantController = new CreateRestaurantController(
    createRestaurantUseCase,
  );

  return { createRestaurantUseCase, createRestaurantController };
}
