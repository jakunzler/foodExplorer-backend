import { getPrisma } from "../../../../db_mysql/prisma";
import RestaurantRepository from "../../repositories/RestaurantRepository";
import GetRestaurantController from "./GetRestaurantController";
import GetRestaurantUseCase from "./GetRestaurantUseCase";

export default async function GetRestaurant() {
  const prisma = await getPrisma();

  const restaurantRepository = new RestaurantRepository(prisma);

  const getRestaurantUseCase = new GetRestaurantUseCase(restaurantRepository);
  const getRestaurantController = new GetRestaurantController(
    getRestaurantUseCase,
  );

  return { getRestaurantUseCase, getRestaurantController };
}
