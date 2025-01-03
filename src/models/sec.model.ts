import mongoose, { model, Schema } from "mongoose";
import { secQ } from "../types/interfaces";
import { locationModel } from "./location.model";

export const secSchema = new Schema<secQ>({
  region: {
    type: String,
    required: true,
  },
  numCasualties: {
    type: Number,
    default: 0,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  locationArr: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "location",
    },
  ],
});

export const secModel = model("sec", secSchema);
