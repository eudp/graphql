import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    const mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDb");
  } catch (error) {
    console.error(error);
  }
};
