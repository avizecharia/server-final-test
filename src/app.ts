import express, { Request, Response } from "express";
import "dotenv/config";
import { connentToMongo } from "./config/db";
import analysisRoute from "./routes/analysis.route";
import relationshipsRoute from "./routes/relationships.route";

connentToMongo();
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/analysis", analysisRoute);
app.use("/api/relationships", relationshipsRoute);

app.listen(PORT, () => {
  console.log(`server is runnig on port http://localhost:${PORT}`);
});
