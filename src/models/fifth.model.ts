import { model, Schema } from "mongoose";
import { IFifth } from "../types/interfaces";

export const fifthSchema = new Schema<IFifth>({
  organizationName: {
    type: String,
    required: true,
  },
  numEvent: {
    type: Number,
    default: 0,
  },
  year: {
    type: Number,
    required: true,
  },
});

export const fifthModel = model("fifth", fifthSchema);
