import express, { Request, Response } from "express";
import "dotenv/config";
import { connentToMongo } from "./config/db";
import {
  ceedSchema1,
  ceedSchema1Attack2,
  ceedSchema2,
  ceedSchema3,
} from "./services/sid.service";

connentToMongo();
const app = express();

const PORT = process.env.PORT || 3000;

// app.use('/api', async (req:Request , res:Response) => {
//     console.log("heerer")
// })
//ceedSchema1()
// ceedSchema1Attack2()
ceedSchema2();
//ceedSchema3()
app.use("api/analysis", () => {});
app.use("api/relationships", () => {});

app.listen(PORT, () => {
  console.log(`server is runnig on port http://localhost:${PORT}`);
});
