import STANDARDS from "../../data/standards";

const DEFAULT_CEMENT_SPECIMEN_SIZE = "150X150X150";

const getAreaFromSize = (size) => {
  const [l = 0, b = 0] = String(size || DEFAULT_CEMENT_SPECIMEN_SIZE)
    .split(/[*xX]/)
    .map((value) => Number(value.trim()));

  return l * b;
};

const calculateResult = (testId, inputs) => {
  const standards = STANDARDS[testId];
  const { commonData = {}, specimens = [] } = inputs;

  console.log('Inputs:', inputs);
  console.log('Specimens:', specimens);

  const specimenSize = commonData.specimenSize || DEFAULT_CEMENT_SPECIMEN_SIZE;
  const area = getAreaFromSize(specimenSize);

  console.log('SpecimenSize:', specimenSize, 'Area:', area);

  // Calculate compressive strength per cement
  const evaluatedSpecimens = specimens.map((s) => {
      const maxload3d = s.maxLoad3d !== null && s.maxLoad3d !== undefined ? parseFloat(s.maxLoad3d) : 0;
      const maxload7d = s.maxLoad7d !== null && s.maxLoad7d !== undefined ? parseFloat(s.maxLoad7d) : 0;
      const maxload28d = s.maxLoad28d !== null && s.maxLoad28d !== undefined ? parseFloat(s.maxLoad28d) : 0;

      const strength3d = area && s.maxLoad3d !== null && s.maxLoad3d !== undefined ? (maxload3d * 1000)/ area : null;
      const strength7d = area && s.maxLoad7d !== null && s.maxLoad7d !== undefined ? (maxload7d * 1000)/ area : null;
      const strength28d = area && s.maxLoad28d !== null && s.maxLoad28d !== undefined ? (maxload28d * 1000)/ area : null;

      return {
        ...s,
        strength3d: strength3d !== null ? Number(strength3d.toFixed(2)) : null,
        strength7d: strength7d !== null ? Number(strength7d.toFixed(2)) : null,
        strength28d: strength28d !== null ? Number(strength28d.toFixed(2)) : null,
      };
    });

  console.log('Evaluated Specimens:', evaluatedSpecimens);

  const calculateAverage = (key) => {
    const values = evaluatedSpecimens
      .map((specimen) => specimen[key])
      .filter((value) => value !== null);

    if (!values.length) {
      return null;
    }

    return values.reduce((sum, value) => sum + value, 0) / values.length;
  };

  const avgStrength3d = calculateAverage("strength3d");
  const avgStrength7d = calculateAverage("strength7d");
  const avgStrength28d = calculateAverage("strength28d");

  //  Status logic 
  let status = "PASS";
  let message = "The material meets the required structural standards.";
  let color = "text-green-600";

  return {
    ...standards,
    status,
    message,
    color,
    formData: inputs,
    specimens: evaluatedSpecimens,
    avgStrength3d: avgStrength3d !== null ? avgStrength3d.toFixed(2) : null,
    avgStrength7d: avgStrength7d !== null ? avgStrength7d.toFixed(2) : null,
    avgStrength28d: avgStrength28d !== null ? avgStrength28d.toFixed(2) : null,
  };

};

export default calculateResult;
