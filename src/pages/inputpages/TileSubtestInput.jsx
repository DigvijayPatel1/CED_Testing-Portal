import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Building } from 'lucide-react';
import STANDARDS from '../../data/standards.js';
import InputSidebar from '../../components/InputSidebar.jsx';

const TileSubtestInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subtestId } = useParams();
  const tileConfig = STANDARDS.tileTest;
  const tileData = location.state?.tileData;

  if (!tileData) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Tile data not found</h1>
          <p className="mt-3 text-sm text-slate-500">Please start from the tile overview page to select subtests.</p>
          <button
            onClick={() => navigate('/tile-input')}
            className="mt-6 rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Back to Tile Overview
          </button>
        </div>
      </div>
    );
  }

  const enabledSubtests = tileConfig.subtests.filter((subtest) => tileData.subtests[subtest.id]?.enabled);
  const currentIndex = enabledSubtests.findIndex((subtest) => subtest.id === subtestId);
  const currentSubtest = enabledSubtests[currentIndex];

  if (!currentSubtest) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Subtest not enabled</h1>
          <p className="mt-3 text-sm text-slate-500">The requested subtest is not currently active. Enable it from the tile overview.</p>
          <button
            onClick={() => navigate('/tile-input', { state: { tileData } })}
            className="mt-6 rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Back to Tile Overview
          </button>
        </div>
      </div>
    );
  }

  const subtestTips = {
    dimension: [
      'Measure all required sides before typing so you can enter the full tile in one pass.',
      'Keep the same measuring unit for every specimen because the result page compares specimen dimensions directly.',
      'Use the specimen label shown on each card to avoid mixing readings between tiles.',
    ],
    waterAbsorption: [
      'Record dry, wet, and suspended weights from the same specimen without switching rows.',
      'Check that each reading is in grams before continuing because the absorption calculation uses raw mass values.',
      'Finish one tile fully before moving to the next so the wet and suspended readings stay paired.',
    ],
    crazingResistance: [
      'Use clear remarks for each tile so the final report reads like an inspection log.',
      'Describe the observed crazing pattern consistently across all specimens to make comparisons easier.',
      'If a tile shows no visible crazing, note that explicitly instead of leaving the description blank.',
    ],
    rupture: [
      'Enter length, breadth, thickness, and breaking load from the same tile together.',
      'Keep dimension entries in the same unit shown on the page because the modulus result depends on it.',
      'Review breaking load once more before continuing since it directly drives the rupture calculation.',
    ],
  };

  const [specimens, setSpecimens] = useState(tileData.specimens);
  const subtestFieldCount =
    currentSubtest.inputs.filter((input) => input.id !== 'specimenId').length;

  const handleFieldChange = (specimenIndex, fieldId, value) => {
    setSpecimens((prev) =>
      prev.map((specimen, idx) =>
        idx === specimenIndex
          ? {
              ...specimen,
              [currentSubtest.id]: {
                ...specimen[currentSubtest.id],
                [fieldId]: value,
              },
            }
          : specimen
      )
    );
  };

  const goBack = () => {
    navigate('/tile-input', { state: { tileData: { ...tileData, specimens } } });
  };

  const nextSubtest = enabledSubtests[currentIndex + 1];

  const continueToNextSubtest = () => {
    const updatedTileData = { ...tileData, specimens };
    if (nextSubtest) {
      navigate(`/tile-input/subtest/${nextSubtest.id}`, { state: { tileData: updatedTileData } });
      return;
    }

    navigate('/tile-result', {
      state: {
        inputs: {
          common: updatedTileData.commonInputs,
          subtests: updatedTileData.subtests,
          specimens: updatedTileData.specimens,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
          >
            <ArrowLeft size={16} />
            Back to Tile Overview
          </button>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Subtest</p>
            <h1 className="text-2xl font-black text-slate-900">{currentSubtest.name}</h1>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-8">
            <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex items-center gap-3">
                <Building size={18} className="text-slate-500" />
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Tile sample</h2>
                  <p className="text-xs text-slate-500 mt-1">Enter values for each specimen for this subtest.</p>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 mb-2">Client</p>
                  <p className="text-sm text-slate-900">{tileData.commonInputs.client || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 mb-2">Sample</p>
                  <p className="text-sm text-slate-900">{tileData.commonInputs.sampleIdentification || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 mb-2">Date of testing</p>
                  <p className="text-sm text-slate-900">{tileData.commonInputs.dateTesting || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 mb-2">Specimens</p>
                  <p className="text-sm text-slate-900">{specimens.length}</p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              {specimens.map((specimen, specimenIndex) => (
                <div key={specimenIndex} className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between bg-slate-50 border-b border-slate-200">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Specimen #{specimenIndex + 1}</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">{specimen.specimenId || `Tile ${specimenIndex + 1}`}</p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                      {currentSubtest.name}
                    </span>
                  </div>

                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {currentSubtest.inputs
                      .filter((input) => input.id !== 'specimenId')
                      .map((input) => (
                        <div key={input.id}>
                          <label className="block text-[11px] font-semibold text-slate-500 mb-2">{input.label}</label>
                          <input
                            type={input.type}
                            step={input.type === 'number' ? 'any' : undefined}
                            value={specimen[currentSubtest.id]?.[input.id] || ''}
                            onChange={(e) => handleFieldChange(specimenIndex, input.id, e.target.value)}
                            placeholder={input.placeholder || `Enter ${input.label.toLowerCase()}`}
                            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </section>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={goBack}
                className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 hover:border-slate-300"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button
                onClick={continueToNextSubtest}
                className="inline-flex items-center gap-2 rounded-3xl bg-slate-900 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-slate-200 hover:bg-slate-800"
              >
                <span>{nextSubtest ? 'Save and Continue' : 'Finish and View Results'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <InputSidebar
            summary={`Enter ${currentSubtest.name.toLowerCase()} values for each enabled tile specimen before moving to the next subtest. Completing one tile card at a time helps keep repeated measurements aligned.`}
            stats={[
              { label: 'Specimens', value: specimens.length },
              { label: 'Fields per tile', value: subtestFieldCount },
              { label: 'Subtest step', value: `${currentIndex + 1} / ${enabledSubtests.length}` },
            ]}
            tips={subtestTips[currentSubtest.id] || subtestTips.dimension}
          />
        </div>
      </div>
    </div>
  );
};

export default TileSubtestInput;
