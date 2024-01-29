import CreateUserFavoriteDishes from "../modules/User/useCases/CreateUserFavoriteDishes";
import GetUserFavoriteDishes from "../modules/User/useCases/GetUserFavoriteDishes";
import UpdateUserFavoriteDishes from "../modules/User/useCases/UpdateUserFavoriteDishes";
import UpdateOrCreateUserFavoriteDishes from "../modules/User/useCases/UpdateOrCreateUserFavoriteDishes";
import DeleteUserFavoriteDishes from "../modules/User/useCases/DeleteUserFavoriteDishes";
import { Router } from "express";
import passport from "passport";

const userFavoriteDishesRouter = Router({ mergeParams: true });

userFavoriteDishesRouter.post("/", async (request, response, next) => {
  try {
    const { createUserFavoriteDishesController } =
      await CreateUserFavoriteDishes();
    return createUserFavoriteDishesController.handle(request, response, next);
  } catch (error) {
    return response.status(400).json({ message: "Erro ao criar favorito" });
  }
});

userFavoriteDishesRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { getUserFavoriteDishesController } = await GetUserFavoriteDishes();
      return getUserFavoriteDishesController.handle(request, response, next);
    } catch (error) {
      return response.status(400).json({ message: "Erro ao buscar favoritos" });
    }
  },
);

userFavoriteDishesRouter.put(
  "/:favoriteId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { updateUserFavoriteDishesController } =
        await UpdateUserFavoriteDishes();
      return updateUserFavoriteDishesController.handle(request, response, next);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Erro ao atualizar favorito." });
    }
  },
);

userFavoriteDishesRouter.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { updateOrCreateUserFavoriteDishesController } =
        await UpdateOrCreateUserFavoriteDishes();
      return updateOrCreateUserFavoriteDishesController.handle(
        request,
        response,
        next,
      );
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Erro ao atualizar favorito." });
    }
  },
);

userFavoriteDishesRouter.delete(
  "/:favoriteId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { deleteUserFavoriteDishesController } =
        await DeleteUserFavoriteDishes();
      return deleteUserFavoriteDishesController.handle(request, response, next);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao deletar favorito." });
    }
  },
);

export default userFavoriteDishesRouter;
