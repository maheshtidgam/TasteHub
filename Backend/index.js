import express from "express";
import cors from "cors";
import { testConnection } from "./postgres/postereg.js";
import connectCloudinary from "./postgres/cloudinary.js";
import routes from "./routes/index.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "TasteHub API is running" });
});

app.use("/api", routes);

// Only run DB sync and listen when running locally (not on Vercel)
if (process.env.NODE_ENV !== "production") {
  testConnection();
  connectCloudinary();
  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
}

export default app;
