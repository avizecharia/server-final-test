import { model, Schema } from "mongoose";
import { IAttackFull, IAttackFull1 } from "../types/interfaces";

export const attackFullSchema = new Schema<IAttackFull1>({
  eventid: {
    type: Number,
  },
  year: {
    type: Number,
    default: 0,
  },
  month: {
    type: Number,
    default: 0,
  },
  iday: {
    type: Number,
    default: 0,
  },
  country: {
    type: String,
  },
  region: {
    type: String,
  },
  city: {
    type: String,
  },
  lat: {
    type: Number,
    default: 0,
  },
  lon: {
    type: Number,
    default: 0,
  },
  attackType: {
    type: String,
  },
  targtype1_txt: {
    type: String,
  },
  target1: {
    type: String,
  },
  organName: {
    type: String,
  },
  weaptype1_txt: {
    type: String,
  },
  nkill: {
    type: Number,
  },
  nwound: {
    type: Number,
  },
  nperps: {
    type: Number,
  },
  summary: {
    type: String,
  },
});
export const attackFullModel = model("attackFull", attackFullSchema);
