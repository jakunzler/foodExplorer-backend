import { UserFavoriteDishes, PrismaClient, Dish } from "@prisma/client";
import { CreateUserFavoriteDishesDTO } from "../useCases/CreateUserFavoriteDishes/CreateUserFavoriteDishesDTO";
import { IUserFavoriteDishesRepository } from "./interfaces/IUserFavoriteDishesRepository";
import ValidationException from "../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../exceptions";

export default class UserFavoriteDishesRepository
  implements IUserFavoriteDishesRepository
{
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create({ userId, dishId }: CreateUserFavoriteDishesDTO) {
    return this.prisma.userFavoriteDishes.create({
      data: {
        userId,
        dishId,
      },
    });
  }

  getById(id: string) {
    return this.prisma.userFavoriteDishes.findUnique({
      where: {
        id,
      },
    });
  }

  getByUserId(userId: string) {
    return this.prisma.userFavoriteDishes.findMany({
      where: {
        userId,
      },
      include: {
        dish: true,
      },
    });
  }

  async update(id: string, updatedData: Partial<UserFavoriteDishes>) {
    if (!Object.keys(updatedData).length) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Nenhum dado de atualização fornecido.`,
        },
        404,
      );
    }

    return this.prisma.userFavoriteDishes.update({
      where: {
        id,
      },
      data: updatedData,
    });
  }

  async updateOrCreate(userId: string, dishId: string) {
    interface UserFavoriteDishesExpanded extends UserFavoriteDishes {
      dish: Dish;
    }
    const existingUserFavoriteDishes: UserFavoriteDishesExpanded[] | null =
      await this.prisma.userFavoriteDishes.findMany({
        where: {
          userId,
          dishId,
        },
        include: {
          dish: true,
        },
      });

    const currentDish =
      existingUserFavoriteDishes &&
      existingUserFavoriteDishes.find((dish) => dish.dish.id === dishId);

    if (currentDish) {
      return this.prisma.userFavoriteDishes.update({
        where: {
          id: currentDish.id,
        },
        data: {
          isActive: !currentDish.isActive,
        },
      });
    }

    return this.prisma.userFavoriteDishes.create({
      data: {
        userId,
        dishId,
      },
    });
  }

  delete(id: string) {
    return this.prisma.userFavoriteDishes.delete({
      where: {
        id,
      },
    });
  }
}
