import type { QuakeData, RawQuakeData } from '$three/quakes/types';

export function getNormalizedData(sample: RawQuakeData) {
  const result: QuakeData[] = [];
  sample.data.forEach(s => {
    const newSample = {};
    Object.keys(s).forEach(k => {
      if (k.match(/^(p|s)/)) return;
      newSample[k] = s[k];
    });
    newSample.stations = [
      {
        name: 12,
        p: s.p12,
        p_ec: s.p12_ec,
        s: s.s12,
        s_ec: s.s12_ec
      }, {
        name: 14,
        p: s.p14,
        p_ec: s.p14_ec,
        s: s.s14,
        s_ec: s.s14_ec
      }, {
        name: 15,
        p: s.p15,
        p_ec: s.p15_ec,
        s: s.s15,
        s_ec: s.s15_ec
      }, {
        name: 16,
        p: s.p16,
        p_ec: s.p16_ec,
        s: s.s16,
        s_ec: s.s16_ec
      }];
    result.push(newSample as QuakeData);
  });
  return result;
}

// export function normalizeQuakeData(sample: RawQuakeData) {
//   return sample.data.map(s => {
//     return {
//       index: s.index,
//       type: s.Type,
//       latitude: s.Latitude,
//       longitude: s.Longitude,
//       depth: s.Depth,
//       phi: s.Phi,
//       deltaA: s["Delta-a"],
//       deltaB: s["Delta-b"],
//       depth_error: s["Depth_Error"],
//       date: s.Date,
//       seconds: s.Seconds,
//       time_err: s.Time_err,
//       stations: [{
//         name: 12,
//         p: s["12P"],
//         p_ec: s["12P_EC"],
//         s: s["12S"],
//         s_ec: s["12S_EC"]
//       }, {
//         name: 14,
//         p: s["14P"],
//         p_ec: s["14P_EC"],
//         s: s["14S"],
//         s_ec: s["14S_EC"]
//       }, {
//         name: 15,
//         p: s["15P"],
//         p_ec: s["15P_EC"],
//         s: s["15S"],
//         s_ec: s["15S_EC"]
//       }, {
//         name: 16,
//         p: s["16P"],
//         p_ec: s["16P_EC"],
//         s: s["16S"],
//         s_ec: s["16S_EC"]
//       }]
//     } as QuakeData;
//   });
// }
