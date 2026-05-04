import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createAndEditShop } from "../controllers/shop.controller.js";
import { isAuth } from "../middlewares/isAuth.middleware.js";

const shopRouter = express.Router();

shopRouter.post("/create-edit", isAuth, createAndEditShop);

export default shopRouter;
