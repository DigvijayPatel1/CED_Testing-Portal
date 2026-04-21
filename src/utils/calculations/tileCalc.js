// tileCalc.js
import STANDARDS from "../../data/standards.js";

export const calculateTile = (common, specimenCount) => {
  const sampleId = common?.sampleIdentification || 'N/A';
  const dateTesting = common?.dateTesting || 'unknown date';
  return {
    result: `Tile test prepared for sample ${sampleId} on ${dateTesting} with ${specimenCount} specimen${specimenCount === 1 ? '' : 's'}`,
  };
};

// Helper function to calculate dimension values
const calculateDimensionValues = (dimension) => {
  if (!dimension) return {};
  
  const lengthAvg = dimension.side1length && dimension.side2length 
    ? ((parseFloat(dimension.side1length) + parseFloat(dimension.side2length)) / 2)
    : null;
  
  const widthAvg = dimension.side1width && dimension.side2width 
    ? ((parseFloat(dimension.side1width) + parseFloat(dimension.side2width)) / 2)
    : null;
  
  const thicknessAvg = dimension.side1thickness && dimension.side2thickness && dimension.side3thickness && dimension.side4thickness
    ? ((parseFloat(dimension.side1thickness) + parseFloat(dimension.side2thickness) + parseFloat(dimension.side3thickness) + parseFloat(dimension.side4thickness)) / 4)
    : null;

  return {
    side1length: dimension.side1length ? parseFloat(dimension.side1length).toFixed(1) : "—",
    side2length: dimension.side2length ? parseFloat(dimension.side2length).toFixed(1) : "—",
    lengthAvg: lengthAvg ? lengthAvg.toFixed(1) : "—",
    side1width: dimension.side1width ? parseFloat(dimension.side1width).toFixed(1) : "—",
    side2width: dimension.side2width ? parseFloat(dimension.side2width).toFixed(1) : "—",
    widthAvg: widthAvg ? widthAvg.toFixed(1) : "—",
    side1thickness: dimension.side1thickness ? parseFloat(dimension.side1thickness).toFixed(1) : "—",
    side2thickness: dimension.side2thickness ? parseFloat(dimension.side2thickness).toFixed(1) : "—",
    side3thickness: dimension.side3thickness ? parseFloat(dimension.side3thickness).toFixed(1) : "—",
    side4thickness: dimension.side4thickness ? parseFloat(dimension.side4thickness).toFixed(1) : "—",
    thicknessAvg: thicknessAvg ? thicknessAvg.toFixed(1) : "—",
  };
};

// Helper function to calculate water absorption values
const calculateWaterAbsorptionValues = (waterAbsorption) => {
  if (!waterAbsorption) return {};
  
  const dry = waterAbsorption.dryWeight ? parseFloat(waterAbsorption.dryWeight) : null;
  const wet = waterAbsorption.wetWeight ? parseFloat(waterAbsorption.wetWeight) : null;
  const suspended = waterAbsorption.suspendedWeight ? parseFloat(waterAbsorption.suspendedWeight) : null;
  
  let absorption = null;
  if (dry && wet && dry > 0) {
    absorption = ((wet - dry) / dry) * 100;
  }

  return {
    dryWeight: dry ? dry.toFixed(2) : "—",
    wetWeight: wet ? wet.toFixed(2) : "—",
    suspendedWeight: suspended ? suspended.toFixed(2) : "—",
    absorption: absorption ? absorption.toFixed(2) : "—",
  };
};

// Helper function to calculate rupture test values
const calculateRuptureValues = (rupture) => {
  if (!rupture) return {};
  
  const length = rupture.length ? parseFloat(rupture.length) : null;
  const breadth = rupture.breadth ? parseFloat(rupture.breadth) : null;
  const thickness = rupture.thickness ? parseFloat(rupture.thickness) : null;
  const breakingLoad = rupture.breakingLoad ? parseFloat(rupture.breakingLoad) : null;
  
  let breakingStrength = null;
  let modulusOfRupture = null;
  
  if (length && breadth && breakingLoad && length > 0 && breadth > 0 && breakingLoad > 0) {
    breakingStrength = (breakingLoad * length) / breadth;
  }
  
  if (length && breadth && thickness && breakingLoad && 
      length > 0 && breadth > 0 && thickness > 0 && breakingLoad > 0) {
    modulusOfRupture = (3 * breakingLoad * length) / (2 * breadth * (thickness * thickness));
  }

  return {
    length: length ? length.toFixed(1) : "—",
    breadth: breadth ? breadth.toFixed(1) : "—",
    thickness: thickness ? thickness.toFixed(1) : "—",
    breakingLoad: breakingLoad ? breakingLoad.toFixed(2) : "—",
    breakingStrength: breakingStrength ? breakingStrength.toFixed(2) : "—",
    modulusOfRupture: modulusOfRupture ? modulusOfRupture.toFixed(2) : "—",
  };
};

export const calculateTileWithSubtests = (inputs) => {
  const { common, subtests, specimens = [] } = inputs;
  const tileConfig = STANDARDS.tileTest;
  
  const evaluatedSpecimens = specimens.map((specimen) => {
    const evaluated = { ...specimen };
    
    if (subtests.dimension?.enabled && specimen.dimension) {
      evaluated.dimensionCalc = calculateDimensionValues(specimen.dimension);
    }
    
    if (subtests.waterAbsorption?.enabled && specimen.waterAbsorption) {
      evaluated.waterAbsorptionCalc = calculateWaterAbsorptionValues(specimen.waterAbsorption);
    }
    
    if (subtests.rupture?.enabled && specimen.rupture) {
      evaluated.ruptureCalc = calculateRuptureValues(specimen.rupture);
    }
    
    return evaluated;
  });

  // Calculate averages for dimension
  let dimensionAverages = {};
  if (subtests.dimension?.enabled) {
    const lengthAvgs = evaluatedSpecimens
      .map(s => s.dimensionCalc?.lengthAvg)
      .filter(v => v && v !== "—")
      .map(v => parseFloat(v));
    
    const widthAvgs = evaluatedSpecimens
      .map(s => s.dimensionCalc?.widthAvg)
      .filter(v => v && v !== "—")
      .map(v => parseFloat(v));
    
    const thicknessAvgs = evaluatedSpecimens
      .map(s => s.dimensionCalc?.thicknessAvg)
      .filter(v => v && v !== "—")
      .map(v => parseFloat(v));

    dimensionAverages.lengthAvg = lengthAvgs.length > 0 ? (lengthAvgs.reduce((a, b) => a + b) / lengthAvgs.length).toFixed(1) : "—";
    dimensionAverages.widthAvg = widthAvgs.length > 0 ? (widthAvgs.reduce((a, b) => a + b) / widthAvgs.length).toFixed(1) : "—";
    dimensionAverages.thicknessAvg = thicknessAvgs.length > 0 ? (thicknessAvgs.reduce((a, b) => a + b) / thicknessAvgs.length).toFixed(1) : "—";
  }

  // Calculate average water absorption
  let waterAbsorptionAverage = "—";
  if (subtests.waterAbsorption?.enabled) {
    const absorptions = evaluatedSpecimens
      .map(s => s.waterAbsorptionCalc?.absorption)
      .filter(v => v && v !== "—")
      .map(v => parseFloat(v));
    
    waterAbsorptionAverage = absorptions.length > 0 ? (absorptions.reduce((a, b) => a + b) / absorptions.length).toFixed(2) : "—";
  }

  // Calculate average breaking strength and modulus of rupture
  let ruptureAverages = {};
  if (subtests.rupture?.enabled) {
    const breakingStrengths = evaluatedSpecimens
      .map(s => s.ruptureCalc?.breakingStrength)
      .filter(v => v && v !== "—")
      .map(v => parseFloat(v));
    
    const moduli = evaluatedSpecimens
      .map(s => s.ruptureCalc?.modulusOfRupture)
      .filter(v => v && v !== "—")
      .map(v => parseFloat(v));

    ruptureAverages.breakingStrengthAvg = breakingStrengths.length > 0 ? (breakingStrengths.reduce((a, b) => a + b) / breakingStrengths.length).toFixed(2) : "—";
    ruptureAverages.modulusAvg = moduli.length > 0 ? (moduli.reduce((a, b) => a + b) / moduli.length).toFixed(2) : "—";
  }

  return {
    tileName: tileConfig.name,
    common,
    subtests,
    specimens: evaluatedSpecimens,
    averages: {
      dimension: dimensionAverages,
      waterAbsorption: waterAbsorptionAverage,
      rupture: ruptureAverages,
    },
  };
};

export default calculateTileWithSubtests;
