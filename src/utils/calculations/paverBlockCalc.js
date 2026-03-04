import STANDARDS from "../../data/standards.js";

const calculateResult = (testId, inputs) => {
  const standard = STANDARDS[testId];

  const { commonData, specimens } = inputs;
  const grade = commonData?.grade || "";
  const fck = parseInt(grade.replace(/\D/g, ""), 10) || 0;
  const stdDev = parseFloat(commonData?.stdDeviation || 5);

  const area = parseFloat(commonData?.planArea || 0);
  const thickness = parseFloat(commonData?.thickness || 0);

  let ageOfSpecimen = null;
  const { dateCasting, dateTesting } = commonData || {};
  if (dateCasting && dateTesting) {
    ageOfSpecimen = Math.round(
      (new Date(dateTesting) - new Date(dateCasting)) / (1000 * 60 * 60 * 24),
    );
  }

  const correctionFactors = {
    50: 1.03,
    60: 1.06,
    80: 1.18,
    100: 1.24,
    120: 1.34,
  };

  const calculatedSpecimens = specimens.map((s) => {
    const load = parseFloat(s.load || 0);
    const strength = area ? (load * 1000) / area : 0;
    const correctedStrength = strength * (correctionFactors[thickness] || 1);

    return {
      ...s,
      strength: Number(strength.toFixed(2)),
      correctedStrength: Number(correctedStrength.toFixed(2)),
    };
  });

  const correctedStrengthValues = calculatedSpecimens
    .map((s) => s.correctedStrength)
    .filter((v) => v > 0);

  const avgCorrectedStrength =
    correctedStrengthValues.length > 0
      ? correctedStrengthValues.reduce((a, b) => a + b, 0) / correctedStrengthValues.length
      : 0;

  const formattedValue = avgCorrectedStrength.toFixed(2);

  const lowerLimit = fck - 3;
  const lowerLimit1 = fck + 0.825 * stdDev;
  const lowerLimit2 = fck + 3;
  const acceptanceLimit = Math.max(lowerLimit1, lowerLimit2);

  let status = "PASS";
  let message = "The material meets the required structural standards.";
  let color = "text-green-600";

  const evaluatedSpecimens = calculatedSpecimens.map((s) => ({
    ...s,
    isOutOfRange: s.correctedStrength < lowerLimit,
  }));

  const failedSpecimens = evaluatedSpecimens.filter((s) => s.isOutOfRange);

  const hasSpecimenFailure = failedSpecimens.length > 0;
  const hasAverageFailure =
    !hasSpecimenFailure && Number(formattedValue) < acceptanceLimit;

  if (hasSpecimenFailure) {
    status = "FAIL";
    color = "text-red-600";
    const failedIds = failedSpecimens.map((s) => s.specimenId).join(", ");
    message = `Specimen(s) ${failedIds} failed the minimum corrected strength criteria.`;
  } else if (hasAverageFailure) {
    status = "FAIL";
    color = "text-red-600";
    message = "Average corrected strength is less than the required acceptance limit.";
  }

  const displaySpecimens = evaluatedSpecimens.map((s) => ({
    ...s,
    correctedStrengthDisplay: s.isOutOfRange ? "Note1" : s.correctedStrength,
  }));

  const averageDisplay = hasSpecimenFailure
    ? ""
    : hasAverageFailure
      ? "Note2"
      : formattedValue;

  return {
    ...standard,
    calculatedValue: formattedValue,
    averageDisplay,
    hasSpecimenFailure,
    hasAverageFailure,
    status,
    message,
    color,
    ageofSpecimen: ageOfSpecimen,
    formData: inputs,
    areaUsed: area,
    specimens: displaySpecimens,
  };
};

export default calculateResult;
