import Frames1 from "./VintageFrames/Frame12.png";
import Frames2 from "./VintageFrames/Frame36.png";
import Frames3 from "./VintageFrames/Frame22.png";
import Frames4 from "./VintageFrames/Frame29.png";
import Frames5 from "./VintageFrames/Frame17.png";
import Frames6 from "./VintageFrames/Frame20.png";
import Frames7 from "./VintageFrames/Frame05.png";
import Frames8 from "./VintageFrames/Frame11.png";
import Frames9 from "./VintageFrames/Frame21.png";
import Frames10 from "./VintageFrames/Frame06.png";
import Frames11 from "./VintageFrames/Frame25.png";
import Frames12 from "./VintageFrames/Frame34.png";
import Frames13 from "./VintageFrames/Frame04.png";
import Frames14 from "./VintageFrames/Frame30.png";
import Frames15 from "./VintageFrames/Frame19.png";
import Frames16 from "./VintageFrames/Frame14.png";
import Frames17 from "./VintageFrames/Frame08.png";
import Frames18 from "./VintageFrames/Frame15.png";
import Frames19 from "./VintageFrames/Frame26.png";
import Frames20 from "./VintageFrames/Frame32.png";
import Frames21 from "./VintageFrames/Frame03.png";
import Frames22 from "./VintageFrames/Frame13.png";
import Frames23 from "./VintageFrames/Frame18.png";
import Frames24 from "./VintageFrames/Frame02.png";
import Frames25 from "./VintageFrames/Frame31.png";
import Frames26 from "./VintageFrames/Frame35.png";
import Frames27 from "./VintageFrames/Frame27.png";
import Frames28 from "./VintageFrames/Frame16.png";
import Frames29 from "./VintageFrames/Frame01.png";
import Frames30 from "./VintageFrames/Frame37.png";
import Frames31 from "./VintageFrames/Frame23.png";
import Frames32 from "./VintageFrames/Frame07.png";
import Frames33 from "./VintageFrames/Frame28.png";
import Frames34 from "./VintageFrames/Frame09.png";
import Frames35 from "./VintageFrames/Frame10.png";
import Frames36 from "./VintageFrames/Frame33.png";

const randomIdx = (arr: Array<string>) => {
  return Math.floor(Math.random() * arr.length);
};

export function selectFrame(ratio: number) {
  const ratios = [
    1.366093366093366, 0.8404255319148937, 0.8147058823529412,
    1.3401486988847584, 1.300711743772242, 0.846553966189857,
    1.2228070175438597, 1.5411954765751212, 0.8966942148760331,
    0.7604912998976459, 0.7753164556962026, 1.1920415224913494,
    1.2246065808297568, 0.8234442836468886, 1.1263157894736842,
    1.2917431192660551, 1.2034313725490196, 1.1814744801512287,
    1.1901931649331352, 0.8077544426494345, 0.7858136300417247,
    1.1241534988713318, 0.87248322147651, 0.7247596153846154, 0.843042071197411,
    1.1636636636636637, 1.133445945945946, 1.1673728813559323,
    1.238938053097345, 0.6496732026143791, 1.1704745166959578, 1.23,
    1.2421602787456445, 1.2330578512396695, 0.9634703196347032,
    1.154727793696275,
  ];
  const frames = [
    [Frames1],
    [Frames2],
    [Frames3],
    [Frames4],
    [Frames5],
    [Frames6],
    [Frames7],
    [Frames8],
    [Frames9],
    [Frames10],
    [Frames11],
    [Frames12],
    [Frames13],
    [Frames14],
    [Frames15],
    [Frames16],
    [Frames17],
    [Frames18],
    [Frames19],
    [Frames20],
    [Frames21],
    [Frames22],
    [Frames23],
    [Frames24],
    [Frames25],
    [Frames26],
    [Frames27],
    [Frames28],
    [Frames29],
    [Frames30],
    [Frames31],
    [Frames32],
    [Frames33],
    [Frames34],
    [Frames35],
    [Frames36],
  ];
  const innerPercentages = [
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
    [{ w: 80, h: 80 }],
  ];

  const closest = ratios.reduce((prev, val, i) => {
    if (Math.abs(ratio - val) < Math.abs(ratio - ratios[prev])) return i;
    return prev;
  }, 0);

  const idx = randomIdx(frames[closest]);

  return {
    frame: frames[closest][idx],
    ratio: ratios[closest],
    innerPercentage: innerPercentages[closest][idx],
  };
}
