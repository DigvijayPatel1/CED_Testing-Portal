export const exposureConditions = [
  {
    id: "i",
    exposure: "Mild",
    minCementContent: 300,
    maxWCRatio: 0.55,
    minGrade: "M20",
  },
  {
    id: "ii",
    exposure: "Moderate",
    minCementContent: 300,
    maxWCRatio: 0.50,
    minGrade: "M25",
  },
  {
    id: "iii",
    exposure: "Severe",
    minCementContent: 320,
    maxWCRatio: 0.45,
    minGrade: "M30",
  },
  {
    id: "iv",
    exposure: "Very Severe",
    minCementContent: 340,
    maxWCRatio: 0.45,
    minGrade: "M35",
  },
  {
    id: "v",
    exposure: "Extreme",
    minCementContent: 360,
    maxWCRatio: 0.40,
    minGrade: "M40",
  },
];

export const valueOfXTable = [
  {
    id: "i",
    grades: ["M10", "M15"],
    value: 5.0,
  },
  {
    id: "ii",
    grades: ["M20", "M25"],
    value: 5.5,
  },
  {
    id: "iii",
    grades: ["M30", "M35", "M40", "M45", "M50", "M55", "M60"],
    value: 6.5,
  },
  {
    id: "iv",
    grades: ["M65 and above"],
    value: 8.0,
  },
];

export const standardDeviationTable = [
  {
    id: "i",
    grades: ["M10", "M15"],
    stdDeviation: 3.5,
  },
  {
    id: "ii",
    grades: ["M20", "M25"],
    stdDeviation: 4.0,
  },
  {
    id: "iii",
    grades: ["M30", "M35", "M40", "M45", "M50", "M55", "M60"],
    stdDeviation: 5.0,
  },
  {
    id: "iv",
    grades: ["M65", "M70", "M75", "M80"],
    stdDeviation: 6.0,
  },
];

export const airContentTable = [
  {
    id: "i",
    aggregateSize: 10,
    entrappedAir: 1.5,
  },
  {
    id: "ii",
    aggregateSize: 20,
    entrappedAir: 1.0,
  },
  {
    id: "iii",
    aggregateSize: 40,
    entrappedAir: 0.8,
  },
];

export const waterContentTable = [
  {
    id: "i",
    aggregateSize: 10,
    waterContent: 208,
  },
  {
    id: "ii",
    aggregateSize: 20,
    waterContent: 186,
  },
  {
    id: "iii",
    aggregateSize: 40,
    waterContent: 165,
  },
];

export const zoneTable = [
  {
    id: "i",
    aggregateSize: 10,
    zones: {
      zoneIV: 0.54,
      zoneIII: 0.52,
      zoneII: 0.50,
      zoneI: 0.48,
    },
  },
  {
    id: "ii",
    aggregateSize: 20,
    zones: {
      zoneIV: 0.66,
      zoneIII: 0.64,
      zoneII: 0.62,
      zoneI: 0.60,
    },
  },
  {
    id: "iii",
    aggregateSize: 40,
    zones: {
      zoneIV: 0.73,
      zoneIII: 0.72,
      zoneII: 0.71,
      zoneI: 0.69,
    },
  },
];