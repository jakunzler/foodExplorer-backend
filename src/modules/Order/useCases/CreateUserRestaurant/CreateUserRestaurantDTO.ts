import { User, Restaurant } from "@prisma/client";

export type CreateUserRestaurantDTO = {
  user: User;
  userId: string;
  restaurant: Restaurant;
  restaurantId: string;
};
