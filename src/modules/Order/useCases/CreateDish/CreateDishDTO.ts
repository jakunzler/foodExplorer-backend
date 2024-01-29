export type CreateDishDTO = {
  name: string;
  status: string;
  category: string;
  ingredients?: string;
  summary_description?: string;
  full_description?: string;
  price: number;
  image?: string;
  restaurantId: string;
};
