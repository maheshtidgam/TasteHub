import { Sequelize } from "sequelize";
import "pg";
import createUserModel from "../models/userSchema.js";
import createFoodDataModel from "../models/foodSchema.js";
import "dotenv/config";

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
);

const User = createUserModel(sequelize);
const FoodData = createFoodDataModel(sequelize);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await FoodData.sync({ force: true }); // TODO: Remove this line after first successful restart
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
export { sequelize, testConnection, User, FoodData };
