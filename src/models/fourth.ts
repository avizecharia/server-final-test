import { model, Schema } from "mongoose"
import { IFourth } from "../types/interfaces"
import { orgaAndLocateModel } from "./orgaAndLocate.model"



export const fourthSchema = new Schema<IFourth>({
    region: {
        type: String,
        required: true
    },
    organizeTopFive: [{
        type: orgaAndLocateModel,
        maxlength:5
    } ]
})


export const fourthModel = model('fourth', fourthSchema)