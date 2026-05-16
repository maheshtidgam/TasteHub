import { DataTypes } from "sequelize";

const createFoodDataModel = (sequelize) => {
  const FoodData = sequelize.define("FoodData", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    bestSeller: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    imageUrls: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  });

  return FoodData;
};

export default createFoodDataModel;
