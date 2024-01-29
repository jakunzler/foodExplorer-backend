import { Dish } from "@prisma/client";
import { IDishRepository } from "../../repositories/interfaces/IDishRepository";
// import { IIngredientRepository } from "../../repositories/interfaces/IIngredientRepository";
// import { IDishIngredientRepository } from "../../repositories/interfaces/IDishIngredientRepository";
import ValidationException from "../../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../../exceptions";

export default class UpdateDishUseCase {
  private dishRepository: IDishRepository;
  // private ingredientRepository: IIngredientRepository;
  // private dishIngredientRepository: IDishIngredientRepository;

  constructor(
    dishRepository: IDishRepository,
    // ingredientRepository: IIngredientRepository,
    // dishIngredientRepository: IDishIngredientRepository,
  ) {
    this.dishRepository = dishRepository;
    // this.ingredientRepository = ingredientRepository;
    // this.dishIngredientRepository = dishIngredientRepository;
  }

  async execute(dishId: string, updatedDishData: Partial<Dish>) {
    const existingDish = await this.dishRepository.getById(dishId);

    if (!existingDish) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Prato não encontrado.`,
        },
        404,
      );
    }

    // if (category === "Selecione uma categoria") {
    //   throw new Error("A categoria é obrigatória.");
    // }

    // let registeredIngredients =
    //   await this.ingredientRepository.getAllIngredients();
    // let registeredDishes = await this.dishRepository.getAllDishes();

    // const nonexistentIngredients =
    //   ingredientsNames &&
    //   ingredientsNames.filter(
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

    const newDishName = updatedDishData.name;
    const newDishStatus =
      updatedDishData.status !== "AVAILABLE"
        ? undefined
        : updatedDishData.status;
    // const newDishCategory = updatedDishData.category;
    const newDishIngredients = updatedDishData.ingredients;
    const newDishSummaryDescription = updatedDishData.summary_description;
    const newDishFullDescription = updatedDishData.full_description;
    const newDishPrice = updatedDishData.price && Number(updatedDishData.price);
    const newIsActive = updatedDishData.isActive;
    const newDishImage = updatedDishData.image;

    // const previousDishIngredients =
    //   await this.dishIngredientRepository.getByDishId(dishId);
    // console.log(previousDishIngredients);

    // if (previousDishIngredients.length > 0) {
    //   previousDishIngredients.map((dishIngredient) => {
    //     setTimeout(async () => {
    //       await this.dishIngredientRepository.delete(dishIngredient.id);
    //     }, 500);
    //   });
    // }

    const updatedDish = await this.dishRepository.update(dishId, {
      name: newDishName,
      status: newDishStatus,
      ingredients: newDishIngredients,
      summary_description: newDishSummaryDescription,
      full_description: newDishFullDescription,
      price: newDishPrice,
      isActive: newIsActive,
      image: newDishImage,
    });

    return updatedDish;
  }
}
