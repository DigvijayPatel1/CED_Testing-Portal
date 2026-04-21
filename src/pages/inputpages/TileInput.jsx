import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Building, Layers, LayoutGrid, Plus, Trash2 } from 'lucide-react';
import STANDARDS from '../../data/standards.js';

const TileInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tileConfig = STANDARDS.tileTest;
  const savedData = location.state?.tileData;

  const createEmptySpecimen = () => ({
    specimenId: '',
    ...tileConfig.subtests.reduce((sub, test) => {
      sub[test.id] = test.inputs.reduce((fields, input) => {
        fields[input.id] = '';
        return fields;
      }, {});
      return sub;
    }, {}),
  });

  const defaultCommonInputs = tileConfig.commonInputs.reduce((acc, input) => {
    acc[input.id] = '';
    return acc;
  }, {});

  const defaultSubtests = tileConfig.subtests.reduce((acc, subtest) => {
    acc[subtest.id] = {
      enabled: subtest.enabled,
      ...subtest.inputs.reduce((inputAcc, input) => {
        inputAcc[input.id] = '';
        return inputAcc;
      }, {}),
    };
    return acc;
  }, {});

  const [commonInputs, setCommonInputs] = useState(savedData?.commonInputs ?? defaultCommonInputs);

  const [subtests, setSubtests] = useState(savedData?.subtests ?? defaultSubtests);

  const [specimens, setSpecimens] = useState(() => savedData?.specimens ?? Array.from({ length: 3 }, createEmptySpecimen));

  const activeSubtests = tileConfig.subtests.filter((subtest) => subtests[subtest.id].enabled).length;

  const handleCommonInputChange = (id, value) => {
    setCommonInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubtestToggle = (subtestId, enabled) => {
    setSubtests((prev) => ({
      ...prev,
      [subtestId]: {
        ...prev[subtestId],
        enabled,
      },
    }));
  };

  const handleSpecimenIdChange = (index, value) => {
    setSpecimens((prev) =>
      prev.map((specimen, idx) => (idx === index ? { ...specimen, specimenId: value } : specimen))
    );
  };

  const openSubtestPage = (subtestId) => {
    navigate(`/tile-input/subtest/${subtestId}`, { state: { tileData: { commonInputs, subtests, specimens } } });
  };

  const continueToSubtests = () => {
    const firstEnabledSubtest = tileConfig.subtests.find((subtest) => subtests[subtest.id].enabled);
    if (!firstEnabledSubtest) return;

    navigate(`/tile-input/subtest/${firstEnabledSubtest.id}`, { state: { tileData: { commonInputs, subtests, specimens } } });
  };

  const addSpecimen = () => {
    if (specimens.length < 10) {
      setSpecimens((prev) => [...prev, createEmptySpecimen()]);
    }
  };

  const removeSpecimen = (index) => {
    if (specimens.length > 3) {
      setSpecimens((prev) => prev.filter((_, idx) => idx !== index));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <section className="bg-white border-l-4 border-emerald-500 rounded-3xl shadow-sm p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{tileConfig.name}</h1>
              <p className="mt-3 text-sm text-slate-500 max-w-3xl leading-7">{tileConfig.description}</p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              <LayoutGrid size={18} />
              {specimens.length} tiles ready
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <form className="space-y-8">
            <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex items-center gap-3">
                <Building size={18} className="text-slate-500" />
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">General Information</h2>
                  <p className="text-xs text-slate-500 mt-1">Fill in the sample details and tile batch metadata.</p>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {tileConfig.commonInputs.map((input) => (
                  <div key={input.id} className={input.id === 'clientAddress' ? 'md:col-span-2' : ''}>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-2">{input.label}</label>
                    <input
                      type={input.type}
                      value={commonInputs[input.id]}
                      onChange={(e) => handleCommonInputChange(input.id, e.target.value)}
                      placeholder={input.placeholder || `Enter ${input.label.toLowerCase()}`}
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Layers size={18} className="text-slate-500" />
                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Subtests</h2>
                    <p className="text-xs text-slate-500 mt-1">Enable only the tile subtests you will capture data for.</p>
                  </div>
                </div>
                <div className="text-sm text-slate-500">Activated: {activeSubtests} / {tileConfig.subtests.length}</div>
              </div>

              <div className="p-6 grid gap-4">
                {tileConfig.subtests.map((subtest) => {
                  const active = subtests[subtest.id]?.enabled;
                  return (
                    <div key={subtest.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">{subtest.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">{subtest.inputs.length} fields per tile specimen.</p>
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <label className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                          <input
                            type="checkbox"
                            checked={active}
                            onChange={(e) => handleSubtestToggle(subtest.id, e.target.checked)}
                            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                          />
                          {active ? 'Enabled' : 'Disabled'}
                        </label>
                        <button
                          type="button"
                          disabled={!active}
                          onClick={() => openSubtestPage(subtest.id)}
                          className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                          Fill {subtest.name}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Building size={18} className="text-slate-500" />
                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Tile Specimens</h2>
                    <p className="text-xs text-slate-500 mt-1">Add or remove specimens as needed. Minimum 7 tiles, maximum 10.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addSpecimen}
                  disabled={specimens.length >= 10}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  <Plus size={14} />
                  Add Tile
                </button>
              </div>

              <div className="p-6 space-y-6">
                {specimens.map((specimen, specimenIndex) => (
                  <div key={specimenIndex} className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between bg-slate-50 border-b border-slate-200">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Tile specimen #{specimenIndex + 1}</div>
                        <input
                          type="text"
                          value={specimen.specimenId}
                          onChange={(e) => handleSpecimenIdChange(specimenIndex, e.target.value)}
                          placeholder="Specimen ID"
                          className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 sm:w-80"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSpecimen(specimenIndex)}
                        disabled={specimens.length <= 3}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 transition hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>

                    <div className="p-6 text-sm text-slate-500">
                    {tileConfig.subtests.some((subtest) => subtests[subtest.id]?.enabled)
                      ? 'Detailed specimen values are entered on each subtest page after selecting a subtest above.'
                      : 'Enable one or more subtests above, then continue to complete specimen records.'}
                  </div>
                </div>
              ))}
            </div>
          </section>

            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={continueToSubtests}
                disabled={activeSubtests === 0}
                className="inline-flex items-center justify-center gap-3 rounded-3xl bg-slate-900 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-slate-200 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/20 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <CheckCircle size={20} />
                Continue to subtests
              </button>
              <p className="text-center text-xs uppercase tracking-[0.3em] text-slate-400">
                You can enter up to 10 tile specimens per report. Minimum 3 specimens are kept for this tile batch.
              </p>
            </div>
          </form>

          <aside className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <LayoutGrid size={18} className="text-emerald-600" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Quick Summary</h2>
              </div>
              <p className="text-sm text-slate-500 leading-6">
                Fill specimen ID for each tile, then add measurements only for the subtests you actually performed. This layout keeps repeated data grouped per specimen so filling 7–10 tiles stays simple.
              </p>
              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span>Default tile count</span>
                  <span className="font-semibold text-slate-900">3</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span>Max tiles</span>
                  <span className="font-semibold text-slate-900">10</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span>Enabled subtests</span>
                  <span className="font-semibold text-emerald-700">{activeSubtests}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Layers size={18} className="text-slate-500" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Input tips</h2>
              </div>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="rounded-2xl bg-slate-50 px-4 py-3">Start from the top specimen and fill tile IDs before entering measurements.</li>
                <li className="rounded-2xl bg-slate-50 px-4 py-3">If a subtest is disabled, its tile fields remain hidden for all specimens.</li>
                <li className="rounded-2xl bg-slate-50 px-4 py-3">Use the Add Tile button only when you need more than 7 specimens.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TileInput;
