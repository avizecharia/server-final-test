import { connect } from "mongoose";

export const connentToMongo = async () => {
  try {
    await connect(process.env.DB_URI || "mongodb://localhost:27017/terrorism");
    console.log("[database] mongo successfully connected");
  } catch (err) {
    console.error(err);
  }
};
