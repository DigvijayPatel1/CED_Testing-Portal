import STANDARDS from "../../data/standards.js";

const getAreaFromSize = (size) => {
  if (size === "150x150x150") return 22500;
  if (size === "100x100x100") return 10000;
  return 22500;
};

const calculateResult = (testId, inputs) => {
  const standard = STANDARDS[testId];

  // ✅ Multi cube payload
  const { commonData, specimens } = inputs;

  const area = getAreaFromSize(commonData?.specimenSize);
  
  let ageOfSpecimen = null;
  const { dateCasting, dateTesting } = commonData || {};
  if (dateCasting && dateTesting) {
    ageOfSpecimen = Math.round(
      (new Date(dateTesting) - new Date(dateCasting)) /
        (1000 * 60 * 60 * 24)
    );
  }

  // ✅ Calculate strength per cube
  const calculatedSpecimens = specimens.map((s) => {
    const load = parseFloat(s.load || 0);
    const strength = area ? (load * 1000) / area : 0;
    return {
      ...s,
      strength: Number(strength.toFixed(2)),
    };
  });

  // ✅ Average strength
  const strengthValues = calculatedSpecimens
    .map((s) => s.strength)
    .filter((v) => v > 0);

  const avgStrength =
    strengthValues.length > 0
      ? strengthValues.reduce((a, b) => a + b, 0) / strengthValues.length
      : 0;

  const formattedValue = avgStrength.toFixed(2);
   
  const lowerLimit = avgStrength * 0.85;
  const upperLimit = avgStrength * 1.15;

  // ✅ Status logic (based on avg)
  let status = "PASS";
  let message = "The material meets the required structural standards.";
  let color = "text-green-600";

  const evaluatedSpecimens = calculatedSpecimens.map((s) => ({
    ...s,
    isOutOfRange: s.strength < lowerLimit || s.strength > upperLimit,
  }));

  const failedSpecimens = evaluatedSpecimens.filter((s) => s.isOutOfRange);

  if (failedSpecimens.length > 0) {
    status = "FAIL";
    color = "text-red-600";

    const failedIds = failedSpecimens
      .map((s) => s.specimenId)
      .join(", ");

    message = `Specimen(s) ${failedIds} failed the ±15% variation criteria.`;
  }


  return {
    ...standard,
    calculatedValue: formattedValue,
    status,
    message,
    color,
    ageofSpecimen: ageOfSpecimen,
    formData: inputs,
    areaUsed: area,
    specimens: evaluatedSpecimens,
  };
};

export default calculateResult;

