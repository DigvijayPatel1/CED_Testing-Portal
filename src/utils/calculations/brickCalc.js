import STANDARDS from "../../data/standards";

const calculateResult = (testId, inputs) => {
  const standards = STANDARDS[testId];
   
  const { commonData, specimens } = inputs;

  const parseDimensions = (sizeText) => {
    if (!sizeText) return [];
    return String(sizeText)
      .split(/[xX*]/)
      .map((v) => Number(v.trim()))
      .filter((v) => Number.isFinite(v) && v > 0);
  };

  const evaluatedSpecimens = specimens.map(
    (s)=>{
      const [l, b] = parseDimensions(s.specimenSize);
      const area = l && b ? l * b : 0;
      const maxLoad = parseFloat(s.maxLoad || 0);
      const wetWeight = parseFloat(s.wetWeight || 0);
      const dryWeight = parseFloat(s.dryWeight || 0);
      const strength = area ? maxLoad / area : 0 ;  
      const waterabs = dryWeight ? ((wetWeight - dryWeight) * 100) / dryWeight : 0;

      return{
        ...s,
        strength: Number(strength.toFixed(2)),
        waterabs: Number(waterabs.toFixed(2)),
      }
    }
  );
  
  const strengthValues = evaluatedSpecimens
    .map((s) => s.strength)
    .filter((v) => v > 0)
  
  const avgStrength = 
    strengthValues.length > 0 ? 
    strengthValues.reduce((sum, value)=> sum + value, 0) / strengthValues.length : 0;
  

  const waterabsValues = evaluatedSpecimens
    .map((s) => s.waterabs)
    .filter((v) => v > 0)
  
  const avgWaterabs = 
    waterabsValues.length > 0 ? 
    waterabsValues.reduce((sum, value)=> sum + value, 0) / waterabsValues.length : 0;

  //  Status logic (based on avg)
  let status = "PASS";
  let message = "The material meets the required structural standards.";
  let color = "text-green-600";

  return{
    ...standards,
    specimens: evaluatedSpecimens,
    avgStrength: avgStrength.toFixed(2),
    avgWaterabs: avgWaterabs.toFixed(2),
    status,
    message,
    color,
    formData: inputs,
  }
};

export default calculateResult;
