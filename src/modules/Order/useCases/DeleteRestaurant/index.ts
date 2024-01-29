import { getPrisma } from "../../../../db_mysql/prisma";
import RestaurantRepository from "../../repositories/RestaurantRepository";
import DeleteRestaurantController from "./DeleteRestaurantController";
import DeleteRestaurantUseCase from "./DeleteRestaurantUseCase";

export default async function DeleteRestaurant() {
  const prisma = await getPrisma();

  const restaurantRepository = new RestaurantRepository(prisma);

  const deleteRestaurantUseCase = new DeleteRestaurantUseCase(
    restaurantRepository,
  );
  const deleteRestaurantController = new DeleteRestaurantController(
    deleteRestaurantUseCase,
  );

  return { deleteRestaurantUseCase, deleteRestaurantController };
}
