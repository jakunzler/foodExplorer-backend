import CreateRestaurant from "../modules/Order/useCases/CreateRestaurant";
import GetRestaurant from "../modules/Order/useCases/GetRestaurant";
import GetRestaurants from "../modules/Order/useCases/GetRestaurants";
import UpdateRestaurant from "../modules/Order/useCases/UpdateRestaurant";
import DeleteRestaurant from "../modules/Order/useCases/DeleteRestaurant";
import { Router } from "express";
import passport from "passport";

const restaurantRouter = Router({ mergeParams: true });

restaurantRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { createRestaurantController } = await CreateRestaurant();
      return createRestaurantController.handle(request, response, next);
    } catch (error) {
      return response.status(400).json({ message: "Erro ao criar Restaurant" });
    }
  },
);

restaurantRouter.get(
  "/:RestaurantId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { getRestaurantController } = await GetRestaurant();
      return getRestaurantController.handle(request, response, next);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Erro ao buscar Restaurant" });
    }
  },
);

restaurantRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { getRestaurantsController } = await GetRestaurants();
      return getRestaurantsController.handle(request, response, next);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Erro ao buscar categorias" });
    }
  },
);

restaurantRouter.put(
  "/:RestaurantId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { updateRestaurantController } = await UpdateRestaurant();
      return updateRestaurantController.handle(request, response, next);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Erro ao atualizar Restaurant." });
    }
  },
);

restaurantRouter.delete(
  "/:RestaurantId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { deleteRestaurantController } = await DeleteRestaurant();
      return deleteRestaurantController.handle(request, response, next);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Erro ao deletar Restaurant." });
    }
  },
);

export default restaurantRouter;
