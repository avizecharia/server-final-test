import mongoose, { model, Schema } from "mongoose";
import { IFourth } from "../types/interfaces";
import { orgaAndLocateModel } from "./orgaAndLocate.model";

export const fourthSchema = new Schema<IFourth>({
  region: {
    type: String,
    required: true,
  },
  organizeTopFive: [
    {
      type: mongoose.Types.ObjectId,
      ref: "orgaAndLocate",
    },
  ],
});

export const fourthModel = model("fourth", fourthSchema);
