import { model, Schema } from "mongoose"
import { IFifth } from "../types/interfaces"



export const fifthSchema = new Schema<IFifth>({
    organizationName: {
        type: String,
        required: true
    },
    numEnent: {
        type: Number,
        default:0
    } 
})


export const fifthModel = model('fifth', fifthSchema)