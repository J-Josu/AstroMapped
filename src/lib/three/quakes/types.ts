export type QuakeType = 'M' | 'SH' | `A${number}` | string;

export interface RawQuakeData {
  schema: any,
  data: {
    index: number,
    type: string,
    latitude: number,
    longitude: number,
    depth: number,
    phi: number,
    delta_a: number,
    delta_b: number,
    depth_error: number,
    date: string,
    time_error: number,
    p12: number,
    p12_ec: number,
    p14: number,
    p14_ec: number,
    p15: number,
    p15_ec: number,
    p16: number,
    p16_ec: number,
    s12: number,
    s12_ec: number,
    s14: number,
    s14_ec: number,
    s15: number,
    s15_ec: number,
    s16: number,
    s16_ec: number;
  }[];
}

export interface QuakeData {
  index: number,
  type: string,
  latitude: number,
  longitude: number,
  phi: number,
  delta_a: number,
  delta_b: number,
  depth: number,
  depth_error: number,
  date: string,
  seconds: number,
  time_err: number,
  stations: {
    name: number,
    p: number,
    p_ec: number,
    s: number,
    s_ec: number;
  }[];
}
