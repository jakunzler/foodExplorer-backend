import { Dish } from "@prisma/client";
import { CreateDishDTO } from "../../useCases/CreateDish/CreateDishDTO";

export interface IDishRepository {
  create(dish: CreateDishDTO): Promise<Dish>;
  getById(dishId: string): Promise<Dish | null>;
  getByRestaurantId(restaurantId: string): Promise<Dish[] | null>;
  getAllDishes(): Promise<Dish[] | null>;
  update(dishId: string, updatedDishData: Partial<Dish>): Promise<Dish>;
  delete(dishId: string): Promise<Dish>;
}
