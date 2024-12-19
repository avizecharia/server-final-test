import { Socket } from "socket.io";

import { IAttack } from "../types/interfaces";
import { createAttack, updateAttack } from "../services/crud.service";
import { getFirst } from "../services/analysis.service";
import { io } from "../app";

export const handelConnection = async (client: Socket) => {
  //when client connect he will get: 1)kind of attacks and their damage
  client.emit("kind-attacks", await getFirst());

  //when client create event all clients will get data back
  client.on("post-event", async (event: IAttack) => {
    await createAttack(event);
    io.emit("read-event");
  });

  //when client update event all cliets will get data back
  client.on("update-event", async (event: IAttack) => {
    await updateAttack(event);
    io.emit("read-event");
  });
};
