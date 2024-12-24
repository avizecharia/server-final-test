export interface IFirstQ {
  _id?: string;
  attackType: string;
  numCasualties: number;
}

export interface ILocation {
  lat: number;
  lon: number;
}

export interface secQ {
  _id: string;
  region: string;
  numCasualties: number;
  country: string;
  city: string;
  locationArr: ILocation[];
}
export interface IThird {
  _id: string;
  year: number;
  month: number;
  numEvent: number;
}

export interface IOrgaAndLocate {
  organName: string;
  region: string;
  numEvent: number;
}
export interface IFourth {
  region: string;
  organizeTopFive: IOrgaAndLocate[];
}

export interface IFifth {
  organizationName: string;
  year: number;
  numEvent: number;
}
export interface ISixth {
  organName: string;
  numCasualties: number;
  region: string;
}
export interface IAttack {
  attackType?: string;
  nkill?: number;
  nwound?: number;
  region?: string;
  country?: string;
  city?: string;
  lat?: number;
  lon?: number;
  organName?: string;
  year?: number;
  month?: number;
}

export interface IAttackFull1 extends IAttack {
  eventid?: number;
  year?: number;
  month?: number;
  iday?: number;
  country?: string;
  region?: string;
  city?: string;
  lat?: number;
  lon?: number;
  attackType?: string;
  targtype1_txt?: string;
  target1?: string;
  organName?: string;
  weaptype1_txt?: string;
  nkill?: number;
  nwound?: number;
  nperps?: number;
  summary?: string;
}

export interface IAttackFull {
  eventid?: number;
  iyear?: number;
  imonth?: number;
  iday?: number;
  country_txt?: string;
  region_txt?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  attacktype1_txt?: string;
  targtype1_txt?: string;
  target1?: string;
  gname?: string;
  weaptype1_txt?: string;
  nkill?: number;
  nwound?: number;
  nperps?: number;
  summary?: string;
}
