import express from "express";
import { UserRouter } from "./router/user";
import cors from "cors";
import { zapRouter } from "./router/zap";

const app  = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/zap", zapRouter);
