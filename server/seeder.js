import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import sneakers from "./data/sneakers.js";
import User from "./models/userModel.js";
import Sneaker from "./models/sneakerModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Sneaker.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;
    const sampleSneakers = sneakers.map((sneaker) => {
      return { ...sneaker, user: adminUser };
    });

    await Sneaker.insertMany(sampleSneakers);

    console.log("Data Imported!");
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Sneaker.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

if (process.argv[2] == "-d") {
  destroyData();
} else {
  importData();
}
