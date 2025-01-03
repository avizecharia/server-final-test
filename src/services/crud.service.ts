import mongoose from "mongoose";
import { fifthModel } from "../models/fifth.model";
import { firstModel } from "../models/first.model";
import { fourthModel } from "../models/fourth";
import { locationModel } from "../models/location.model";
import { orgaAndLocateModel } from "../models/orgaAndLocate.model";
import { secModel } from "../models/sec.model";
import { sixthModel } from "../models/sixth.model";
import { thirdModel } from "../models/third.model";
import {
  IAttack,
  IAttackFull,
  IAttackFull1,
  ILocation,
} from "../types/interfaces";
import { calcCasualties } from "./sid.service";
import { attackFullModel } from "../models/attack.model";

const createAttackFull = async (event: IAttackFull1) => {
  try {
    const {
      attackType,
      city,
      country,
      eventid,
      iday,
      lat,
      lon,
      month,
      nkill,
      nperps,
      nwound,
      organName,
      region,
      summary,
      target1,
      targtype1_txt,
      weaptype1_txt,
      year,
    } = event;
    const exist = await attackFullModel.find({ eventid });
    if (!exist) {
      const newAttack = new attackFullModel({
        attackType,
        city,
        country,
        eventid,
        iday,
        lat,
        lon,
        month,
        nkill,
        nperps,
        nwound,
        organName,
        region,
        summary,
        target1,
        targtype1_txt,
        weaptype1_txt,
        year,
      });
      await newAttack.save();
    } else {
      throw new Error("attack with the event id already exist");
    }
  } catch (error) {
    console.log(error);
  }
};

const createFirst = async (event: IAttack) => {
  try {
    const { attackType, nkill, nwound } = event;
    const exist = await firstModel.findOne({ attackType });

    if (!exist) {
      const newFirst = new firstModel({
        attackType,
        numCasualties: await calcCasualties(nkill, nwound),
      });
      await newFirst.save();
    } else {
      exist.numCasualties = exist.numCasualties + calcCasualties(nkill, nwound);
      await exist.save();
    }
    return;
  } catch (err) {
    console.log(err);
  }
};

const createSec = async (event: IAttack, location: ILocation) => {
  try {
    const { nkill, nwound, region, country, city } = event;
    const exist = await secModel.findOne({ region, country, city });
    if (!exist) {
      const newSec = new secModel({
        region,
        numCasualties: calcCasualties(nkill, nwound),
        country,
        city,
        locationArr: [location],
      });
      await newSec.save();
    } else {
      exist.numCasualties = exist.numCasualties + calcCasualties(nkill, nwound);
      exist.locationArr.push(location);
      await exist.save();
    }
    return;
  } catch (err) {
    console.log(err);
  }
};
const createThird = async (event: IAttack) => {
  try {
    const { year, month } = event;

    const exist = await thirdModel.findOne({ year, month });
    if (!exist) {
      const newThird = new thirdModel({ year, month, numEvent: 1 });
      await newThird.save();
    } else {
      exist.numEvent = exist.numEvent + 1;
      await exist.save();
    }
    return;
  } catch (err) {
    console.log(err);
  }
};
// natan
const createOargeAndLocate = async (event: IAttack) => {
  try {
    const { region, organName } = event;
    let existing: mongoose.AnyObject | null = await orgaAndLocateModel.findOne({
      region,
      organName,
    });
    if (!existing) {
      const newOrga = new orgaAndLocateModel({
        region,
        organName,
        numEvent: 1,
      });
      await newOrga.save();
    } else {
      existing.numEvent += 1;
      await existing.save();
    }
    console.log("oarg");
  } catch (error) {
    console.log(error);
  }
};
//natan
const createForth = async (event: IAttack) => {
  try {
    const { region } = event;
    const exist = await fourthModel.findOne({ region });
    if (!exist) {
      const myEvent = await orgaAndLocateModel.findOne({ region });
      const newForth = new fourthModel({
        region,
        organizeTopFive: [myEvent!._id],
      });
      await newForth.save();
    } else {
      await calcTopFive(event);
    }
  } catch (err) {
    console.log(err);
  }
};
const CreateFifth = async (event: IAttack) => {
  try {
    const { organName, year } = event;
    const exist = await fifthModel.findOne({
      organizationName: organName,
      year,
    });
    if (!exist) {
      const newFifth = new fifthModel({
        organizationName: organName,
        year,
        numEvent: 1,
      });
      await newFifth.save();
    } else {
      exist.numEvent = exist.numEvent + 1;
      await exist.save();
    }
    return;
  } catch (err) {
    console.log(err);
  }
};
const createSixth = async (event: IAttack) => {
  try {
    const { nkill, nwound, region, organName } = event;

    const exist = await sixthModel.findOne({ organName, region });
    if (!exist) {
      const newSixth = new sixthModel({
        organName,
        region,
        numCasualties: calcCasualties(nkill, nwound),
      });
      await newSixth.save();
    } else {
      exist.numCasualties = exist.numCasualties + calcCasualties(nkill, nwound);
      await exist.save();
    }
    return;
  } catch (err) {
    console.log(err);
  }
};

export const createAttack = async (event: IAttackFull1) => {
  try {
    const { lat, lon } = event;
    const location = new locationModel({ lat, lon });
    await location.save();
    await createAttackFull(event);
    await createFirst(event);
    await createSec(event, location);
    await createThird(event);
    //add
    await createOargeAndLocate(event);
    await createForth(event);
    await CreateFifth(event);
    await createSixth(event);
    console.log("done");

    return true;
  } catch (err) {
    console.log(err);
  }
};
const delAttackFull = async (event: IAttackFull1) => {
  try {
    const exist = await attackFullModel.find({ eventid: event.eventid });
    if (!exist) {
      throw new Error("[delte] this event is not found");
    }
    const delEvent = await attackFullModel.findOneAndDelete({
      eventid: event.eventid,
    });
    console.log(delEvent, "delEvent");
  } catch (error) {
    console.log(error);
  }
};
const delFirst = async (event: IAttack) => {
  try {
    const { attackType, nkill, nwound } = event;
    const exist = await firstModel.findOne({ attackType });
    if (!exist) {
      throw new Error("no one to delete!");
    } else {
      if (exist.numCasualties - calcCasualties(nkill, nwound) >= 0) {
        exist.numCasualties =
          exist.numCasualties - calcCasualties(nkill, nwound);
      }
      await exist.save();
    }
    return;
  } catch (err) {
    console.log(err);
  }
};

const delSec = async (event: IAttack, location: ILocation) => {
  try {
    const { nkill, nwound, region, country, city } = event;
    const exist = await secModel.findOne({ region, country, city });
    if (!exist) {
      throw new Error("no one to delete!");
    } else {
      const allLocations = await locationModel.findOneAndDelete({
        lat: location.lat,
        lon: location.lon,
      });
      if (exist.numCasualties - calcCasualties(nkill, nwound) >= 0) {
        exist.numCasualties =
          exist.numCasualties - calcCasualties(nkill, nwound);
      }
      exist.locationArr.filter(
        (loc) => loc.lat != location.lat && loc.lon != location.lon
      );
      await exist.save();
    }
    return;
  } catch (err) {
    console.log(err);
  }
};
const delThird = async (event: IAttack) => {
  try {
    const { year, month } = event;
    const exist = await thirdModel.findOne({ year, month });
    if (!exist) {
      throw new Error("no one to delete!");
    } else {
      if (exist.numEvent - 1 >= 0) {
        exist.numEvent = exist.numEvent - 1;
      }
      await exist.save();
    }
    return;
  } catch (err) {
    console.log(err);
  }
};
// natan
const delOargAndLocated = async (event: IAttack) => {
  try {
    const { region, organName } = event;
    let exist: mongoose.AnyObject | null = await orgaAndLocateModel.findOne({
      region,
      organName,
    });
    if (!exist) {
      throw new Error("no one to delete!");
    } else {
      if (exist.numEvent - 1 >= 0) {
        exist.numEvent = exist.numEvent - 1;
      }
      await exist.save();
      await calcTopFive(event);
    }
  } catch (error) {
    console.log(error);
  }
};

const delFifth = async (event: IAttack) => {
  try {
    const { organName, year } = event;

    const exist = await fifthModel.findOne({
      organizationName: organName,
      year,
    });
    if (!exist) {
      throw new Error("no one to delete!");
    } else {
      if (exist.numEvent - 1 >= 0) {
        exist.numEvent = exist.numEvent - 1;
      }
      await exist.save();
    }
    return;
  } catch (err) {
    console.log(err);
  }
};
const delSixth = async (event: IAttack) => {
  try {
    const { nkill, nwound, region, organName } = event;
    const exist = await sixthModel.findOne({ organName, region });
    if (!exist) {
      throw new Error("no one to delete!");
    } else {
      if (exist.numCasualties - calcCasualties(nkill, nwound) >= 0) {
        exist.numCasualties =
          exist.numCasualties - calcCasualties(nkill, nwound);
      }
      await exist.save();
    }
    return;
  } catch (err) {
    console.log(err);
  }
};

export const delAttack = async (event: IAttack) => {
  try {
    const { lat, lon } = event;
    const location = new locationModel({ lat, lon });
    await location.save();
    await delAttackFull(event);
    await delFirst(event);
    await delSec(event, location);
    await delThird(event);
    await delOargAndLocated(event);
    await delFifth(event);
    await delSixth(event);
  } catch (err) {
    console.log(err);
  }
};

export const updateAttack = async (event: IAttack) => {
  try {
    await delAttack(event);
    await createAttack(event);
  } catch (err) {
    console.log(err);
  }
};

export const calcTopFive = async (event: IAttack) => {
  try {
    const { region } = event;
    let existing: any = await fourthModel.findOne({ region });
    if (!existing) {
      throw new Error();
    } else if (existing.organizeTopFive.length < 5) {
      let orgs = await orgaAndLocateModel
        .find({ region })
        .sort({ numEvent: -1 });
      existing.organizeTopFive = [];
      for (let index = existing.organizeTopFive.length; index >= 0; index--) {
        existing.organizeTopFive.push(orgs[index]);
      }
      await existing.save();
    } else {
      let orgs = await orgaAndLocateModel
        .find({ region })
        .sort({ numEvent: -1 });
      existing.organizeTopFive = [];
      existing.organizeTopFive.push(
        orgs[0]._id as any,
        orgs[1]._id as any,
        orgs[2]._id as any,
        orgs[3]._id as any,
        orgs[4]._id as any
      );
      await existing.save();
    }
    console.log("calc");
  } catch (error) {
    console.log(error);
  }
};
