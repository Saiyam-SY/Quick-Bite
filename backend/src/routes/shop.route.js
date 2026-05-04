import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createAndEditShop,
  getMyShop,
} from "../controllers/shop.controller.js";
import { isAuth } from "../middlewares/isAuth.middleware.js";

const shopRouter = express.Router();

shopRouter.post(
  "/create-edit",
  isAuth,
  upload.single("image"),
  createAndEditShop,
);
shopRouter.get("/get-my", isAuth, getMyShop);

export default shopRouter;
