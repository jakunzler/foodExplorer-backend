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
enum PermissionTypeGroup {
  USER = "USER",
  USER_ADMIN = "USER_ADMIN",
}

enum Roles {
  IS_ADMIN = "IS_ADMIN",
  IS_SUPPORT = "IS_SUPPORT",
  IS_CLIENT = "IS_CLIENT",
}

const createRoles = async (prisma: PrismaClient) => {
  const allRoles = [
    {
      name: "Admin",
      type: PermissionTypeGroup.USER_ADMIN,
      role: Roles.IS_ADMIN,
    },
    {
      name: "Client",
      type: PermissionTypeGroup.USER,
      role: Roles.IS_CLIENT,
    },
    {
      name: "Support",
      type: PermissionTypeGroup.USER_ADMIN,
      role: Roles.IS_SUPPORT,
    },
  ];

  const roles = await prisma.permissionGroups.findMany();

  const nonexistentRoles: any = allRoles.filter(
    (role) => !roles.find((r) => r.role === role.role),
  );

  if (nonexistentRoles.length > 0) {
    nonexistentRoles.forEach(async (role: any) => {
      await prisma.permissionGroups.create({
        data: {
          name: role.name,
          type: role.type,
          role: role.role,
        },
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

  let grantedPermission;
  if (user) {
    grantedPermission = await prisma.userPermissionGroups.findFirst({
      where: {
        userId: user.id,
      },
    });
  }

  const permissions = await prisma.permissionGroups.findMany();
  const permission = permissions.find(
    (permission) => permission.role === Roles.IS_ADMIN,
  );

  if (user && permission && !grantedPermission) {
    await prisma.userPermissionGroups.create({
      data: {
        userId: user.id,
        permissionGroupId: permission.id,
      },
    });
  }
};

assignSpecificRole(prisma);

// Criação de mensagem padrão
const createMessages = async (prisma: PrismaClient) => {
  const users = await prisma.user.findMany();
  const messages = await prisma.message.findMany();
  const firstMessage = {
    title: "Bem vindo ao sistema",
    content:
      "Olá, seja bem vindo ao sistema de gestão de restaurantes foodExplorer.",
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

//Criação do endereço de entrega do pedido
const createDeliveryAddress = async (prisma: PrismaClient) => {
  const user = await prisma.user.findFirst({
    where: {
      email: "admin@email.com",
    },
  });

  if (user) {
    await prisma.deliveryAddress.create({
      data: {
        street: "Rua do Pedido",
        number: "123",
        sector: "Setor do Pedido",
        city: "Cidade do Pedido",
        state: "Estado do Pedido",
        country: "País do Pedido",
        zipCode: "1234567",
        userId: user.id,
      },
    });
  }
};

createDeliveryAddress(prisma);

// Criação das principais empresas
const createRestaurant = async (prisma: PrismaClient) => {
  const restaurants = await prisma.restaurant.findMany();
  const newRestaurants = [
    {
      name: "Pão na Pança",
      cnpj: "99.999.999/0001-99",
    },
  ];

  const nonexistentRestaurants = newRestaurants.filter(
    (restaurant) => !restaurants.find((c) => c.cnpj === restaurant.cnpj),
  );

  if (restaurants.length === 0) {
    nonexistentRestaurants.forEach(async (restaurant) => {
      await prisma.restaurant.create({
        data: {
          ...restaurant,
        },
      });
    });
  }
};

createRestaurant(prisma);

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

// Criação das principais categorias
const createCategories = async (prisma: PrismaClient) => {
  const categories = await prisma.category.findMany();

  const newCategories = [
    {
      name: "Massas",
      description: "Pizzas, massas e calzone",
    },
    {
      name: "Entradas",
      description: "Entradas",
    },
    {
      name: "Pratos Principais",
      description: "Pratos principais",
    },
    {
      name: "Pratos Executivos",
      description: "Pratos executivos",
    },
    {
      name: "Bebidas",
      description: "Bebidas",
    },
    {
      name: "Sobremesas",
      description: "Sobremesas",
    },
    {
      name: "Petiscos",
      description: "Petiscos",
    },
    {
      id: "38630cdc-d9fa-4407-8986-793b8d921b53",
      name: "Diversos",
      description: "Diversos",
    },
  ];

  const nonexistentCategories = newCategories.filter(
    (category) => !categories.find((c) => c.name === category.name),
  );

  if (nonexistentCategories.length > 0) {
    nonexistentCategories.forEach(async (category) => {
      await prisma.category.create({
        data: {
          ...category,
        },
      });
    });
  }
};

createCategories(prisma);

// // Criação dos ingredientes dos pratos
// const createIngredients = async (prisma: PrismaClient) => {
//   const ingredients = await prisma.ingredient.findMany();

//   const newIngredients = [
//     {
//       name: "carne moída",
//     },
//     {
//       name: "cebola",
//     },
//     {
//       name: "cenoura",
//     },
//     {
//       name: "feijão",
//     },
//     {
//       name: "frango",
//     },
//     {
//       name: "tomate",
//     },
//     {
//       name: "alface",
//     },
//     {
//       name: "batata doce",
//     },
//     {
//       name: "batata inglesa",
//     },
//     {
//       name: "queijo mussarela",
//     },
//     {
//       name: "presunto",
//     },
//     {
//       name: "ovo",
//     },
//     {
//       name: "macarrão",
//     },
//     {
//       name: "molho de tomate",
//     },
//     {
//       name: "azeitona",
//     },
//     {
//       name: "calabresa",
//     },
//     {
//       name: "orégano",
//     },
//     {
//       name: "manjericão",
//     },
//     {
//       name: "pimenta",
//     },
//     {
//       name: "sal",
//     },
//     {
//       name: "pimentão",
//     },
//     {
//       name: "chocolate",
//     },
//     {
//       name: "leite condensado",
//     },
//     {
//       name: "leite",
//     },
//     {
//       name: "farinha de trigo",
//     },
//     {
//       name: "fermento",
//     },
//     {
//       name: "manteiga",
//     },
//     {
//       name: "óleo de soja",
//     },
//     {
//       name: "óleo de girassol",
//     },
//     {
//       name: "chocolate em pó",
//     },
//     {
//       name: "creme de leite",
//     },
//     {
//       name: "damasco",
//     },
//     {
//       name: "ameixa",
//     },
//     {
//       name: "pepino",
//     },
//     {
//       name: "camarão",
//     },
//     {
//       name: "rúcula",
//     },
//     {
//       name: "arroz",
//     },
//     {
//       name: "rabanete",
//     },
//     {
//       name: "pêssego",
//     },
//     {
//       name: "azeite",
//     },
//     {
//       name: "pão naan",
//     },
//     {
//       name: "batata palha",
//     },
//     {
//       name: "batata frita",
//     },
//     {
//       name: "maçã",
//     },
//     {
//       name: "café",
//     },
//     {
//       name: "maracujá",
//     },
//     {
//       name: "chá",
//     },
//     {
//       name: "gelo",
//     },
//     {
//       name: "wiskey",
//     },
//     {
//       name: "vodka",
//     },
//     {
//       name: "rum",
//     },
//     {
//       name: "limão",
//     },
//     {
//       name: "açúcar",
//     },
//     {
//       name: "água com gás",
//     },
//     {
//       name: "água tônica",
//     },
//     {
//       name: "água",
//     },
//     {
//       name: "suco de laranja",
//     },
//     {
//       name: "suco de limão",
//     },
//     {
//       name: "suco de abacaxi",
//     },
//     {
//       name: "suco de maracujá",
//     },
//     {
//       name: "suco de uva",
//     },
//     {
//       name: "suco de morango",
//     },
//     {
//       name: "suco de pêssego",
//     },
//     {
//       name: "suco de maçã",
//     },
//     {
//       name: "suco de tomate",
//     },
//     {
//       name: "suco de cenoura",
//     },
//     {
//       name: "suco de beterraba",
//     },
//     {
//       name: "suco de abacate",
//     },
//     {
//       name: "suco de manga",
//     },
//     {
//       name: "suco de mamão",
//     },
//     {
//       name: "suco de acerola",
//     },
//     {
//       name: "suco de goiaba",
//     },
//     {
//       name: "suco de lima",
//     },
//     {
//       name: "suco de caju",
//     },
//     {
//       name: "suco de graviola",
//     },
//     {
//       name: "suco de tamarindo",
//     },
//     {
//       name: "suco de carambola",
//     },
//     {
//       name: "suco de cupuaçu",
//     },
//     {
//       name: "suco de lichia",
//     },
//     {
//       name: "suco de pitanga",
//     },
//     {
//       name: "suco de framboesa",
//     },
//     {
//       name: "suco de amora",
//     },
//     {
//       name: "suco de açaí",
//     },
//     {
//       name: "suco de melancia",
//     },
//     {
//       name: "mel de abelhas",
//     },
//     {
//       name: "hortelã",
//     },
//     {
//       name: "chá mate",
//     },
//     {
//       name: "chá de hortelã",
//     },
//     {
//       name: "chá de camomila",
//     },
//     {
//       name: "chá de erva doce",
//     },
//     {
//       name: "chá de erva cidreira",
//     },
//     {
//       name: "chá de boldo",
//     },
//     {
//       name: "chá de gengibre",
//     },
//     {
//       name: "canela",
//     },
//     {
//       name: "chá de canela",
//     },
//     {
//       name: "chá de capim cidreira",
//     },
//     {
//       name: "chá de hibisco",
//     },
//     {
//       name: "chá de cavalinha",
//     },
//     {
//       name: "chá de alecrim",
//     },
//     {
//       name: "chá de erva doce",
//     },
//     {
//       name: "chá de erva mate",
//     },
//     {
//       name: "chá de limão",
//     },
//     {
//       name: "chá de laranja",
//     },
//     {
//       name: "chá de maracujá",
//     },
//     {
//       name: "chantilly",
//     },
//   ];

//   const nonexistentIngredients = newIngredients.filter(
//     (ingredient) => !ingredients.find((i) => i.name === ingredient.name),
//   );

//   if (nonexistentIngredients.length > 0) {
//     nonexistentIngredients.forEach(async (ingredient) => {
//       await prisma.ingredient.create({
//         data: {
//           ...ingredient,
//         },
//       });
//     });
//   }
// };

// createIngredients(prisma);

// Criação dos principais pratos
const createDishes = async (prisma: PrismaClient) => {
  const dishes = await prisma.dish.findMany();
  const categories = await prisma.category.findMany();
  // const ingredients = await prisma.ingredient.findMany();
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      cnpj: "99.999.999/0001-99",
    },
  });

  const newDishes = [
    {
      name: "Pizza Grande",
      summary_description: "Pizza Grande",
      full_description: "Pizza Grande",
      price: 52.59,
      category: categories.find((category) => category.name === "Massas"),
      ingredients:
        "carne moída;cebola;tomate;queijo mussarela;presunto;molho de tomate",
      // ingredients: [
      //   ingredients.find((ingredient) => ingredient.name === "carne moída"),
      //   ingredients.find((ingredient) => ingredient.name === "cebola"),
      //   ingredients.find((ingredient) => ingredient.name === "tomate"),
      //   ingredients.find(
      //     (ingredient) => ingredient.name === "queijo mussarela",
      //   ),
      //   ingredients.find((ingredient) => ingredient.name === "presunto"),
      //   ingredients.find((ingredient) => ingredient.name === "molho de tomate"),
      // ],
    },
    {
      name: "Pizza Média",
      summary_description: "Pizza Média",
      full_description: "Pizza Média",
      price: 42.59,
      category: categories.find((category) => category.name === "Massas"),
      ingredients:
        "carne moída;cebola;tomate;queijo mussarela;presunto;molho de tomate",
      // ingredients: [
      //   ingredients.find((ingredient) => ingredient.name === "carne moída"),
      //   ingredients.find((ingredient) => ingredient.name === "cebola"),
      //   ingredients.find((ingredient) => ingredient.name === "tomate"),
      //   ingredients.find(
      //     (ingredient) => ingredient.name === "queijo mussarela",
      //   ),
      //   ingredients.find((ingredient) => ingredient.name === "presunto"),
      //   ingredients.find((ingredient) => ingredient.name === "molho de tomate"),
      // ],
    },
    {
      name: "Pizza Brotinho",
      summary_description: "Pizza Brotinho",
      full_description: "Pizza Brotinho",
      price: 32.59,
      category: categories.find((category) => category.name === "Massas"),
      ingredients:
        "carne moída;cebola;tomate;queijo mussarela;presunto;molho de tomate",
      // ingredients: [
      //   ingredients.find((ingredient) => ingredient.name === "carne moída"),
      //   ingredients.find((ingredient) => ingredient.name === "cebola"),
      //   ingredients.find((ingredient) => ingredient.name === "tomate"),
      //   ingredients.find(
      //     (ingredient) => ingredient.name === "queijo mussarela",
      //   ),
      //   ingredients.find((ingredient) => ingredient.name === "presunto"),
      //   ingredients.find((ingredient) => ingredient.name === "molho de tomate"),
      // ],
    },
    {
      name: "Spaguetti Gambe",
      summary_description: "Spaguetti Gambe",
      full_description: "Spaguetti Gambe",
      price: 34.59,
      category: categories.find((category) => category.name === "Massas"),
      ingredients:
        "camarão;cebola;tomate;queijo mussarela;macarrão;molho de tomate",
      // ingredients: [
      //   ingredients.find((ingredient) => ingredient.name === "camarão"),
      //   ingredients.find((ingredient) => ingredient.name === "cebola"),
      //   ingredients.find((ingredient) => ingredient.name === "tomate"),
      //   ingredients.find(
      //     (ingredient) => ingredient.name === "queijo mussarela",
      //   ),
      //   ingredients.find((ingredient) => ingredient.name === "macarrão"),
      //   ingredients.find((ingredient) => ingredient.name === "molho de tomate"),
      // ],
    },
    {
      name: "Salada Radish",
      summary_description: "Salada Radish",
      full_description: "Salada Radish",
      price: 22.59,
      category: categories.find((category) => category.name === "Entradas"),
      ingredients: "rúcula;cebola;tomate;alface;manteiga;azeite;pepino",
      // ingredients: [
      //   ingredients.find((ingredient) => ingredient.name === "rúcula"),
      //   ingredients.find((ingredient) => ingredient.name === "cebola"),
      //   ingredients.find((ingredient) => ingredient.name === "tomate"),
      //   ingredients.find((ingredient) => ingredient.name === "alface"),
      //   ingredients.find((ingredient) => ingredient.name === "manteiga"),
      //   ingredients.find((ingredient) => ingredient.name === "azeite"),
      // ],
    },
    {
      name: "Salada Ravanello",
      summary_description: "Salada Ravanello",
      full_description: "Salada Ravanello",
      price: 22.59,
      category: categories.find((category) => category.name === "Entradas"),
      ingredients: "rabanete;cebola;tomate;alface;pão naan;azeite;pepino",
      // ingredients: [
      //   ingredients.find((ingredient) => ingredient.name === "rabanete"),
      //   ingredients.find((ingredient) => ingredient.name === "cebola"),
      //   ingredients.find((ingredient) => ingredient.name === "tomate"),
      //   ingredients.find((ingredient) => ingredient.name === "alface"),
      //   ingredients.find((ingredient) => ingredient.name === "pão naan"),
      //   ingredients.find((ingredient) => ingredient.name === "pepino"),
      // ],
    },
    {
      name: "Peachy Pastrie",
      summary_description: "Peachy Pastrie",
      full_description: "Peachy Pastrie",
      price: 52.39,
      category: categories.find(
        (category) => category.name === "Pratos Principais",
      ),
      ingredients: "pêssego;cebola;tomate;alface;batata doce;azeite;pepino",
      // ingredients: [
      //   ingredients.find(
      //     (ingredient) => ingredient.name === "farinha de trigo",
      //   ),
      //   ingredients.find((ingredient) => ingredient.name === "cebola"),
      //   ingredients.find((ingredient) => ingredient.name === "tomate"),
      //   ingredients.find((ingredient) => ingredient.name === "azeite"),
      // ],
    },
    {
      name: "Joelho de Porco",
      summary_description: "Joelho de Porco",
      full_description: "Joelho de Porco",
      price: 42.39,
      category: categories.find(
        (category) => category.name === "Pratos Principais",
      ),
      ingredients: "pêssego;cebola;tomate;alface;batata doce;azeite;pepino",
      // ingredients: [
      //   ingredients.find(
      //     (ingredient) => ingredient.name === "farinha de trigo",
      //   ),
      //   ingredients.find((ingredient) => ingredient.name === "cebola"),
      //   ingredients.find((ingredient) => ingredient.name === "tomate"),
      //   ingredients.find((ingredient) => ingredient.name === "azeite"),
      // ],
    },
    {
      name: "Strogonoff de Frango",
      summary_description: "Strogonoff de Frango com batata palha",
      full_description:
        "Strogonoff de Frango com batata palha e salada de alface e tomate.",
      price: 32.59,
      category: categories.find(
        (category) => category.name === "Pratos Executivos",
      ),
      ingredients: "arroz;cebola;tomate;azeite;batata palha;frango",
      // ingredients: [
      //   ingredients.find((ingredient) => ingredient.name === "arroz"),
      //   ingredients.find((ingredient) => ingredient.name === "cebola"),
      //   ingredients.find((ingredient) => ingredient.name === "tomate"),
      //   ingredients.find((ingredient) => ingredient.name === "azeite"),
      //   ingredients.find((ingredient) => ingredient.name === "batata palha"),
      //   ingredients.find((ingredient) => ingredient.name === "frango"),
      // ],
    },
    {
      name: "Arroz com feijão e bife a cavalo",
      summary_description: "Arroz com feijão, bife a cavalo e batata frita",
      full_description:
        "Arroz com feijão, bife a cavalo e batata frita, acompanhado de salada de alface e tomate.",
      price: 32.59,
      category: categories.find(
        (category) => category.name === "Pratos Executivos",
      ),
      ingredients:
        "arroz;cebola;tomate;azeite;batata frita;feijão;bife a cavalo",
      //
      // ingredients: [
      //   ingredients.find((ingredient) => ingredient.name === "arroz"),
      //   ingredients.find((ingredient) => ingredient.name === "cebola"),
      //   ingredients.find((ingredient) => ingredient.name === "tomate"),
      //   ingredients.find((ingredient) => ingredient.name === "azeite"),
      //   ingredients.find((ingredient) => ingredient.name === "batata frita"),
      //   ingredients.find((ingredient) => ingredient.name === "ovo"),
      // ],
    },
    {
      name: "Apple Moonshine",
      summary_description:
        "Apple Moonshine is made of apple juice, cinnamon, and other natural flavors.",
      full_description:
        "Our legendary family recipe with a velvety smooth finish, crafted with ingredients like freshly squeezed apple juice, cinnamon, and other natural flavors, infused with our house made vodka. The end result is a rich, warm drink reminiscent of an All-American apple pie that grandma would be proud of.",
      price: 25.39,
      category: categories.find((category) => category.name === "Bebidas"),
      ingredients: "maçã;gelo;wisky;hortelã",
      // ingredients: [
      //   ingredients.find((ingredient) => ingredient.name === "maçã"),
      //   ingredients.find((ingredient) => ingredient.name === "gelo"),
      //   ingredients.find((ingredient) => ingredient.name === "wiskey"),
      //   ingredients.find((ingredient) => ingredient.name === "hortelã"),
      // ],
    },
    {
      name: "Café Expresso",
      summary_description: "Café Expresso da máquina",
      full_description:
        "O cafpe expresso foi criado e desenvolvido na Itália desde o início do século XX, mas até a década de 1940 era preparado sob pressão de vapor. Sua invenção é atribuída ao milanês Luigi Bezzera em 1901, mas o termo 'expresso' surgiu por volta de 1946 com a comercialização das máquinas do inventor Achille Gaggia e a popularização deste processo de extração do café.",
      price: 3.9,
      category: categories.find((category) => category.name === "Bebidas"),
      ingredients: "café;vapor;água com gás;chantilly",
      // ingredients: [
      //   ingredients.find((ingredient) => ingredient.name === "café"),
      //   ingredients.find((ingredient) => ingredient.name === "água com gás"),
      //   ingredients.find((ingredient) => ingredient.name === "chantilly"),
      // ],
    },
    {
      name: "Suco de Maracujá",
      summary_description: "Suco de Maracujá feito da polpa da fruta",
      full_description:
        "A fruta possui propriedades antialérgicas, antioxidantes e anti-inflamatórias do maracujá. Os flavonoides do maracujá roxo são particularmente úteis para melhorar os sintomas de asma. O maracujá é uma fonte rica de minerais como o ferro, cobre, magnésio e o fósforo.",
      price: 13.9,
      category: categories.find((category) => category.name === "Bebidas"),
      ingredients: "suco de maracujá;maracujá;açúcar",
      // ingredients: [
      //   ingredients.find(
      //     (ingredient) => ingredient.name === "suco de maracujá",
      //   ),
      //   ingredients.find((ingredient) => ingredient.name === "maracujá"),
      //   ingredients.find((ingredient) => ingredient.name === "açúcar"),
      // ],
    },
    {
      name: "Tè D'autunno",
      summary_description: "Tè D'autunno",
      full_description: "Tè D'autunno",
      price: 19.95,
      category: categories.find((category) => category.name === "Bebidas"),
      ingredients: "chá;açúcar;água;limão",
      // ingredients: [
      //   ingredients.find((ingredient) => ingredient.name === "canela"),
      //   ingredients.find((ingredient) => ingredient.name === "açúcar"),
      //   ingredients.find((ingredient) => ingredient.name === "leite"),
      //   ingredients.find((ingredient) => ingredient.name === "mel de abelhas"),
      // ],
    },
    {
      name: "Pudim",
      summary_description: "Pudim de leite condensado",
      full_description:
        "O pudim de leite condensado contem um leite condensado de alta qualidade, que pode ser utilizado para a comida e a bebida.",
      price: 15,
      category: categories.find((category) => category.name === "Sobremesas"),
      ingredients: "leite;leite;condensado;açúcar",
      // ingredients: [
      //   ingredients.find((ingredient) => ingredient.name === "leite"),
      //   ingredients.find(
      //     (ingredient) => ingredient.name === "leite condensado",
      //   ),
      //   ingredients.find((ingredient) => ingredient.name === "açúcar"),
      // ],
    },
    {
      name: "Bolo de Damasco",
      summary_description: "Bolo de Damasco com creme de leite condensado",
      full_description:
        "Bolo de Damasco é um bolo de leite condensado com creme de leite condensado, que pode ser utilizado para a comida e a bebida.",
      price: 21.5,
      category: categories.find((category) => category.name === "Sobremesas"),
      ingredients: "leite;leite; condensado;açúcar;farinha de trigo;damasco",
      // ingredients: [
      //   ingredients.find((ingredient) => ingredient.name === "leite"),
      //   ingredients.find(
      //     (ingredient) => ingredient.name === "leite condensado",
      //   ),
      //   ingredients.find((ingredient) => ingredient.name === "açúcar"),
      //   ingredients.find(
      //     (ingredient) => ingredient.name === "farinha de trigo",
      //   ),
      //   ingredients.find((ingredient) => ingredient.name === "damasco"),
      // ],
    },
    {
      name: "Macarons",
      summary_description: "Macarons de diversos sabores",
      full_description: "Macarons de diversos sabores.",
      price: 11.89,
      category: categories.find((category) => category.name === "Sobremesas"),
      ingredients: "água;açúcar;aromatizante",
      // ingredients: [
      //   ingredients.find((ingredient) => ingredient.name === "água"),
      //   ingredients.find((ingredient) => ingredient.name === "açúcar"),
      // ],
    },
    {
      name: "Prugna Pie",
      summary_description: "Prugna Pie",
      full_description: "Prugna Pie",
      price: 14.89,
      category: categories.find((category) => category.name === "Sobremesas"),
      ingredients: "água;açúcar;ameixa;leite",
      // ingredients: [
      //   ingredients.find((ingredient) => ingredient.name === "ameixa"),
      //   ingredients.find((ingredient) => ingredient.name === "açúcar"),
      //   ingredients.find((ingredient) => ingredient.name === "leite"),
      // ],
    },
  ];

  const nonexistentDishes = newDishes.filter(
    (dish) => !dishes.find((d) => d.name === dish.name),
  );

  if (nonexistentDishes.length > 0 && restaurant) {
    nonexistentDishes.forEach(async (dish) => {
      await prisma.dish.create({
        data: {
          name: dish.name,
          summary_description: dish.summary_description,
          full_description: dish.full_description,
          price: dish.price,
          restaurantId: restaurant.id,
          categories: {
            create: {
              category: {
                connect: {
                  id: dish.category && dish.category.id,
                },
              },
            },
          },
          ingredients: dish.ingredients,
          // Other than SQLite
          // ingredients: {
          //   create: dish.ingredients.map((ingredient: any) => ({
          //     ingredient: {
          //       connect: {
          //         id: ingredient.id,
          //       },
          //     },
          //   })),
          // },
        },
      });
    });
  }
};

createDishes(prisma);

//Create favorite dishes for admin user
const createFavoriteDishes = async (prisma: PrismaClient) => {
  const user = await prisma.user.findFirst({
    where: {
      email: "admin@email.com",
    },
  });
  const dishes = await prisma.dish.findMany();

  if (dishes.length > 0) {
    const favoriteDishes = [
      dishes.find((d) => d.name === "Café Expresso"),
      dishes.find((d) => d.name === "Joelho de Porco"),
      dishes.find((d) => d.name === "Salada Ravanello"),
    ];

    if (user && favoriteDishes.length > 0) {
      favoriteDishes.forEach(async (dish: any) => {
        await prisma.userFavoriteDishes.create({
          data: {
            dishId: dish.id,
            userId: user.id,
          },
        });
      });
    }
  }
};

createFavoriteDishes(prisma);
