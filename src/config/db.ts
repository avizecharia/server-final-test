import { connect } from "mongoose";

export const connentToMongo = async () => {
  try {
    await connect(process.env.DB_URI  || '//mongo:mongo@cluster0.hd5dg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log("[database] mongo successfully connected");
  } catch (err) {
    console.error(err);
  }
};
