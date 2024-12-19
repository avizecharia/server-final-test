import { model, Schema } from "mongoose";
import { ISixth } from "../types/interfaces";

export const sixthSchema = new Schema<ISixth>({
  organName: {
    type: String,
    required: true,
  },
  numCasualties: {
    type: Number,
    default: 0,
  },
  region: {
    type: String,
  },
});

export const sixthModel = model("sixth", sixthSchema);
