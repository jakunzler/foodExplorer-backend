import { Address, Restaurant, Order } from "@prisma/client";

export type CreateAddressDTO = {
  street: string;
  number: string;
  complement: string;
  sector: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  restaurant?: Restaurant;
  restaurantId: string;
  orders?: Order[];
};
