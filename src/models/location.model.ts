import { model, Schema } from "mongoose"
import { ILocation } from "../types/interfaces"

export const locationSchema = new Schema<ILocation>({
    lat:{
        type:Number,
        default:0
    },
    lon:{
        type:Number,
        required:true
    }
})
   


export const locationModel = model('location', locationSchema)