import { Order, PrismaClient } from "@prisma/client";
import { CreateOrderDTO } from "../useCases/CreateOrder/CreateOrderDTO";
import { IOrderRepository } from "./interfaces/IOrderRepository";
import ValidationException from "../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../exceptions";

export default class OrderRepository implements IOrderRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create({
    description,
    status,
    totalAmount,
    userId,
    restaurantId,
  }: CreateOrderDTO) {
    return this.prisma.order.create({
      data: {
        description,
        status,
        totalAmount,
        userId,
        restaurantId,
      },
    });
  }

  getById(id: string) {
    return this.prisma.order.findUnique({
      where: {
        id,
      },
    });
  }

  async getByUserId(userId: string) {
    const userOrders = await this.prisma.user.findMany({
      where: {
        id: userId,
      },
    });

    const OrdersPromises: Promise<any>[] = userOrders.map((userOrder) => {
      return this.prisma.order.findFirst({
        where: {
          id: userOrder.id,
        },
      });
    });

    const Orders = await Promise.all(OrdersPromises);

    return Orders;
  }

  async getByRestaurantId(restaurantId: string) {
    const userOrders = await this.prisma.user.findMany({
      where: {
        id: restaurantId,
      },
    });

    const OrdersPromises: Promise<any>[] = userOrders.map((userOrder) => {
      return this.prisma.order.findFirst({
        where: {
          id: userOrder.id,
        },
      });
    });

    const Orders = await Promise.all(OrdersPromises);

    return Orders;
  }

  getAllOrders() {
    return this.prisma.order.findMany();
  }

  update(id: string, updatedData: Partial<Order>) {
    if (!Object.keys(updatedData).length) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Nenhum dado de atualização fornecido.`,
        },
        404,
      );
    }

    return this.prisma.order.update({
      where: {
        id,
      },
      data: updatedData,
    });
  }

  delete(id: string) {
    return this.prisma.order.delete({
      where: {
        id,
      },
    });
  }
}
