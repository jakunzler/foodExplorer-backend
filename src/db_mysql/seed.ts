import { PrismaClient } from "@prisma/client";
import argon2id from "argon2";

const prisma = new PrismaClient();

/**
 * Criação do usuário root
 */
const createRootUser = async (prisma: PrismaClient) => {
  const users = await prisma.user.findMany();

  if (users.length === 0) {
    await prisma.user.create({
      data: {
        name: "Administrador",
        email: "admin@email.com",
        password: await argon2id.hash("123456"),
      },
    });
  }
};

createRootUser(prisma);

// Criação das roles padrão
const createRoles = async (prisma: PrismaClient) => {
  const allRoles = [
    {
      name: "Admin",
      type: "USER_ADMIN",
      role: "IS_ADMIN",
    },
    {
      name: "Client",
      type: "USER",
      role: "IS_CLIENT",
    },
    {
      name: "Support",
      type: "USER_ADMIN",
      role: "IS_SUPPORT",
    },
  ];

  const roles = await prisma.permissionGroups.findMany();

  const nonexistentRoles = allRoles.filter(
    (role) => !roles.find((r) => r.role === role.role),
  );

  if (nonexistentRoles.length > 0) {
    nonexistentRoles.map(async (role) => {
      await prisma.permissionGroups.create({
        data: role,
      });
    });
  }
};

createRoles(prisma);

// Atribuição de roles a usuário específico
const assignSpecificRole = async (prisma: PrismaClient) => {
  const user = await prisma.user.findFirst({
    where: {
      email: "admin@email.com",
    },
  });

  const permissions = await prisma.permissionGroups.findMany();
  const permission = permissions.find(
    (permission) => permission.role === "IS_CLIENT",
  );

  if (user && permission) {
    await prisma.userPermissionGroups.create({
      data: {
        userId: user.id,
        permissionGroupId: permission.id,
      },
    });
  }
};

assignSpecificRole(prisma);

// Atribuição de roles aos usuários padrão
const assignRoles = async (prisma: PrismaClient) => {
  const users = await prisma.user.findMany();
  const permissions = await prisma.permissionGroups.findMany();
  const permission = permissions.find(
    (permission) => permission.role === "IS_ADMIN",
  );
  const usersPermissions = await prisma.userPermissionGroups.findMany();
  const nonexistentUserPermissionGroups = users.filter(
    (user) => !usersPermissions.find((p) => p.userId === user.id),
  );

  nonexistentUserPermissionGroups.forEach(async (user) => {
    if (permission) {
      await prisma.userPermissionGroups.create({
        data: {
          userId: user.id,
          permissionGroupId: permission.id,
        },
      });
    }
  });
};

assignRoles(prisma);

// Criação de mensagem padrão
const createMessages = async (prisma: PrismaClient) => {
  const users = await prisma.user.findMany();
  const messages = await prisma.message.findMany();
  const firstMessage = {
    title: "Bem vindo ao sistema",
    content:
      "Olá, seja bem vindo ao sistema automatizado de solicitações ao foodExplorer",
    type: "info",
  };

  const nonexistentUserFirstMessage = users.filter(
    (user) => !messages.find((m) => m.userId === user.id),
  );

  nonexistentUserFirstMessage.forEach(async (user) => {
    const userId = user.id;
    await prisma.message.create({
      data: {
        ...firstMessage,
        userId,
      },
    });
  });
};

createMessages(prisma);

// Criação das principais empresas
const createRestaurant = async (prisma: PrismaClient) => {
  const restaurants = await prisma.restaurant.findMany();
  const newRestaurants = [
    {
      name: "Food Explorer",
      cnpj: "99.999.999/0001-99",
    },
  ];

  const nonexistentRestaurants = newRestaurants.filter(
    (restaurant) => !restaurants.find((c) => c.cnpj === restaurant.cnpj),
  );

  if (restaurants.length === 0) {
    nonexistentRestaurants.map(async (restaurant) => {
      await prisma.restaurant.create({
        data: restaurant,
      });
    });
  }
};

createRestaurant(prisma);

// Atribuição de empresa aos usuários padrão
const assignRestaurant = async (prisma: PrismaClient) => {
  const users = await prisma.user.findMany();
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      cnpj: "99.999.999/0001-99",
    },
  });
  const userRestaurant = await prisma.userRestaurant.findMany();

  const nonexistentUserRestaurant = users.filter(
    (user) => !userRestaurant.find((u) => u.userId === user.id),
  );

  if (restaurant) {
    for (const user of nonexistentUserRestaurant) {
      await prisma.userRestaurant.create({
        data: {
          userId: user.id,
          restaurantId: restaurant.id,
        },
      });
    }
  }
};

assignRestaurant(prisma);

// Criação de endereço para empresa
const createAddress = async (prisma: PrismaClient) => {
  const addresses = await prisma.address.findMany();
  const restaurants = await prisma.restaurant.findFirst();

  if (restaurants && addresses.length === 0) {
    await prisma.address.create({
      data: {
        street: "Av. do Cerrado",
        number: "999",
        complement: "",
        sector: "Park Lozandes",
        city: "Goiânia",
        state: "Goiás",
        country: "Brasil",
        zipCode: "74884-092",
        restaurantId: restaurants.id,
      },
    });
  }
};

createAddress(prisma);
