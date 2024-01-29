import { getPrisma } from "../../../../db_mysql/prisma";
import RestaurantRepository from "../../../../modules/Order/repositories/RestaurantRepository";
import GetRestaurantsController from "./GetRestaurantsController";
import GetRestaurantsUseCase from "./GetRestaurantsUseCase";

export default async function GetRestaurants() {
  const prisma = await getPrisma();

  const restaurantRepository = new RestaurantRepository(prisma);

  const getRestaurantsUseCase = new GetRestaurantsUseCase(restaurantRepository);
  const getRestaurantsController = new GetRestaurantsController(
    getRestaurantsUseCase,
  );

  return { getRestaurantsUseCase, getRestaurantsController };
}
