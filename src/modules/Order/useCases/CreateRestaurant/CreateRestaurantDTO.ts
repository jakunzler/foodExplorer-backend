import { Address, UserRestaurant, Order, Dish } from "@prisma/client";

export type CreateRestaurantDTO = {
  name: string;
  cnpj: string;
  address?: Address;
  userRestaurant?: UserRestaurant[];
  orders: Order[];
  dishes: Dish[];
};
