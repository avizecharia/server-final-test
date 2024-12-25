import { Socket } from "socket.io";
import {
  allLocations,
  getFifthByOarg,
  getFifthByYear,
  getForthAll,
  getForthArea,
  getSixthArea,
  searchText,
} from "../services/relationships.service";
import {
  getFirst,
  getSecAll,
  getSecCity,
  getSecContry,
  getSecRegion,
  getThirdAll,
  getThirdBy10Year,
  getThirdBy5Year,
  getThirdByYear,
  getThirdByYearRange,
} from "../services/analysis.service";
import { IAttack } from "../types/interfaces";
import {
  createAttack,
  delAttack,
  updateAttack,
} from "../services/crud.service";
import { io } from "../app";

export const handelConnection = async (client: Socket) => {
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

  client.on("delete-event", async (event: IAttack) => {
    await delAttack(event);
    io.emit("read-event");
  });

  client.on("getFirst", async () => {
    client.emit("getFirst", await getFirst());
  });

  client.on("getSecData", async () => {
    io.emit("getSecData", await getSecAll());
  });

  client.on("getsec_3", async (city: string) => {
    client.emit("getsec_3", await getSecCity(city));
  });

  client.on("getsec_2", async (country: string) => {
    client.emit("getsec_2", await getSecContry(country));
  });

  client.on("getsec_1", async (region: string) => {
    client.emit("getsec_1", await getSecRegion(region));
  });

  client.on("all-trend", async () => {
    client.emit("all-trend", await getThirdAll());
  });

  client.on("year-trend", async (year: string) => {
    client.emit("year-trend", await getThirdByYear(year));
  });

  client.on("year-range-trend", async (yearStart: string, yearEnd: string) => {
    client.emit(
      "year-range-trend",
      await getThirdByYearRange(yearStart, yearEnd)
    );
    console.log(await getThirdByYearRange(yearStart, yearEnd));
  });

  client.on("5year-trend", async () => {
    client.emit("5year-trend", await getThirdBy5Year());
  });

  client.on("10year-trend", async () => {
    client.emit("10year-trend", await getThirdBy10Year());
  });

  client.on("all-region-topFive", async () => {
    console.log("2");
    client.emit("all-region-topFive", await getForthAll());
  });

  client.on("region-topFive", async (region: string) => {
    console.log("object");
    client.emit("region-topFive", await getForthArea(region));
  });

  client.on("events-year", async (year: number) => {
    client.emit("events-year", await getFifthByYear(year));
  });

  client.on("org-event", async (org: string) => {
    client.emit("org-event", await getFifthByOarg(org));
  });

  client.on("org-most-events-area", async (org: string) => {
    client.emit("org-most-events-area", await getSixthArea(org));
  });
  client.on("search", async (query: string) => {
    
    client.emit("search", await searchText(query));
  });
};
