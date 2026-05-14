import express from "express";
import jwt from "jsonwebtoken";
import { testConnection } from "./postgres/postereg.js";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());

app.use("/api", routes)
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
testConnection();
