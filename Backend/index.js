import express from "express";
import cors from "cors";
import { testConnection } from "./postgres/postereg.js";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

// Only run DB sync and listen when running locally (not on Vercel)
if (process.env.NODE_ENV !== "production") {
  testConnection();
  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
}

export default app;
