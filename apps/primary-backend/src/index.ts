import express from "express";
import { UserRouter } from "./router/user";
import cors from "cors";
import { listen } from "bun";
import { zapRouter } from "./router/zap";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
    });

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/zap", zapRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
