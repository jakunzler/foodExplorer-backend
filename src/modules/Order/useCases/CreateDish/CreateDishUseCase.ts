import { IDishRepository } from "../../repositories/interfaces/IDishRepository";
// import { IIngredientRepository } from "../../repositories/interfaces/IIngredientRepository";
import { CreateDishDTO } from "./CreateDishDTO";

export default class CreateDishUseCase {
  private dishRepository: IDishRepository;
  // private ingredientRepository: IIngredientRepository;

  constructor(
    dishRepository: IDishRepository,
    // ingredientRepository: IIngredientRepository,
  ) {
    this.dishRepository = dishRepository;
    // this.ingredientRepository = ingredientRepository;
  }

  async execute({
    name,
    status,
    category,
    ingredients,
    summary_description,
    full_description,
    price,
    restaurantId,
  }: CreateDishDTO) {
    if (
      name === undefined ||
      category === undefined ||
      price === undefined ||
      restaurantId === undefined
    ) {
      throw new Error("Há campos obrigatórios ausentes.");
    }

    if (category === "Selecione uma categoria") {
      throw new Error("A categoria é obrigatória.");
    }

    let registeredDishes = await this.dishRepository.getAllDishes();
    // let registeredIngredients =
    //   await this.ingredientRepository.getAllIngredients();

    // const nonexistentIngredients =
    //   ingredients &&
    //   ingredients.filter(
    //     (ingredient) =>
    //       registeredIngredients &&
    //       !registeredIngredients.find((i) => i.name === ingredient),
    //   );

    // if (nonexistentIngredients && nonexistentIngredients.length > 0) {
    //   nonexistentIngredients.forEach(async (ingredient) => {
    //     await this.ingredientRepository
    //       .create({
    //         name: ingredient,
    //       })
    //       .then((ingredient) => {
    //         registeredIngredients?.push(ingredient);
    //       });
    //   });
    // }

    const existentDish = registeredDishes?.find((d) => d.name === name);

    if (!existentDish) {
      const newDishName = name;
      const newDishStatus = status !== "AVAILABLE" ? undefined : status;
      const newDishCategory = category;
      const newDishIngredients = ingredients;
      const newDishSummaryDescription = summary_description;
      const newDishFullDescription = full_description;
      const newDishPrice = price && Number(price);
      const newDishRestaurantId = restaurantId;
      // const newDishIngredients = registeredIngredients?.filter(
      //   (ingredient) => ingredientsNames?.find((i) => i === ingredient.name),
      // );

      return this.dishRepository.create({
        name: newDishName || "Não há",
        status: newDishStatus || "UNAVAILABLE",
        category: newDishCategory,
        ingredients: newDishIngredients,
        // registeredIngredients?.filter(
        //   (ingredient) =>
        //     ingredientsNames &&
        //     ingredientsNames.find((i) => i === ingredient.name),
        // ) || [],
        summary_description:
          newDishSummaryDescription || "Não há descrição resumida",
        full_description: newDishFullDescription || "Não há descrição completa",
        price: newDishPrice || 0,
        restaurantId: newDishRestaurantId,
      });
    } else {
      throw new Error("Prato já existe.");
    }
  }
}
