import { model, Schema } from "mongoose";
import { IAttackFull } from "../types/interfaces";

export const attackFullSchema = new Schema<IAttackFull>({
  eventid: {
    type: Number,
  },
  iyear: {
    type: Number,
    default: 0,
  },
  imonth: {
    type: Number,
    default: 0,
  },
  iday: {
    type: Number,
    default: 0,
  },
  country_txt: {
    type: String,
  },
  region_txt: {
    type: String,
  },
  city: {
    type: String,
  },
  latitude: {
    type: Number,
    default: 0,
  },
  longitude: {
    type: Number,
    default: 0,
  },
  attacktype1_txt: {
    type: String,
  },
  targtype1_txt: {
    type: String,
  },
  target1: {
    type: String,
  },
  gname: {
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
    default: 0,
  },
});
export const attackFullModel = model("attackFull", attackFullSchema);
