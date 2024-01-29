import { Router } from "express";
import userRouter from "./user.routes";
import phoneRouter from "./phone.routes";
import dishRouter from "./dish.routes";
import orderRouter from "./order.routes";
import UserFavoriteDishesRouter from "./userFavorite.routes";
import userRestaurantRouter from "./userRestaurant.routes";
import restaurantRouter from "./restaurant.routes";
import addressRouter from "./address.routes";
import categoryRouter from "./category.routes";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/phone", phoneRouter);
routes.use("/dish", dishRouter);
routes.use("/order", orderRouter);
routes.use("/favorite", UserFavoriteDishesRouter);
routes.use("/user_restaurant", userRestaurantRouter);
routes.use("/restaurant", restaurantRouter);
routes.use("/address", addressRouter);
routes.use("/category", categoryRouter);

export default routes;
