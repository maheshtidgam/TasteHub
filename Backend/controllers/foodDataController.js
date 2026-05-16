import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";
import createFoodDataModel from "../models/foodSchema.js";
import { sequelize } from "../postgres/postereg.js";

const foodData = createFoodDataModel(sequelize);
const addfoodData = async (req, res) => {
  try {
    const { name, description, category, price, discount, bestSeller } =
      req.body;
    const image1 = req.files["image1"] && req.files["image1"][0];
    const image2 = req.files["image2"] && req.files["image2"][0];
    const image3 = req.files["image3"] && req.files["image3"][0];

    const images = [image1, image2, image3].filter(
      (item) => item !== undefined,
    );
    let imageUrls = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "food_images",
        });
        return { secure_url: result.secure_url, public_id: result.public_id };
      }),
    );

    const foodData = createFoodDataModel(sequelize);
    const newFoodData = await foodData.create({
      name,
      description,
      category,
      price,
      discount,
      bestSeller,
      imageUrls,
    });
    res.status(201).json(newFoodData, {
      message: "Food data added successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error uploading image", error: error.message });
  } finally {
    // Clean up uploaded files
    if (req.files) {
      Object.values(req.files)
        .flat()
        .forEach((file) => {
          fs.unlink(file.path, (err) => {
            if (err) console.error("Error deleting file:", err);
          });
        });
    }
  }
};

const getFoodDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const foodItem = await foodData.findByPk(id);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json(foodItem, {
      message: "Food item fetched successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error fetching food item:", error);
    res
      .status(500)
      .json({ message: "Error fetching food item", error: error.message });
  }
};

const getFoodData = async (req, res) => {
  try {
    const allFoodData = await foodData.findAll();
    res.status(200).json(allFoodData, {
      message: "Food data fetched successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error fetching food data:", error);
    res
      .status(500)
      .json({ message: "Error fetching food data", error: error.message });
  }
};

export const uploadController = {
  addfoodData,
  getFoodData,
};
