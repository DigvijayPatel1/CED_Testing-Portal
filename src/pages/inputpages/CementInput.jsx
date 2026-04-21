import React, { useState } from "react";
import { CheckCircle, Building, Beaker, Layers, Info } from "lucide-react";
import STANDARDS from "../../data/standards.js";
import InputSidebar from "../../components/InputSidebar.jsx";

const CementTestPage = ({ testId, onSubmit }) => {
  const test = STANDARDS[testId];

  // ✅ COMMON DATA (same for all cubes)
  const [commonData, setCommonData] = useState({
    client: "",
    clientAddress: "",
    sampleIdentification: "",
    cementGrade: "",
    cementBrand: "",
    consistency: "",
    initialST: "",
    finalST: "",
    specimenSize: "150X150X150",
  });

  // ✅ MULTIPLE SPECIMENS (cubes)
  const [specimens, setSpecimens] = useState([
    { specimenId: "", maxLoad3d: null, maxLoad7d: null, maxLoad28d: null},
    { specimenId: "", maxLoad3d: null, maxLoad7d: null, maxLoad28d: null},
    { specimenId: "", maxLoad3d: null, maxLoad7d: null, maxLoad28d: null},
  ]);

  // ✅ Change Common Inputs
  const handleCommonChange = (id, value) => {
    setCommonData((prev) => ({ ...prev, [id]: value }));

  };

  // ✅ Change Specimen Inputs
  const handleSpecimenChange = (index, id, value) => {
    setSpecimens((prev) =>
      prev.map((spec, i) => (i === index ? { ...spec, [id]: value } : spec))
    );
  };

  // ✅ Submit Full Data
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      commonData,
      specimens,
    };

    if (onSubmit) {
      onSubmit(testId, payload);
    }
  };

  if (!test) {
    return (
      <div className="p-8 text-red-600 font-semibold flex items-center gap-2">
        <Info size={20} /> Invalid Test ID: {testId}
      </div>
    );
  }

  const specimenFieldCount =
    test.specimenInputs?.filter((input) => input.id !== "specimenId").length || 0;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6 bg-slate-50 min-h-screen">
      {/* Header with Title using TestCard styling principle */}
      <div className="bg-white border-l-4 border-blue-600 p-6 rounded-r-xl shadow-sm mb-2">
        <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight">
          {test.name}
        </h1>
        <p className="text-slate-500 text-xs mt-1 font-medium">
          Fill in the details below to generate the official {test.name} report.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ✅ SECTION 1: GENERAL INFORMATION */}
        <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
            <Building size={16} className="text-slate-500" />
            <h2 className="text-xs font-black text-slate-600 uppercase tracking-widest">
              General Information
            </h2>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {test.commonInputs?.map((input) => (
              <div key={input.id} className={input.id === "clientAddress" ? "md:col-span-2" : ""}>
                <label className="block text-[10px] font-bold tracking-widest text-slate-400  mb-2 ml-1">
                  {input.label}
                </label>

                {input.type === "select" ? (
                  <div className="space-y-2">
                    <select
                      required
                      value={commonData[input.id] || ""}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm font-medium"
                      onChange={(e) => handleCommonChange(input.id, e.target.value)}
                    >
                      <option value="">Select {input.label}</option>
                      {input.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <input
                    required={input.id !== "sampleIdentification"}
                    type={input.type}
                    value={commonData[input.id] || ""}
                    placeholder={input.placeholder}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm font-medium"
                    onChange={(e) => handleCommonChange(input.id, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ✅ SECTION 2: SPECIMEN DATA */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Layers size={18} className="text-slate-500" />
            <h2 className="text-xs font-black text-slate-600 uppercase tracking-widest">
              Specimen Observations
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {specimens.map((spec, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition-all relative overflow-hidden"
              >
                {/* Visual indicator for specimen number */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-100 group-hover:bg-blue-500 transition-colors" />
                
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/4">
                    <div className="flex items-center gap-2 mb-2">
                      <Beaker size={14} className="text-blue-500" />
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                        Specimen #{index + 1}
                      </span>
                    </div>
                    <input
                      required
                      type="text"
                      placeholder="Enter ID / Mark"
                      value={spec.specimenId || ""}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                      onChange={(e) => handleSpecimenChange(index, "specimenId", e.target.value)}
                    />
                  </div>

                  <div className="lg:flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {test.specimenInputs?.filter(i => i.id !== "specimenId").map((input) => (
                      <div key={input.id}>
                        <label className="block text-[10px] font-bold text-slate-400 tracking-tighter mb-2">
                          {input.label}
                        </label>

                        {input.type === "select" ? (
                          <div className="space-y-2">
                            <select
                              required
                              value={spec[input.id] || ""}
                              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                              onChange={(e) => handleSpecimenChange(index, input.id, e.target.value)}
                            >
                              <option value="">Select...</option>
                              {input.options.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                            
                            
                          </div>
                        ) : (
                          <div className="relative">
                            <input
                              required
                              type={input.type}
                              step="any"
                              value={spec[input.id] ?? ""}
                              placeholder={input.placeholder}
                              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                              onChange={(e) => handleSpecimenChange(index, input.id, e.target.value === "" ? null : Number(e.target.value))}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ SUBMIT SECTION */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-5 px-6 rounded-2xl transition-all shadow-xl shadow-slate-200 flex justify-center items-center gap-3 group active:scale-[0.99]"
          >
            <CheckCircle size={22} className="group-hover:scale-110 transition-transform" />
            <span className="uppercase tracking-widest text-sm">Calculate & Generate Official Report</span>
          </button>
          <div className="flex flex-col items-center mt-6 space-y-2">
            <div className="h-px w-24 bg-slate-200" />
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em]">
              National Institute of Technology Calicut
            </p>
          </div>
        </div>
      </form>

      <InputSidebar
        summary="Capture the cement identification details once, then enter the three specimen IDs and their 3-day, 7-day, and 28-day load readings to prepare the strength report in one pass."
        stats={[
          { label: "General fields", value: test.commonInputs?.length || 0 },
          { label: "Cement specimens", value: specimens.length },
          { label: "Load stages", value: specimenFieldCount },
        ]}
        tips={[
          "Use one specimen row per cement cube and keep the same specimen ID across all three age readings.",
          "Leave no age field blank for a specimen if you intend to compare 3-day, 7-day, and 28-day results together.",
          "Enter numeric load values only, because the page already assumes the displayed unit for each age stage.",
        ]}
      />
      </div>
    </div>
  );
};

export default CementTestPage;

