import {
  exposureConditions,
  valueOfXTable,
  standardDeviationTable,
  airContentTable,
  waterContentTable,
  zoneTable,
} from "../../data/concreteMixTables.js";

export default function concreteMixCalc(testId, formData) {
  const { commonData, proportionData, materialData } = formData;

  // Step 1: Target Strength Calculation
  const fck = parseFloat(proportionData.characteristicStrength);
  const S = parseFloat(proportionData.standardDeviation) || getStandardDeviation(fck);
  const X = parseFloat(proportionData.factorX) || getFactorX(fck);

  const targetStrength1 = fck + 1.65 * S;
  const targetStrength2 = fck + X;
  const targetStrength = Math.max(targetStrength1, targetStrength2);

  // Step 2: Water Content Calculation
  const maxNominalSize = parseFloat(proportionData.maxNominalSize);
  const slump = parseFloat(proportionData.slump);
  const wc = getWaterContent(maxNominalSize);

  let W1;
  if (slump === 50) {
    W1 = wc;
  } else if (slump > 50) {
    W1 = wc + (3 / 100) * ((slump - 50) / 25) * wc;
  } else {
    W1 = wc - (3 / 100) * ((50 - slump) / 25) * wc;
  }

  // Adjust for admixture type
  let W;
  const admixtureType = proportionData.admixtureType;
  if (admixtureType === "Water reducing") {
    W = W1 * (1 - 0.05);
  } else if (admixtureType === "Super plasticizer") {
    W = W1 * (1 - 0.20);
  } else {
    W = W1;
  }

  // Step 3: Cement Mass
  const waterCementRatio = parseFloat(
    proportionData.waterCementRatio ?? proportionData.waterCement
  );
  const C = W / waterCementRatio;

  // Step 4: Aggregate Proportions
  const zone = materialData.zoneFineAggregate;
  const p1 = getP1FromZone(maxNominalSize, zone);
  const wcRatio = waterCementRatio;

  let p;
  if (wcRatio > 0.5) {
    p = p1 - ((wcRatio - 0.5) * 0.01 / 0.05);
  } else {
    p = p1 + ((0.5 - wcRatio) * 0.01 / 0.05);
  }

  const coarseAggregateProportion = p;
  const fineAggregateProportion = 1 - p;

  // Step 5: Mix Calculation
  const totalVolume = 1; // m³

  const entrappedAir = (parseFloat(proportionData.airContent) || getEntrappedAir(maxNominalSize)) / 100;

  const sgCement = parseFloat(materialData.sgCement);
  const volumeCement = C / (sgCement * 1000);

  const sgWater = 1; // Specific gravity of water
  const volumeWater = W / (sgWater * 1000);

  const sgAdmixture = parseFloat(
    proportionData.sgAdmixture ?? materialData.sgAdmixture
  ) || 1;
  const massAdmixture = 0.01 * C; // 1% of cement mass
  const volumeAdmixture = massAdmixture / (sgAdmixture * 1000);

  const volumeAggregate = (totalVolume - entrappedAir) - (volumeCement + volumeWater + volumeAdmixture);

  const sgCoarseAggregate = parseFloat(materialData.sgCoarseAggregateSSD);
  const sgFineAggregate = parseFloat(materialData.sgFineAggregateSSD);
  const massCoarseAggregate = volumeAggregate * coarseAggregateProportion * sgCoarseAggregate * 1000;
  const massFineAggregate = volumeAggregate * fineAggregateProportion * sgFineAggregate * 1000;

  const mFAtoC = (massFineAggregate / C).toFixed(2);
  const mCAtoC = (massCoarseAggregate / C).toFixed(2);
  const mixProportion = `1 : ${mFAtoC} : ${mCAtoC}`;


  // Volumes for aggregates (simplified, need more data)
  // This is a placeholder; actual calculation requires more inputs

  return {
    name: "Concrete Mix Design",
    status: "CALCULATED",
    formData,
    calculations: {
      targetStrength,
      factorX: X,
      standardDeviation: S,
      waterContent: W.toFixed(2),
      cementMass: C.toFixed(2),
      coarseAggregateProportion,
      fineAggregateProportion,
      totalVolume,
      entrappedAir,
      volumeCement,
      volumeWater,
      volumeAdmixture,
      massAdmixture,
      volumeAggregate,
      massCoarseAggregate: massCoarseAggregate.toFixed(2),
      massFineAggregate: massFineAggregate.toFixed(2),
      mixProportion,
      minCementContent:
        parseFloat(proportionData.minCementContent) ||
        getMinCementContent(proportionData.exposureCondition),
      maxFreeWaterCementRatio:
        parseFloat(proportionData.maxFreeWaterCementRatio) ||
        getMaxWCRatio(proportionData.exposureCondition),
    },
  };
}

// Helper functions
function getStandardDeviation(fck) {
  // From standardDeviationTable
  const grade = `M${Math.floor(fck)}`;
  const entry = standardDeviationTable.find(e => e.grades.includes(grade));
  return entry ? entry.stdDeviation : 5.0; // Default
}

function getFactorX(fck) {
  const grade = `M${Math.floor(fck)}`;
  const entry = valueOfXTable.find(e => e.grades.includes(grade));
  return entry ? entry.value : 6.5; // Default
}

function getWaterContent(maxNominalSize) {
  const entry = waterContentTable.find(e => e.aggregateSize === maxNominalSize);
  return entry ? entry.waterContent : 200; // Default
}

function getEntrappedAir(maxNominalSize) {
  const entry = airContentTable.find(e => e.aggregateSize === maxNominalSize);
  return entry ? entry.entrappedAir : 1.0; // Default
}

function getMaxWCRatio(exposureCondition) {
  const entry = exposureConditions.find(e => e.exposure === exposureCondition);
  return entry ? entry.maxWCRatio : 0.55; // Default
}

function getMinCementContent(exposureCondition) {
  const entry = exposureConditions.find(e => e.exposure === exposureCondition);
  return entry ? entry.minCementContent : 300; // Default
}

function getP1FromZone(maxNominalSize, zone) {
  const entry = zoneTable.find(e => e.aggregateSize === maxNominalSize);

  if (!entry) {
    return 0.62; // Default to 20 mm, Zone II
  }

  const zoneKeyMap = {
    I: "zoneI",
    II: "zoneII",
    III: "zoneIII",
    IV: "zoneIV",
  };

  const zoneKey = zoneKeyMap[zone];
  return (zoneKey && entry.zones[zoneKey]) || entry.zones.zoneII;
}
