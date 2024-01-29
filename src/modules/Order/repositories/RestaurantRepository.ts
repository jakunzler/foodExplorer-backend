import { Restaurant, PrismaClient } from "@prisma/client";
import { CreateRestaurantDTO } from "../useCases/CreateRestaurant/CreateRestaurantDTO";
import { IRestaurantRepository } from "./interfaces/IRestaurantRepository";
import ValidationException from "../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../exceptions";

export default class RestaurantRepository implements IRestaurantRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create({ name, cnpj }: CreateRestaurantDTO) {
    return this.prisma.restaurant.create({
      data: {
        name,
        cnpj,
      },
    });
  }

  getById(id: string) {
    return this.prisma.restaurant.findUnique({
      where: {
        id,
      },
    });
  }

  async getByUserId(userId: string) {
    const userRestaurants = await this.prisma.userRestaurant.findMany({
      where: {
        userId,
      },
    });

    const RestaurantsPromises: Promise<any>[] = userRestaurants.map(
      (userRestaurant) => {
        return this.prisma.restaurant.findFirst({
          where: {
            id: userRestaurant.restaurantId,
          },
        });
      },
    );

    const Restaurants = await Promise.all(RestaurantsPromises);

    return Restaurants;
  }
  getAllRestaurants() {
    return this.prisma.restaurant.findMany();
  }

  update(id: string, updatedData: Partial<Restaurant>) {
    if (!Object.keys(updatedData).length) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Nenhum dado de atualização fornecido.`,
        },
        404,
      );
    }

    return this.prisma.restaurant.update({
      where: {
        id,
      },
      data: updatedData,
    });
  }

  delete(id: string) {
    return this.prisma.restaurant.delete({
      where: {
        id,
      },
    });
  }
}
