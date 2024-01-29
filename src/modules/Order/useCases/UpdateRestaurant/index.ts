import { getPrisma } from "../../../../db_mysql/prisma";
import RestaurantRepository from "../../repositories/RestaurantRepository";
import UpdateRestaurantController from "./UpdateRestaurantController";
import UpdateRestaurantUseCase from "./UpdateRestaurantUseCase";

export default async function UpdateRestaurant() {
  const prisma = await getPrisma();

  const restaurantRepository = new RestaurantRepository(prisma);

  const updateRestaurantUseCase = new UpdateRestaurantUseCase(
    restaurantRepository,
  );
  const updateRestaurantController = new UpdateRestaurantController(
    updateRestaurantUseCase,
  );

  return { updateRestaurantUseCase, updateRestaurantController };
}
