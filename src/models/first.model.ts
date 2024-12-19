import { model, Schema } from "mongoose";
import { IFirstQ } from "../types/interfaces";

export const firstQSchema = new Schema<IFirstQ>({
  attackType: {
    type: String,
    required: true,
  },
  numCasualties: {
    type: Number,
    default: 0,
  },
});

export const firstModel = model("first", firstQSchema);
