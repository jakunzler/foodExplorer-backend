import CreateUserRestaurant from "../modules/Order/useCases/CreateUserRestaurant";
import GetUserRestaurant from "../modules/Order/useCases/GetUserRestaurant";
import UpdateUserRestaurant from "../modules/Order/useCases/UpdateUserRestaurant";
import DeleteUserRestaurant from "../modules/Order/useCases/DeleteUserRestaurant";
import { Router } from "express";
import passport from "passport";

const userRestaurantRouter = Router({ mergeParams: true });

userRestaurantRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { createUserRestaurantController } = await CreateUserRestaurant();
      return createUserRestaurantController.handle(request, response, next);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Erro ao criar empresa de usuário" });
    }
  },
);

userRestaurantRouter.get(
  "/:userRestaurantId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { getUserRestaurantController } = await GetUserRestaurant();
      return getUserRestaurantController.handle(request, response, next);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Erro ao buscar empresa de usuário" });
    }
  },
);

userRestaurantRouter.put(
  "/:userRestaurantId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { updateUserRestaurantController } = await UpdateUserRestaurant();
      return updateUserRestaurantController.handle(request, response, next);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Erro ao atualizar empresa de usuário." });
    }
  },
);

userRestaurantRouter.delete(
  "/:userRestaurantId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { deleteUserRestaurantController } = await DeleteUserRestaurant();
      return deleteUserRestaurantController.handle(request, response, next);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Erro ao deletar empresa de usuário." });
    }
  },
);

export default userRestaurantRouter;
