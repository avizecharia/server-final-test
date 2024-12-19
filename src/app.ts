import express, { Request, Response } from "express";
import "dotenv/config";
import { connentToMongo } from "./config/db";
import analysisRoute from "./routes/analysis.route";
import relationshipsRoute from "./routes/relationships.route";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { handelConnection } from "./soket/io";

connentToMongo();

const app = express();

export const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

app.use(cors());
app.use("/api/analysis", analysisRoute);
app.use("/api/relationships", relationshipsRoute);

io.on("connection", handelConnection);

app.listen(PORT, () => {
  console.log(`server is runnig on port http://localhost:${PORT}`);
});
