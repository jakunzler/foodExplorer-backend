import { ISessionRepository } from "../../../../modules/User/repositories/interfaces/ISessionRepository";
import { IUserRepository } from "../../../../modules/User/repositories/interfaces/IUserRepository";
import { IPermissionsRepository } from "../../repositories/interfaces/IPermissionsRepository";
import { IRestaurantRepository } from "../../../../modules/Order/repositories/interfaces/IRestaurantRepository";
import { ICategoryRepository } from "../../../../modules/Order/repositories/interfaces/ICategoryRepository";
import { IDishRepository } from "../../../../modules/Order/repositories/interfaces/IDishRepository";
import { IOrderRepository } from "../../../../modules/Order/repositories/interfaces/IOrderRepository";
import { AuthExceptionEnum, HttpExceptionEnum } from "../../../../exceptions";
import ValidationException from "../../../../exceptions/ValidationException";

import generateJWT from "../../../../utils/jwt";
import { User } from "@prisma/client";
import argon2id from "argon2";
import { Lookup } from "geoip-lite";

export default class AuthUserUseCase {
  private userRepository: IUserRepository;
  private sessionRepository: ISessionRepository;
  private permissionsRepository: IPermissionsRepository;
  private restaurantRepository: IRestaurantRepository;
  private categoryRepository: ICategoryRepository;
  private dishRepository: IDishRepository;
  private orderRepository: IOrderRepository;

  constructor(
    userRepository: IUserRepository,
    sessionRepository: ISessionRepository,
    permissionsRepository: IPermissionsRepository,
    restaurantRepository: IRestaurantRepository,
    categoryRepository: ICategoryRepository,
    dishRepository: IDishRepository,
    orderRepository: IOrderRepository,
  ) {
    this.userRepository = userRepository;
    this.sessionRepository = sessionRepository;
    this.permissionsRepository = permissionsRepository;
    this.restaurantRepository = restaurantRepository;
    this.categoryRepository = categoryRepository;
    this.dishRepository = dishRepository;
    this.orderRepository = orderRepository;
  }

  async execute(login: string) {
    const user = await this.userRepository.authenticate(login);

    if (user) {
      const permissions = await this.permissionsRepository.getByUserId(user.id);
      const restaurants = await this.restaurantRepository.getAllRestaurants();
      const categories = await this.categoryRepository.getAllCategories();
      const dishes = await this.dishRepository.getAllDishes();
      const orders = await this.orderRepository.getAllOrders();

      return {
        user,
        permissions: permissions,
        restaurants: restaurants,
        categories: categories,
        dishes: dishes,
        orders: orders,
      };
    } else {
      return {
        user,
        permissions: null,
        restaurants: null,
        categories: null,
        dishes: null,
        orders: null,
      };
    }
  }

  public async matchUser(user: User | null, password: string) {
    if (!user) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Usuário não encontrado.`,
        },
        404,
      );
    }

    const passMatch = await argon2id.verify(user.password, password);
    if (!passMatch) {
      throw new ValidationException(
        AuthExceptionEnum.INVALID_CREDENTIALS,
        {
          message: `Credenciais invalidas.`,
        },
        404,
      );
    }

    return generateJWT(user.id);
  }

  public async registerFirstLogin(userId: string, firstLogin: Date | null) {
    if (!firstLogin) {
      await this.userRepository.setFirstLoginDate(userId);
    }
  }

  public createSession(
    userId: string,
    ip: string,
    userAgent?: string,
    language?: string,
    geodata?: Lookup | null,
  ) {
    return this.sessionRepository.add(userId, ip, userAgent, language, geodata);
  }
}
