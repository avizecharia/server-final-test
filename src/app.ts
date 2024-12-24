import express from "express";
import "dotenv/config";
import { connentToMongo } from "./config/db";
import analysisRoute from "./routes/analysis.route";
import relationshipsRoute from "./routes/relationships.route";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { handelConnection } from "./soket/io";
import { json } from "stream/consumers";

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
app.use(express.json())
app.use("/api/analysis", analysisRoute);
app.use("/api/relationships", relationshipsRoute);
io.on("connection", handelConnection);

server.listen(PORT, () => {
  console.log(`server is runnig on port http://localhost:${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`server is runnig on port http://localhost:${PORT}`);
// });
