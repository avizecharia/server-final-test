import { attackFullModel } from "../models/attack.model";
import { fifthModel } from "../models/fifth.model";
import { fourthModel } from "../models/fourth";
import { locationModel } from "../models/location.model";
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
    const result = await fourthModel
      .find({})
      .sort({ numEvent: -1 })
      .populate("organizeTopFive");
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getForthArea = async (reg: string) => {
  try {
    const result = await fourthModel
      .findOne({ region: reg })
      .populate("organizeTopFive");
    console.log([result]);
    return [result];
  } catch (err) {
    console.error(err);
    throw err;
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
    const res = await sixthModel.find({ organName: oarg });
    const result = await getMax(res);
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const allLocations = async () => {
  try {
    return await locationModel.find({});
  } catch (error) {
    throw error;
  }
};

export const searchText = async (search: string) => {
  search = search.trim();
  const events = await attackFullModel
    .find({
      summary: { $regex: search, $options: "i" },
    })
    .limit(1000);
  console.log(events);
  return events;
};
