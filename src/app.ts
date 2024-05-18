import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import morgan from "morgan";
import { authRouter } from "./modules/auth";
import { productTypeRoute } from "./modules/productType";

dotenv.config();

export const app = express();

app.use(cors());
// app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/product-type", productTypeRoute);



