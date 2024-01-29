import { PrismaClient } from "@prisma/client";
import { IDishIngredientRepository } from "./interfaces/IDishIngredientRepository";

export default class DishIngredientRepository
  implements IDishIngredientRepository
{
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  // getByDishId(dishId: string) {
  //   return this.prisma.dishIngredient.findMany({
  //     where: {
  //       dishId,
  //     },
  //   });
  // }

  // delete(id: string) {
  //   return this.prisma.dishIngredient.delete({
  //     where: {
  //       id,
  //     },
  //   });
  // }

  // deleteAll(dishId: string) {
  //   return this.prisma.dishIngredient.deleteMany({
  //     where: {
  //       dishId,
  //     },
  //   });
  // }
}
