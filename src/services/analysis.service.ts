import { firstModel } from "../models/first.model";
import { secModel } from "../models/sec.model";
import { thirdModel } from "../models/third.model";
import { IFirstQ } from "../types/interfaces";
import "../models/location.model";

export const getFirst = async () => {
  try {
    const result: IFirstQ[] = await firstModel.find();
    const res = result
      .map((item, index) => ({ index, item }))
      .sort((a, b) => {
        const aRank =
          a.item.numCasualties !== undefined ? a.item.numCasualties : Infinity;
        const bRank =
          b.item.numCasualties !== undefined ? b.item.numCasualties : Infinity;
        return bRank - aRank || b.index - a.index;
      })
      .map((entry) => entry.item);
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const getSecAll = async () => {
  try {
    const result = await secModel.find({}).populate("locationArr");
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSecCity = async (city: string) => {
  try {
    const result = await secModel.find({ city: city }).populate("locationArr");
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSecContry = async (country: string) => {
  try {
    const result = await secModel
      .find({ country: country })
      .populate("locationArr");
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSecRegion = async (region: string) => {
  try {
    const result = await secModel
      .find({ region: region })
      .populate("locationArr");
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getThirdAll = async () => {
  try {
    const result = await thirdModel.find({});
    console.log(result[0]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getThirdByYear = async (year: string) => {
  try {
    const result = await thirdModel.find({ year: year });
    console.log(result[0]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getThirdByYearRange = async (
  startYear: string,
  endYear: string
) => {
  try {
    const list = [];
    while (endYear >= startYear) {
      const result = await thirdModel.find({ year: startYear });
      list.push(result);
      startYear = String(Number(startYear) + 1);
    }
    console.log(list);
    return list;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const getThirdBy5Year = async () => {
  try {
    let startYear = 2012;
    const endYear = 2017;
    const list = [];
    while (endYear >= startYear) {
      const result = await thirdModel.find({ year: startYear });
      list.push(result);
      startYear += 1;
    }
    console.log(list);
    return list;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getThirdBy10Year = async () => {
  try {
    let startYear = 2007;
    const endYear = 2017;
    const list = [];
    while (endYear >= startYear) {
      const result = await thirdModel.find({ year: startYear });
      list.push(result);
      startYear += 1;
    }
    console.log(list);
    return list;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
