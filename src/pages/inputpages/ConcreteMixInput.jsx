import React, { useEffect, useState } from "react";
import { Building, SlidersHorizontal, ClipboardList } from "lucide-react";
import STANDARDS from "../../data/standards.js";
import InputSidebar from "../../components/InputSidebar.jsx";

const tabList = [
  { id: "details", label: "Client & Common Details", icon: Building },
  { id: "proportioning", label: "Stipulations for Proportioning", icon: SlidersHorizontal },
  { id: "materials", label: "Material Test Data", icon: ClipboardList },
];

const initialMaterials = [
  { material: "Cement", quantity: "", unit: "kg" },
  { material: "Fine Aggregate", quantity: "", unit: "kg" },
  { material: "Coarse Aggregate", quantity: "", unit: "kg" },
  { material: "Water", quantity: "", unit: "L" },
  { material: "Admixture", quantity: "", unit: "mL" },
];

const ConcreteMixInput = ({ testId, onSubmit }) => {
  const test = STANDARDS[testId];
  const storageKey = `concreteMixInput:${testId}`;

  const [activeTab, setActiveTab] = useState("details");
  const [commonData, setCommonData] = useState({
    client: "",
    clientAddress: "",
    periodStart: "",
    periodEnd: "",
    brandOfCement: "",
    manufacturingDate: "",
    sourceCoarseAggregate: "",
    sourceFineAggregate: "",
  });

  const [proportionData, setProportionData] = useState({
    gradeDesignation: "",
    exposureCondition: "",
    methodOfPlacing: "",
    shapeOfAggregate: "",
    admixtureType: "",
    characteristicStrength: "",
    maxNominalSize: "",
    slump: "",
    waterCementRatio: "",
    factorX: "",
    airContent: "",
    standardDeviation: "",
    minCementContent: "",
    maxFreeWaterCementRatio: "",
  });

  const [materialData, setMaterialData] = useState({
    cementType: "",
    cementGrade: "",
    initialST: "",
    finalST: "",
    cement3DayStrength: "",
    cement7DayStrength: "",
    cement28DayStrength: "",
    sgCement: "",
    sgCoarseAggregateSSD: "",
    sgFineAggregateSSD: "",
    sgAdmixture: "",
    waterAbsorptionCoarse: "",
    waterAbsorptionFine: "",
    moistureContentCoarse: "",
    moistureContentFine: "",
    zoneFineAggregate: "",
    cube7DayStrength: "",
    cube28DayStrength: "",
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return;

      const parsed = JSON.parse(saved);

      if (parsed?.activeTab) {
        setActiveTab(parsed.activeTab);
      }
      if (parsed?.commonData) {
        setCommonData((prev) => ({ ...prev, ...parsed.commonData }));
      }
      if (parsed?.proportionData) {
        setProportionData((prev) => ({ ...prev, ...parsed.proportionData }));
      }
      if (parsed?.materialData) {
        setMaterialData((prev) => ({ ...prev, ...parsed.materialData }));
      }
    } catch (error) {
      console.error("Failed to restore saved concrete mix input:", error);
    }
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          activeTab,
          commonData,
          proportionData,
          materialData,
        }),
      );
    } catch (error) {
      console.error("Failed to save concrete mix input:", error);
    }
  }, [storageKey, activeTab, commonData, proportionData, materialData]);

  const updateCommonData = (field, value) => {
    setCommonData((prev) => ({ ...prev, [field]: value }));
  };

  const updateProportionData = (field, value) => {
    setProportionData((prev) => ({ ...prev, [field]: value }));
  };

  const updateMaterialData = (field, value) => {
    setMaterialData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      commonData,
      proportionData,
      materialData,
    };

    if (onSubmit) {
      onSubmit(testId, payload);
    }
  };

  if (!test) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-sm border border-red-200">
        <p className="text-red-700 font-semibold">Invalid test selected.</p>
      </div>
    );
  }

  const activeTabLabel = tabList.find((tab) => tab.id === activeTab)?.label || "Unknown section";
  const currentStep = tabList.findIndex((tab) => tab.id === activeTab) + 1;

  return (
    <>
      <style>{`
        .concrete-mix-input input[type="number"]::-webkit-outer-spin-button,
        .concrete-mix-input input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .concrete-mix-input input[type="number"] {
          -moz-appearance: textfield;
          appearance: textfield;
        }
      `}</style>
    <div className="concrete-mix-input max-w-6xl mx-auto p-4 md:p-8 space-y-6 bg-slate-50 min-h-screen">
      <div className="bg-white border-l-4 border-blue-600 p-6 rounded-r-xl shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">{test.name}</h1>
        <p className="text-slate-500 mt-2">Enter all required details in the three tabs below.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.45fr_0.75fr]">
      <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-between items-stretch">
          {tabList.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 rounded-2xl px-4 py-3 text-left transition-all border ${
                  isActive
                    ? "border-blue-500 bg-blue-50 text-slate-900 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon size={16} />
                  <span className="text-xs font-semibold uppercase tracking-[0.22em]">
                    {tab.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {activeTab === "details" && (
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-2 mb-4 text-slate-700">
              <Building size={18} />
              <h2 className="text-sm font-bold uppercase tracking-[0.2em]">Client & Common Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: "client", label: "Client", type: "text" },
                { id: "clientAddress", label: "Client Address", type: "text" },
                { id: "periodStart", label: "Starting Date", type: "date" },
                { id: "periodEnd", label: "Ending Date", type: "date" },
                { id: "brandOfCement", label: "Brand of Cement", type: "text" },
                { id: "manufacturingDate", label: "Manufacturing Date", type: "date" },
                { id: "sourceCoarseAggregate", label: "Source of Coarse Aggregate", type: "text" },
                { id: "sourceFineAggregate", label: "Source of Fine Aggregate", type: "text" },
              ].map((input) => (
                <label key={input.id} className="block text-sm text-slate-700">
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] mb-2">{input.label}</span>
                  <input
                    required
                    type={input.type}
                    value={commonData[input.id]}
                    onChange={(e) => updateCommonData(input.id, e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </label>
              ))}
            </div>
          </section>
        )}

        {activeTab === "proportioning" && (
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-2 mb-4 text-slate-700">
              <SlidersHorizontal size={18} />
              <h2 className="text-sm font-bold uppercase tracking-[0.2em]">Stipulations for Proportioning</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: "gradeDesignation", label: "Grade Designation", type: "text" },
                { id: "exposureCondition", label: "Exposure Condition", type: "select", options:['Mild', 'Moderate', 'Severe', 'Very Severe', 'Extreme'] },
                { id: "methodOfPlacing", label: "Method of Concrete Placing", type: "select", options:['Pumpable', 'Non-Pumpable'] },
                { id: "shapeOfAggregate", label: "Shape of Aggregate", type: "text" },
                { id: "admixtureType", label: "Chemical Admixture Type", type: "select", options: ["Water reducing", "Super plasticizer"] },
                { id: "characteristicStrength", label: "Characteristic Compressive Strength, fck (MPa)", type: "number", step: "any" },
                { id: "maxNominalSize", label: "Maximum Nominal Size of Aggregate (mm)", type: "number", step: "any" },
                { id: "slump", label: "Slump (mm)", type: "number", step: "any" },
                { id: "waterCementRatio", label: "Water Cement Ratio", type: "number", step: "any" },
                { id: "sgAdmixture", label: "Specific Gravity of Chemical Admixture", type: "number", step: "any" },
              ].map((input) => (
                <label key={input.id} className="block text-sm text-slate-700">
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] mb-2">{input.label}</span>

                  {input.type === "select" ? (
                    <select
                      required
                      value={proportionData[input.id] || ""}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm font-medium"
                      onChange={(e) => updateProportionData(input.id, e.target.value)}
                    >
                      <option value="">Select {input.label}</option>
                      {input.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      required
                      type={input.type}
                      step={input.step || "any"}
                      placeholder={input.placeholder || ""}
                      value={proportionData[input.id]}
                      onChange={(e) => updateProportionData(input.id, e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                  )}
                </label>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-700">Optional Entries</h3>
                  <p className="text-xs text-slate-500">Leave blank to use default values from the concrete mix design table data.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {[
                  { id: "factorX", label: "Factor X", type: "number", step: "any" },
                  { id: "airContent", label: "Air Content (%)", type: "number", step: "any" },
                  { id: "standardDeviation", label: "Standard Deviation, S (MPa)", type: "number", step: "any" },
                  { id: "minCementContent", label: "Minimum Cement Content (kg/m³)", type: "number", step: "any" },
                  { id: "maxFreeWaterCementRatio", label: "Maximum Free Water-Cement Ratio", type: "text", placeholder: "e.g., 0.45" },
                ].map((input) => (
                  <label key={input.id} className="block text-sm text-slate-700">
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] mb-2">{input.label}</span>
                    <input
                      type={input.type}
                      step={input.step || "any"}
                      placeholder={input.placeholder || ""}
                      value={proportionData[input.id]}
                      onChange={(e) => updateProportionData(input.id, e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === "materials" && (
          <section className="grid gap-6 xl:grid-cols-3">
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <ClipboardList size={20} className="text-blue-600" />
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Cement Inputs & Test Results</h2>
                  <p className="text-sm text-slate-500 mt-1">Enter the cement lab values, setting times, and strength readings.</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { id: "cementType", label: "Cement Type", type: "text" },
                  { id: "cementGrade", label: "Cement Grade", type: "text" },
                  { id: "initialST", label: "Initial Setting Time (mins)", type: "text" },
                  { id: "finalST", label: "Final Setting Time (mins)", type: "text" },
                  { id: "cement3DayStrength", label: "3 Day Compressive Strength (MPa)", type: "number", step: "any" },
                  { id: "cement7DayStrength", label: "7 Day Compressive Strength (MPa)", type: "number", step: "any" },
                  { id: "cement28DayStrength", label: "28 Day Compressive Strength (MPa)", type: "number", step: "any" },
                  { id: "sgCement", label: "Specific Gravity of Cement", type: "text" },
                ].map((field) => (
                  <label key={field.id} className="block text-sm text-slate-700">
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] mb-2">{field.label}</span>
                    <input
                      required
                      type={field.type}
                      step={field.step || "any"}
                      value={materialData[field.id]}
                      onChange={(e) => updateMaterialData(field.id, e.target.value)}
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <ClipboardList size={20} className="text-emerald-600" />
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Aggregate Details</h2>
                  <p className="text-sm text-slate-500 mt-1">Capture coarse and fine aggregate properties used in mix proportioning.</p>
                </div>
              </div>
              <div className="grid gap-4">
                {[
                  { id: "sgCoarseAggregateSSD", label: "SG of Coarse Aggregate (SSD)", type: "number", step: "any" },
                  { id: "sgFineAggregateSSD", label: "SG of Fine Aggregate (SSD)", type: "number", step: "any" },
                  { id: "waterAbsorptionCoarse", label: "Water Absorption of Coarse Aggregate (%)", type: "number", step: "any" },
                  { id: "waterAbsorptionFine", label: "Water Absorption of Fine Aggregate (%)", type: "number", step: "any" },
                  { id: "moistureContentCoarse", label: "Moisture Content of Coarse Aggregate (%)", type: "number", step: "any" },
                  { id: "moistureContentFine", label: "Moisture Content of Fine Aggregate (%)", type: "number", step: "any" },
                  { id: "zoneFineAggregate", label: "Zone of Fine Aggregate", type: "select", options: ['I', 'II', 'III', 'IV'] },
                ].map((field) => (
                  <label key={field.id} className="block text-sm text-slate-700">
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] mb-2">{field.label}</span>

                    {field.type === "select" ? (
                      <select
                        required
                        value={materialData[field.id] || ""}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm font-medium"
                        onChange={(e) => updateMaterialData(field.id, e.target.value)}
                      >
                        <option value="">Select {field.label}</option>
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        required
                        type={field.type}
                        step={field.step || "any"}
                        placeholder={field.placeholder || ""}
                        value={materialData[field.id]}
                        onChange={(e) => updateMaterialData(field.id, e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      />
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <ClipboardList size={20} className="text-violet-600" />
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Cube Test Results</h2>
                  <p className="text-sm text-slate-500 mt-1">Store cube identification, curing details, and additional observations.</p>
                </div>
              </div>
              <div className="grid gap-4">
                {[
                  { id: "cube7DayStrength", label: "7 Day Compressive Strength (MPa)", type: "number", step: "any" },
                  { id: "cube28DayStrength", label: "28 Day Compressive Strength (MPa)", type: "number", step: "any" },
                ].map((field) => (
                  <label key={field.id} className="block text-sm text-slate-700">
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] mb-2">{field.label}</span>
                    <input
                      required
                      type={field.type}
                      step={field.step || "any"}
                      value={materialData[field.id]}
                      onChange={(e) => updateMaterialData(field.id, e.target.value)}
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>
                ))}
              </div>
            </div>
          </section>

        )}

        <div className="flex flex-col gap-3 md:flex-row justify-end items-center">
          <button
            type="button"
            onClick={() => {
              const nextIndex = tabList.findIndex((tab) => tab.id === activeTab) - 1;
              if (nextIndex >= 0) {
                setActiveTab(tabList[nextIndex].id);
              }
            }}
            disabled={activeTab === "details"}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50"
          >
            Back
          </button>

          {activeTab !== "materials" ? (
            <button
              type="button"
              onClick={() => {
                const nextIndex = tabList.findIndex((tab) => tab.id === activeTab) + 1;
                if (nextIndex < tabList.length) {
                  setActiveTab(tabList[nextIndex].id);
                }
              }}
              className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Submit Mix Design Data
            </button>
          )}
        </div>
      </form>
      </div>

      <InputSidebar
        summary="Work through the concrete mix design from left to right: project details first, proportioning stipulations second, and material test data last. Your entries are saved locally while you move between tabs."
        stats={[
          { label: "Sections", value: tabList.length },
          { label: "Current step", value: `${currentStep} / ${tabList.length}` },
          { label: "Active section", value: activeTabLabel, valueClassName: "text-blue-700" },
        ]}
        tips={[
          "Complete the tabs in order so the later material checks have the right context from the earlier design inputs.",
          "Optional proportioning entries can stay blank if you want the default table values to drive the mix design.",
          "Review dates, aggregate sources, and strength inputs before submit because this page feeds the full mix design report.",
        ]}
      />
      </div>
    </div>
    </>
  );
};

export default ConcreteMixInput;
