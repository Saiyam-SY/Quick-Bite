import express from "express";
import { createAndEditShop } from "../controllers/shop.controller.js";
import { isAuth } from "../middlewares/isAuth.middleware.js";
import { addItem, editItem } from "../controllers/item.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const itemRouter = express.Router();

itemRouter.post("/add", isAuth, upload.single("image"), addItem);
itemRouter.post("/edit/:itemId", isAuth, upload.single("image"), editItem);

export default itemRouter;
