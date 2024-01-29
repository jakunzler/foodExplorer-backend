import { UserRestaurant, PrismaClient } from "@prisma/client";
import { CreateUserRestaurantDTO } from "../useCases/CreateUserRestaurant/CreateUserRestaurantDTO";
import { IUserRestaurantRepository } from "./interfaces/IUserRestaurantRepository";
import ValidationException from "../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../exceptions";

export default class UserRestaurantRepository
  implements IUserRestaurantRepository
{
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create({
    user,
    userId,
    restaurant,
    restaurantId,
  }: CreateUserRestaurantDTO) {
    return this.prisma.userRestaurant.create({
      data: {
        userId,
        restaurantId,
      },
    });
  }

  getById(id: string) {
    return this.prisma.userRestaurant.findUnique({
      where: {
        id,
      },
    });
  }

  getByUserId(userId: string) {
    return this.prisma.userRestaurant.findMany({
      where: {
        userId,
      },
    });
  }

  getAllUserRestaurants() {
    return this.prisma.userRestaurant.findMany();
  }

  update(id: string, updatedData: Partial<UserRestaurant>) {
    if (!Object.keys(updatedData).length) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Nenhum dado de atualização fornecido.`,
        },
        404,
      );
    }

    return this.prisma.userRestaurant.update({
      where: {
        id,
      },
      data: updatedData,
    });
  }

  delete(id: string) {
    return this.prisma.userRestaurant.delete({
      where: {
        id,
      },
    });
  }
}
