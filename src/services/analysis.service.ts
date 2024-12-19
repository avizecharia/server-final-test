import { firstModel } from "../models/first.model"
import { IFirstQ } from "../types/interfaces";


export const getFirst = async () => {
    try {
          const result : IFirstQ[] = await firstModel.find()
          const res = result
    .map((item, index) => ({ index, item }))
    .sort((a, b) => {
        const aRank = a.item.numCasualties !== undefined ? a.item.numCasualties : Infinity;
        const bRank = b.item.numCasualties !== undefined ? b.item.numCasualties : Infinity;
        return aRank - bRank || a.index - b.index;
    })
    .map(entry => entry.item);
    console.log(res);
    return res 
    } catch (err) {
        console.error(err);
    throw err;
    }
}
export const getSec = async () => {
    try {
        return 
    } catch (error) {
        console.error(err);
        throw err;
    }
}