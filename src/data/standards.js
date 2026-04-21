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
  },

  cement_Test:{
    id: "cement_Test",
    name: "Cement Test",
    description: "About Cement test",
    commonInputs: [
      { id: 'client', label: 'Client', type: 'text'},
      { id: 'clientAddress', label: 'Client Address', type: 'text'},
      { id: 'sampleIdentification', label: 'Sample Identification', type: 'text'},
      { id: 'cementGrade', label: 'Grade of Cement', type: 'text'},
      { id: 'cementBrand', label: 'Brand of Cement', type: 'text'},
      { id: 'consistency', label: 'Consistency (%)', type: 'text'},
      { id: 'initialST', label: 'Initial Setting Time (mins)', type: 'text'},
      { id: 'finalST', label: 'Final Setting Time (mins)', type: 'text'},
      {
        id: "specimenSize",
        label: "Specimen Size",
        type: "select",
        options: ["150X150X150"],
      },
      
    ],
    specimenInputs: [
      { id: 'specimenId', label: 'Specimen Identification', type: 'text', placeholder:'e.g., Cement-01'},
      { id: 'maxLoad3d', label: 'Maximum Load after 3 days (KN)', type: 'number'},
      { id: 'maxLoad7d', label: 'Maximum Load after 7 days (KN)', type: 'number'},
      { id: 'maxLoad28d', label: 'Maximum Load after 28 days (KN)', type: 'number'},
    ],
  },

  compressiveStrengthof_Brick:{
    id: "compressiveStrengthof_Brick",
    name: "Compressive Strength of Brick",
    description: "About compressive strength test of brick",
    commonInputs: [
      { id: 'client', label: 'Client', type: 'text'},
      { id: 'clientAddress', label: 'Client Address', type: 'text'},
      { id: 'sampleIdentification', label: 'Sample Identification', type: 'text'},
      { id: 'dateTesting', label: 'Date of Testing', type: 'date' },
    ],
    specimenInputs: [
      { id: "specimenId", label:"Specimen Identification", type: "text", placeholder: "e.g., BRICK-01"},
      { id: "specimenSize", label:"Specimen Size (mm)", type: "select", options:['190*90*90', '190*90*40','230*110*70','230*110*30', 'Other']},
      { id: "dryWeight", label:"Dry Weight (kg)", type: "text"},
      { id: "wetWeight", label:"Wet Weight (kg)", type: "text"},
      { id: "maxLoad", label:"Max Load (N)", type: "text"},
    ]
  },

  tileTest: {
    id: "tileTest",
    name: "Tile Test",
    description: "Evaluates various properties of tiles including dimensions, water absorption, and crazing resistance.",
    commonInputs: [
      { id: 'client', label: 'Client', type: 'text' },
      { id: 'clientAddress', label: 'Client Address', type: 'text' },
      { id: 'sampleIdentification', label: 'Sample Identification', type: 'text' },
      { id: 'dateTesting', label: 'Date of Testing', type: 'date' },
      { id: 'remarks', label: 'Remarks', type: 'text' },
    ],
    subtests: [
      {
        id: "dimension",
        name: "Dimension Test",
        enabled: false,
        inputs: [
          { id: 'side1length', label: 'Length of Side1 (mm)', type: 'number', placeholder: 'e.g., 200' },
          { id: 'side2length', label: 'Length of Side2 (mm)', type: 'number', placeholder: 'e.g., 200' },
          { id: 'side1width', label: 'Width of Side1 (mm)', type: 'number', placeholder: 'e.g., 100' },
          { id: 'side2width', label: 'Width of Side2 (mm)', type: 'number', placeholder: 'e.g., 100' },
          { id: 'side1thickness', label: 'Thickness of Side1 (mm)', type: 'number', placeholder: 'e.g., 10' },
          { id: 'side2thickness', label: 'Thickness of Side2 (mm)', type: 'number', placeholder: 'e.g., 10' },
          { id: 'side3thickness', label: 'Thickness of Side3 (mm)', type: 'number', placeholder: 'e.g., 10' },
          { id: 'side4thickness', label: 'Thickness of Side4 (mm)', type: 'number', placeholder: 'e.g., 10' }
        ]
      },
      {
        id: "waterAbsorption",
        name: "Water Absorption Test",
        enabled: false,
        inputs: [
          { id: "specimenId", label:"Specimen Identification", type: "text", placeholder: "e.g., Tile-01"},
          { id: "specimenSize", label:"Specimen Size (mm)", type: "text", placeholder: "e.g., 100x100"},
          { id: 'dryWeight', label: 'Dry Weight (g)', type: 'number', placeholder: 'e.g., 500' },
          { id: 'wetWeight', label: 'Wet Weight (g)', type: 'number', placeholder: 'e.g., 520' },
          { id: 'suspendedWeight', label: 'Suspended Weight (g)', type: 'number', placeholder: 'e.g., 510' },
        ]
      },
      {
        id: "crazingResistance",
        name: "Crazing Resistance Test",
        enabled: false,
        inputs: [
          { id: "specimenId", label:"Specimen Identification", type: "text", placeholder: "e.g., Tile-01"},
          { id: "specimenSize", label:"Specimen Size (mm)", type: "text", placeholder: "e.g., 100x100"},
          { id: "remarks", label:"Remarks", type: "text"},
          { id: "description", label:"Description of Crazing", type: "text"},
        ]
      },
      {
        id: "rupture",
        name: "Modulus of Rupture Test",
        enabled: false,
        inputs: [
          { id: "specimenId", label:"Specimen Identification", type: "text", placeholder: "e.g., Tile-01"},
          { id: "length", label:"Length (mm)", type: "text", placeholder: "e.g., 100"},
          { id: "breadth", label:"Breadth (mm)", type: "text", placeholder: "e.g., 100"},
          { id: "thickness", label:"Thickness (mm)", type: "text", placeholder: "e.g., 10"},
          { id: "breakingLoad", label:"Breaking Load (N)", type: "text"}
        ]
      }
    ]
  },

  concreteMixTest: {
    id: "concreteMixTest",
    name: "Concrete Mix Design",
    description: "Capture client details, proportioning stipulations, and material test data for concrete mix design.",
    commonInputs: [
      { id: 'client', label: 'Client', type: 'text' },
      { id: 'clientAddress', label: 'Client Address', type: 'text' },
      { id: 'projectName', label: 'Project Name', type: 'text' },
      { id: 'sampleIdentification', label: 'Sample Identification', type: 'text' },
      { id: 'testStandard', label: 'Test Standard', type: 'text' },
      { id: 'dateCasting', label: 'Date of Casting', type: 'date' },
      { id: 'dateTesting', label: 'Date of Testing', type: 'date' },
    ],
  }
};

export default STANDARDS;

