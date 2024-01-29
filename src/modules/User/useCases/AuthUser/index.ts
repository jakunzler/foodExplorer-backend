import { getPrisma } from "../../../../db_mysql/prisma";
import AuthUserController from "./AuthUserController";
import AuthUserUseCase from "./AuthUserUseCase";
import SessionRepository from "../../../../modules/User/repositories/SessionRepository";
import UserRepository from "../../../../modules/User/repositories/UserRepository";
import PermissionsRepository from "../../repositories/PermissionRepository";
import RestaurantRepository from "../../../../modules/Order/repositories/RestaurantRepository";
import CategoryRepository from "../../../../modules/Order/repositories/CategoryRepository";
import DishRepository from "../../../../modules/Order/repositories/DishRepository";
import OrderRepository from "../../../../modules/Order/repositories/OrderRepository";

export default async function AuthUser() {
  const prisma = await getPrisma();

  const authUserRepository = new UserRepository(prisma);
  const sessionRepository = new SessionRepository(prisma);
  const permissionsRepository = new PermissionsRepository(prisma);
  const restaurantRepository = new RestaurantRepository(prisma);
  const categoryRepository = new CategoryRepository(prisma);
  const dishRepository = new DishRepository(prisma);
  const orderRepository = new OrderRepository(prisma);

  const authUserUseCase = new AuthUserUseCase(
    authUserRepository,
    sessionRepository,
    permissionsRepository,
    restaurantRepository,
    categoryRepository,
    dishRepository,
    orderRepository,
  );

  const authUserController = new AuthUserController(authUserUseCase);

  return { authUserUseCase, authUserController };
}
