interface Window {
  state: typeof import("./src/lib/RangeCalculator").defaultState;
  rangeCalculator: InstanceType<typeof import("./src/lib/RangeCalculator").default>;
}

declare interface Data {
  temp: number;
  wheelsize: number;
  ac: string;
  hwy: {
    kmh: number;
    kilometers: number;
  }[];
}

module "*metric-100D.json" {
  const data: Data;
  export default data;
}

module "*metric-P100D.json" {
  const data: Data;
  export default data;
}
