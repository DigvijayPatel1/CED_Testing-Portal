import React, { useState } from "react";
import { CheckCircle, Building, Beaker, Layers, Info, Plus, Trash2 } from "lucide-react";
import STANDARDS from "../../data/standards.js";
import InputSidebar from "../../components/InputSidebar.jsx";

const PaverBlockInput = ({ testId, onSubmit }) => {
  const test = STANDARDS[testId];

  const [commonData, setCommonData] = useState({
    client: "",
    clientAddress: "",
    sampleIdentification: "",
    grade: "",
    stdDeviation: "",
    length: "",
    width: "",
    thickness: "",
    planArea: "",
    dateCasting: "",
    dateTesting: "",
    curingCondition: "",
  });

  const [customCuringCondition, setCustomCuringCondition] = useState("");

  const [specimens, setSpecimens] = useState([
    { specimenId: "", weight: "", load: "", fractureType: "" },
  ]);

  const [customFractureType, setCustomFractureType] = useState({});

  const handleCommonChange = (id, value) => {
    setCommonData((prev) => ({ ...prev, [id]: value }));

    if (id === "curingCondition" && value !== "Other") {
      setCustomCuringCondition("");
    }
  };

  const handleSpecimenChange = (index, id, value) => {
    setSpecimens((prev) =>
      prev.map((spec, i) => (i === index ? { ...spec, [id]: value } : spec)),
    );

    if (id === "fractureType" && value !== "Other") {
      setCustomFractureType((prev) => {
        const copy = { ...prev };
        delete copy[index];
        return copy;
      });
    }
  };

  const addSpecimen = () => {
    setSpecimens((prev) => [
      ...prev,
      { specimenId: "", weight: "", load: "", fractureType: "" },
    ]);
  };

  const removeSpecimen = (index) => {
    setSpecimens((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, i) => i !== index);
    });

    setCustomFractureType((prev) => {
      const next = {};
      Object.keys(prev).forEach((key) => {
        const i = Number(key);
        if (i < index) next[i] = prev[key];
        if (i > index) next[i - 1] = prev[key];
      });
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      commonData: {
        ...commonData,
        curingCondition:
          commonData.curingCondition === "Other"
            ? customCuringCondition
            : commonData.curingCondition,
      },
      specimens: specimens.map((spec, index) => ({
        ...spec,
        fractureType:
          spec.fractureType === "Other"
            ? customFractureType[index]
            : spec.fractureType,
      })),
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
        <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
            <Building size={16} className="text-slate-500" />
            <h2 className="text-xs font-black text-slate-600 uppercase tracking-widest">
              General Information
            </h2>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {test.commonInputs?.map((input) => {
              const numericCommonFields = [
                "stdDeviation",
                "length",
                "width",
                "thickness",
                "planArea",
              ];
              const isNumericField = numericCommonFields.includes(input.id);
              const isPlanArea = input.id === "planArea";

              return (
                <div
                  key={input.id}
                  className={input.id === "clientAddress" ? "md:col-span-2" : ""}
                >
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

                      {input.id === "curingCondition" &&
                        commonData.curingCondition === "Other" && (
                          <input
                            type="text"
                            required
                            placeholder="Specify condition..."
                            value={customCuringCondition}
                            className="w-full p-3 bg-white border-2 border-blue-100 rounded-xl focus:border-blue-500 outline-none text-sm transition-all"
                            onChange={(e) =>
                              setCustomCuringCondition(e.target.value)
                            }
                          />
                        )}
                    </div>
                  ) : (
                    <input
                      required={input.id !== "sampleIdentification"}
                      type={isNumericField ? "number" : input.type}
                      step={isNumericField ? "any" : undefined}
                      value={commonData[input.id] || ""}
                      placeholder={input.placeholder}
                      className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm font-medium ${
                        isPlanArea
                          ? "bg-white border-slate-200 text-slate-700"
                          : "bg-slate-50 border-slate-200"
                      }`}
                      onChange={(e) => handleCommonChange(input.id, e.target.value)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-slate-500" />
              <h2 className="text-xs font-black text-slate-600 uppercase tracking-widest">
                Specimen Observations
              </h2>
            </div>
            <button
              type="button"
              onClick={addSpecimen}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold uppercase tracking-wide hover:bg-blue-700"
            >
              <Plus size={14} />
              Add Specimen
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {specimens.map((spec, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-100 group-hover:bg-blue-500 transition-colors" />

                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/4">
                    <div className="flex items-center gap-2 mb-2">
                      <Beaker size={14} className="text-blue-500" />
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                        Specimen #{index + 1}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSpecimen(index)}
                      disabled={specimens.length === 1}
                      className="mb-3 inline-flex items-center gap-1 px-2 py-1 rounded-md border border-slate-200 text-[10px] font-bold uppercase tracking-wide text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={12} />
                      Remove
                    </button>
                    <input
                      required
                      type="text"
                      placeholder="Enter ID / Mark"
                      value={spec.specimenId || ""}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                      onChange={(e) =>
                        handleSpecimenChange(index, "specimenId", e.target.value)
                      }
                    />
                  </div>

                  <div className="lg:flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {test.specimenInputs
                      ?.filter((i) => i.id !== "specimenId")
                      .map((input) => (
                        <div key={input.id}>
                          <label className="block text-[10px] font-bold text-slate-400  tracking-tighter mb-2">
                            {input.label}
                          </label>

                          {input.type === "select" ? (
                            <div className="space-y-2">
                              <select
                                required
                                value={spec[input.id] || ""}
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) =>
                                  handleSpecimenChange(
                                    index,
                                    input.id,
                                    e.target.value,
                                  )
                                }
                              >
                                <option value="">Select...</option>
                                {input.options.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>

                              {input.id === "fractureType" &&
                                spec.fractureType === "Other" && (
                                  <input
                                    type="text"
                                    required
                                    placeholder="Specify type..."
                                    value={customFractureType[index] || ""}
                                    className="w-full p-3 bg-white border-2 border-blue-500/20 rounded-xl text-sm outline-none"
                                    onChange={(e) =>
                                      setCustomFractureType((prev) => ({
                                        ...prev,
                                        [index]: e.target.value,
                                      }))
                                    }
                                  />
                                )}
                            </div>
                          ) : (
                            <input
                              required
                              type={input.type}
                              step="any"
                              value={spec[input.id] || ""}
                              placeholder={input.placeholder}
                              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                              onChange={(e) =>
                                handleSpecimenChange(index, input.id, e.target.value)
                              }
                            />
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-5 px-6 rounded-2xl transition-all shadow-xl shadow-slate-200 flex justify-center items-center gap-3"
          >
            <CheckCircle size={22} />
            <span className="uppercase tracking-widest text-sm">
              Calculate & Generate Official Report
            </span>
          </button>
        </div>
      </form>

      <InputSidebar
        summary="Start with the shared paver block dimensions and curing details, then add as many specimens as you need and capture the observed weight, load, and fracture pattern for each block."
        stats={[
          { label: "General fields", value: test.commonInputs?.length || 0 },
          { label: "Paver specimens", value: specimens.length },
          { label: "Values per block", value: specimenFieldCount },
        ]}
        tips={[
          "Enter the common dimensions carefully because the same values drive every specimen in the report.",
          "Use Add Specimen only when you have another tested block to record, and remove unused rows to keep the sheet clean.",
          "If fracture type is marked Other, type the custom description before moving to the next specimen.",
        ]}
      />
      </div>
    </div>
  );
};

export default PaverBlockInput;
