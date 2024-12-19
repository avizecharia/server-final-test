import mongoose from "mongoose";
import fs from "fs/promises";
import { firstModel } from "../models/first.model";
import { secModel } from "../models/sec.model";
import { locationModel } from "../models/location.model";
import { thirdModel } from "../models/third.model";

export const getFileData = async <T>(): Promise<T[] | void> => {
  try {
    const dataFromFile: any = await fs.readFile(
      `C:/Users/IMOE001/Documents/Fullstack/finalTest/server/globalterrorismdb_0718dist/globalterrorismdb_0718dist.json`,
      "utf-8"
    );
    const parsaData: T[] = await JSON.parse(dataFromFile);
    return parsaData;
  } catch (error) {
    console.log(error);
  }
};

//ceed the kindattack1 to the db model
export const ceedSchema1 = async (): Promise<void> => {
  try {
    const data: any = await getFileData();
    let casualties: number = 0;
    for (const element of data as any[]) {
      casualties = calcCasualties(element.nkill, element.nwound);
      let existing: mongoose.AnyObject | null = await firstModel.findOne({
        attackType: element.attacktype1_txt,
      });
      if (!existing) {
        const newQ1 = new firstModel({
          attackType: element.attacktype1_txt,
          numCasualties: casualties,
        });
        await newQ1.save();
      } else {
        existing.numCasualties = casualties + existing.numCasualties;
        existing.save();
      }
    }
    console.log("1");
  } catch (error) {
    console.log(error);
  }
};

//ceed the kindattack2 to the db model
export const ceedSchema1Attack2 = async (): Promise<void> => {
  try {
    const data: any = await getFileData();
    let casualties: number = 0;
    for (const element of data as any[]) {
      casualties = calcCasualties(element.nkill, element.nwound);
      if (typeof element.attacktype2_txt != typeof "hvh") {
        continue;
      }
      let existing: mongoose.AnyObject | null = await firstModel.findOne({
        attackType: element.attacktype2_txt,
      });
      if (!existing) {
        const newQ1 = new firstModel({
          attackType: element.attacktype2_txt,
          numCasualties: casualties,
        });
        await newQ1.save();
      } else {
        existing.numCasualties = casualties + existing.numCasualties;
        existing.save();
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//ceed for schema2
export const ceedSchema2 = async (): Promise<void> => {
  try {
    console.log("start");
    const data: any = await getFileData();
    console.log("get data");
    for (const element of data as any[]) {
      let casualties: number = 0;
      casualties = calcCasualties(element.nkill, element.nwound);
      let existing: mongoose.AnyObject | null = await secModel.findOne({
        region: element.region_txt,
        country: element.country_txt,
        city: element.city,
      });
      const location = new locationModel({
        lat: element.latitude,
        lon: element.longitude,
      });
      if (!existing) {
        const newQ2 = new secModel({
          region: element.region_txt,
          country: element.country_txt,
          city: element.city,
          locationArr: [location],
          numCasualties: casualties,
        });
        await newQ2.save();
      } else {
        existing.numCasualties = casualties + existing.numCasualties;
        existing.locationArr.push(location);
        existing.save();
      }
    }
    console.log("2");
  } catch (error) {
    console.log(error);
  }
};

//ceed for schema3
export const ceedSchema3 = async (): Promise<void> => {
  try {
    const data: any = await getFileData();
    for (const element of data as any[]) {
      let existing: mongoose.AnyObject | null = await thirdModel.findOne({
        year: element.iyear,
        month: element.imonth,
      });
      if (!existing) {
        const newQ3 = new thirdModel({
          year: element.iyear,
          month: element.imonth,
          numEvent: 1,
        });
        await newQ3.save();
      } else {
        existing.numEvent = existing.numEvent + 1;
        await existing.save();
      }
    }
    console.log(3);
  } catch (error) {
    console.log(error);
  }
};

export const calcCasualties = (
  numOfKill: number | undefined,
  numOfWound: number | undefined
): number => {
  if (typeof numOfKill != typeof 1) {
    numOfKill = 0.0;
  }
  if (typeof numOfWound != typeof 1) {
    numOfWound = 0.0;
  }
  return numOfKill! + numOfWound!;
};
