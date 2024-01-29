import { Dish, PrismaClient } from "@prisma/client";
import { CreateDishDTO } from "../useCases/CreateDish/CreateDishDTO";
import { IDishRepository } from "./interfaces/IDishRepository";
import ValidationException from "../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../exceptions";

export default class DishRepository implements IDishRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create({
    name,
    status,
    category,
    ingredients,
    summary_description,
    full_description,
    price,
    image,
    restaurantId,
  }: CreateDishDTO) {
    return this.prisma.dish.create({
      data: {
        name,
        status,
        summary_description,
        full_description,
        price,
        image,
        restaurantId,
        categories: {
          create: {
            category: {
              connect: {
                id: category,
              },
            },
          },
        },
        ingredients,
        // ingredients: {
        //   create:
        //     ingredients &&
        //     ingredients.map((ingredient) => ({
        //       ingredient: {
        //         connect: {
        //           id: ingredient.id,
        //         },
        //       },
        //     })),
        // },
      },
    });
  }

  getById(id: string) {
    return this.prisma.dish.findUnique({
      where: {
        id,
      },
    });
  }

  async getByRestaurantId(restaurantId: string) {
    const restaurantDishes = await this.prisma.dish.findMany({
      where: {
        restaurantId,
      },
    });

    const DishesPromises: Promise<any>[] = restaurantDishes.map(
      (restaurantDish) => {
        return this.prisma.dish.findFirst({
          where: {
            id: restaurantDish.id,
          },
        });
      },
    );

    const Dishes = await Promise.all(DishesPromises);

    return Dishes;
  }

  getAllDishes() {
    return this.prisma.dish.findMany({
      where: {
        isActive: true,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        // ingredients: {
        //   include: {
        //     ingredient: true,
        //   },
        // },
      },
    });
  }

  update(id: string, updatedData: Partial<Dish>) {
    if (!Object.keys(updatedData).length) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Nenhum dado de atualização fornecido.`,
        },
        404,
      );
    }

    return this.prisma.dish.update({
      where: {
        id,
      },
      data: {
        name: updatedData.name,
        status: updatedData.status,
        ingredients: updatedData.ingredients,
        summary_description: updatedData.summary_description,
        full_description: updatedData.full_description,
        price: updatedData.price,
        isActive: updatedData.isActive,
        image: updatedData.image,
      },
    });
  }

  delete(id: string) {
    return this.prisma.dish.delete({
      where: {
        id,
      },
    });
  }
}
