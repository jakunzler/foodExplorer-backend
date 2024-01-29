import { uploadConfig } from "../config/upload";
import multer from "multer";

import CreateDish from "../modules/Order/useCases/CreateDish";
import GetDishes from "../modules/Order/useCases/GetDishes";
import UpdateDish from "../modules/Order/useCases/UpdateDish";
import UpdateDishImage from "../modules/Order/useCases/UpdateDishImage";
import DeleteDish from "../modules/Order/useCases/DeleteDish";
import { Router } from "express";
import passport from "passport";

const dishRouter = Router({ mergeParams: true });
const upload = multer(uploadConfig.MULTER);

dishRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { createDishController } = await CreateDish();
      return createDishController.handle(request, response, next);
    } catch (error) {
      return response.status(400).json({ message: "Erro ao criar prato" });
    }
  },
);

dishRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { getDishesController } = await GetDishes();
      return getDishesController.handle(request, response, next);
    } catch (error) {
      return response.status(400).json({ message: "Erro ao buscar prato" });
    }
  },
);

dishRouter.put(
  "/:dishId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { updateDishController } = await UpdateDish();
      return updateDishController.handle(request, response, next);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao atualizar prato." });
    }
  },
);

dishRouter.patch(
  "/dish_image/:dishId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  async (request, response, next) => {
    try {
      const { updateDishImageController } = await UpdateDishImage();
      return updateDishImageController.handle(request, response, next);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao atualizar imagem." });
    }
  },
);

dishRouter.delete(
  "/:dishId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { deleteDishController } = await DeleteDish();
      return deleteDishController.handle(request, response, next);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao deletar prato." });
    }
  },
);

export default dishRouter;
