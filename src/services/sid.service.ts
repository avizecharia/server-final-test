import mongoose, { ObjectId } from "mongoose";
import fs from "fs/promises";
import { firstModel } from "../models/first.model";
import { secModel } from "../models/sec.model";
import { locationModel } from "../models/location.model";
import { thirdModel } from "../models/third.model";
import { orgaAndLocateModel } from "../models/orgaAndLocate.model";
import { fourthModel } from "../models/fourth";
import { fifthModel } from "../models/fifth.model";
import { sixthModel } from "../models/sixth.model";
import { attackFullModel } from "../models/attack.model";
import { IAttackFull, IAttackFull1 } from "../types/interfaces";

export const getData = async <T>(): Promise<T[] | void> => {
  try {
    const dataFromFile: any = await fs.readFile(
      `C:/Users/IMOE001/Documents/Fullstack/finalTest/server/globalterrorismdb_0718dist/globalterrorismdb_0718dist.json`,
      "utf-8"
    );
    const parsaData: T[] = await JSON.parse(dataFromFile);
    return parsaData;
  } catch (err) {
    console.log(err);
  }
};

export const sidAttack = async () => {
  try {
    const data: IAttackFull1[] | any = await getData();
    for (const element of data as IAttackFull[]) {
      const {
        eventid,
        city,
        attacktype1_txt,
        country_txt,
        iday,
        latitude,
        longitude,
        imonth,
        nkill,
        nperps,
        nwound,
        gname,
        region_txt,
        summary,
        target1,
        targtype1_txt,
        weaptype1_txt,
        iyear,
      } = element;
      const newA = new attackFullModel({
        eventid,
        attackType: attacktype1_txt,
        city,
        country: country_txt,
        iday,
        lat: latitude,
        lon: longitude,
        month: imonth,
        nkill,
        nperps,
        nwound,
        organName: gname,
        region: region_txt,
        summary,
        target1,
        targtype1_txt,
        weaptype1_txt,
        year: iyear,
      });
      await newA.save();
    }
    console.log("doneee");
  } catch (err) {
    console.log(err);
  }
};

//ceed the kindattack1 to the db model
export const cidSchema1 = async (): Promise<void> => {
  try {
    const data: any = await getData();
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
        await existing.save();
      }
    }
    console.log("1");
  } catch (err) {
    console.log(err);
  }
};

//ceed the kindattack2 to the db model
export const cidSchema1Attack2 = async (): Promise<void> => {
  try {
    const data: any = await getData();
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
        await existing.save();
      }
      console.log("1/2");
    }
  } catch (err) {
    console.log(err);
  }
};

//ceed for schema2
export const cidSchema2 = async (): Promise<void> => {
  try {
    console.log("start");
    const data: any = await getData();
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
      await location.save();
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
        await existing.save();
      }
    }
    console.log("2");
  } catch (err) {
    console.log(err);
  }
};

//ceed for schema3
export const cidSchema3 = async (): Promise<void> => {
  try {
    const data: any = await getData();
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
  } catch (err) {
    console.log(err);
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

export const cidOrgan = async (): Promise<void> => {
  try {
    const data: any = await getData();
    for (const element of data as any[]) {
      let existing: mongoose.AnyObject | null =
        await orgaAndLocateModel.findOne({
          region: element.region_txt,
          organName: element.gname,
        });
      if (!existing) {
        const newOrga = new orgaAndLocateModel({
          region: element.region_txt,
          organName: element.gname,
          numEvent: 1,
        });
        await newOrga.save();
      } else {
        existing.numEvent += 1;
        await existing.save();
      }
    }
    console.log(4);
  } catch (err) {
    console.log(err);
  }
};
export const cidSchema4 = async (): Promise<void> => {
  try {
    const data: any = await getData();
    for (const element of data as any[]) {
      let existing: mongoose.AnyObject | null = await fourthModel.findOne({
        region: element.region_txt,
      });
      if (!existing) {
        const newQ4 = new fourthModel({ region: element.region_txt });
        let orgs = await orgaAndLocateModel
          .find({ region: element.region_txt })
          .sort({ numEvent: -1 });
        newQ4.organizeTopFive.push(
          orgs[4]._id as any,
          orgs[3]._id as any,
          orgs[2]._id as any,
          orgs[1]._id as any,
          orgs[0]._id as any
        );
        await newQ4.save();
      } else {
        continue;
      }
    }
    console.log(4);
  } catch (err) {
    console.log(err);
  }
};

//ceed for schema5
export const cidSchema5 = async (): Promise<void> => {
  try {
    const data: any = await getData();
    for (const element of data as any[]) {
      let existing: mongoose.AnyObject | null = await fifthModel.findOne({
        year: element.iyear,
        organizationName: element.gname,
      });
      if (!existing) {
        const newQ5 = new fifthModel({
          year: element.iyear,
          organizationName: element.gname,
          numEvent: 1,
        });
        await newQ5.save();
      } else {
        existing.numEvent = existing.numEvent + 1;
        await existing.save();
      }
    }
    console.log(5);
  } catch (err) {
    console.log(err);
  }
};
//ceed for schema6
export const cidSchema6 = async (): Promise<void> => {
  try {
    const data: any = await getData();
    let casualties: number = 0;
    for (const element of data as any[]) {
      casualties = await calcCasualties(element.nkill, element.nwound);
      let existing: mongoose.AnyObject | null = await sixthModel.findOne({
        region: element.region_txt,
        organName: element.gname,
      });
      if (!existing) {
        const newQ6 = new sixthModel({
          region: element.region_txt,
          organName: element.gname,
          numCasualties: casualties,
        });
        await newQ6.save();
      } else {
        existing.numCasualties = existing.numCasualties + casualties;
        await existing.save();
      }
    }
    console.log(6);
  } catch (err) {
    console.log(err);
  }
};
