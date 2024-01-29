import { UserRestaurant } from "@prisma/client";
import { CreateUserRestaurantDTO } from "../../useCases/CreateUserRestaurant/CreateUserRestaurantDTO";

export interface IUserRestaurantRepository {
  create(userRestaurant: CreateUserRestaurantDTO): Promise<UserRestaurant>;
  getById(userRestaurantId: string): Promise<UserRestaurant | null>;
  getAllUserRestaurants(): Promise<UserRestaurant[] | null>;
  getByUserId(userId: string): Promise<UserRestaurant[] | null>;
  update(
    userRestaurantId: string,
    updatedUserRestaurantData: Partial<UserRestaurant>,
  ): Promise<UserRestaurant>;
  delete(userRestaurantId: string): Promise<UserRestaurant>;
}
