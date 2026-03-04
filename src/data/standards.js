const STANDARDS = {
  compressive_strength: {
    id: "compressive_strength",
    name: "Compressive Strength Test",
    unit: "N/mm²",
    description: "Evaluates the ability of concrete/material to resist loads that tend to reduce size.",
    commonInputs: [
      { id:'client', label: 'Client', type: 'text'},
      { id:'clientAddress', label: 'Client Address', type: 'text'},
      { id:'sampleIdentification', label: 'Sample Identification', type: 'text'},
      { id: 'dateCasting', label: 'Date of Casting', type: 'date' },
      { id: 'dateTesting', label: 'Date of Testing', type: 'date' },
      { id: 'curingCondition', label: 'Curing Condition', type: 'select', options: ['Accelerated', 'Normal Water Curing', 'Steam Curing', 'None','Other'] },
      {
        id: "specimenSize",
        label: "Specimen Size",
        type: "select",
        options: ["150x150x150", "100x100x100"],
      },
    ],

    specimenInputs: [
      { id: 'specimenId', label: 'Specimen Identification', type: 'text', placeholder: 'e.g., CUBE-001' },
      { id: 'weight', label: 'Weight of Specimen (kg)', type: 'number', placeholder: 'e.g., 8.25' },
      { id: 'load', label: 'Maximum Load Applied (kN)', type: 'number', placeholder: 'e.g., 650' },
      { id: 'fractureType', label: 'Appearance & Type of Fracture', type: 'select', options: ['Explosive','Crushing', 'Shear', 'Splitting', 'Cone and Shear', 'Cone and Split','Other'] }
    ],
  },
  
  compressiveStrengthof_PaverBlock:{
    id: "compressiveStrengthof_PaverBlock",
    name: "Compressive Stregth of Paver block",
    description: "Evaluates the unit's capacity to resist vertical crushing and deformation under heavy traffic loading.",
    commonInputs: [
      { id:'client', label: 'Client', type: 'text'},
      { id:'clientAddress', label: 'Client Address', type: 'text'},
      { id:'sampleIdentification', label: 'Sample Identification', type: 'text'},
      { id:'grade', label: 'Grade', type: 'text'},
      { id:'stdDeviation', label: 'Standard Deviation', type: 'text'},
      { id:'length', label: 'Length (mm)', type: 'text'},
      { id:'width', label: 'Width (mm)', type: 'text'},
      { id:'thickness', label: 'Thickness (mm)', type: 'text'},
      { id:'planArea', label: 'Plan Area (mm²)', type: 'text'},
      { id: 'dateCasting', label: 'Date of Casting', type: 'date' },
      { id: 'dateTesting', label: 'Date of Testing', type: 'date' },
      { id: 'curingCondition', label: 'Curing Condition', type: 'select', options: ['Accelerated', 'Normal Water Curing', 'Steam Curing', 'None','Other'] },
    ],

    specimenInputs: [
      { id: 'specimenId', label: 'Specimen Identification', type: 'text', placeholder: 'e.g., CUBE-001' },
      { id: 'weight', label: 'Weight of Specimen (kg)', type: 'number', placeholder: 'e.g., 8.25' },
      { id: 'load', label: 'Maximum Load Applied (kN)', type: 'number', placeholder: 'e.g., 650' },
      { id: 'fractureType', label: 'Appearance & Type of Fracture', type: 'select', options: ['Explosive', 'Shear','Crushing', 'Splitting', 'Cone and Shear', 'Cone and Split','Other'] }
    ],
  }
};

export default STANDARDS;