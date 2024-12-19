import { fifthModel } from "../models/fifth.model";
import { fourthModel } from "../models/fourth";
import { orgaAndLocateModel } from "../models/orgaAndLocate.model";
import { sixthModel } from "../models/sixth.model";
import { ISixth } from "../types/interfaces";

export const getFifthByYear = async (myYear: number) => {
  try {
    return await fifthModel.find({ year: myYear }).sort({ numEvent: -1 });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getFifthByOarg = async (oarg: string) => {
  try {
    return await fifthModel.find({ organizationName: oarg });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getFifthAll = async () => {
  try {
    return await fifthModel.find();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getForthAll = async () => {
  try {
    const result = await orgaAndLocateModel.find({}).sort({ numEvent: -1 });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getForthArea = async (reg: string) => {
  try {
    const result = await fourthModel
      .findOne({ region: reg })
      .populate("organizeTopFive");
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMax = async (arr: ISixth[]) => {
  const list: ISixth[] = [];
  for (const element of arr) {
    const reg = await sixthModel
      .find({ region: element.region })
      .sort({ numCasualties: -1 });
    if (element.numCasualties >= reg[0].numCasualties) {
      list.push(element);
    }
  }
  return list;
};

export const getSixthArea = async (oarg: string) => {
  try {
    const result = await sixthModel.find({ organName: oarg });
    return getMax(result);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
