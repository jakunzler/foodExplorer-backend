import { Restaurant } from "@prisma/client";
import { CreateRestaurantDTO } from "../../useCases/CreateRestaurant/CreateRestaurantDTO";

export interface IRestaurantRepository {
  create(restaurant: CreateRestaurantDTO): Promise<Restaurant>;
  getById(restaurantId: string): Promise<Restaurant | null>;
  getByUserId(userId: string): Promise<Restaurant[] | null>;
  getAllRestaurants(): Promise<Restaurant[] | null>;
  update(
    restaurantId: string,
    updatedRestaurantData: Partial<Restaurant>,
  ): Promise<Restaurant>;
  delete(restaurantId: string): Promise<Restaurant>;
}
