import { model, Schema } from "mongoose";
import { IThird } from "../types/interfaces";

export const thirdSchema = new Schema<IThird>({
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    default: 0,
  },
  numEvent: {
    type: Number,
    default: 0,
  },
});

export const thirdModel = model("third", thirdSchema);
