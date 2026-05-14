import { Sequelize } from "sequelize";
import createUserModel from "../models/userSchema.js";

const sequelize = new Sequelize("table-booking", "postgres", "mahesh@123", {
  host: "localhost",
  dialect: "postgres",
});

const User = createUserModel(sequelize);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
export { sequelize, testConnection, User };
