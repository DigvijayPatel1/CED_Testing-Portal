import React, { useEffect } from "react";
import { Building, SlidersHorizontal, Printer, RefreshCw, FlaskConical, Beaker, CheckCircle } from "lucide-react";
import nitclogo from "../../assets/NITC_logo.png";

const displayValue = (value, fallback = "—") => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }
  return value;
};

// Reusable Header for EVERY page - matching Cement Result style
const ReportHeader = ({ title, status }) => (
  <header className="relative mb-5 shrink-0 border-b-2 border-slate-300 pb-4">
    <div className="absolute inset-x-0 top-0 h-1 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-400" />
    <div className="flex items-center justify-center gap-4 pt-1">
      <div className="w-16 h-16 shrink-0 flex items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white">
        <img
          src={nitclogo}
          alt="NITC Logo"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div
          style={{ display: "none" }}
          className="w-16 h-16 bg-slate-900 rounded-full items-center justify-center text-white"
        >
          <span className="text-[8px] font-bold">NITC</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-[15px] font-bold uppercase tracking-[0.35em] text-sky-700">
          Department of Civil Engineering
        </p>
        <h1 className="mt-2 text-[24px] font-black uppercase tracking-[0.02em] text-slate-900 leading-none whitespace-nowrap">
          National Institute of Technology Calicut
        </h1>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          Material Testing Laboratory
        </p>
      </div>
    </div>

    <div className="mt-3 flex items-center gap-3">
      <div className="h-px flex-1 bg-slate-300" />
      <h2 className="px-4 text-lg font-serif font-bold text-slate-900 text-center">
      {title || "Concrete Mix Design Report"}
      </h2>
      <div className="h-px flex-1 bg-slate-300" />
    </div>
  </header>
);

// Reusable Footer for EVERY page
const ReportFooter = ({ pageNum, totalPages }) => (
  <footer className="mt-auto pt-4 border-t-2 border-sky-100 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-slate-400 shrink-0">
    <span className="text-slate-500">NITC Material Testing Lab</span>
    <span className="font-bold text-slate-600">
      Page {pageNum} of {totalPages}
    </span>
  </footer>
);

// A4 Page Container
const Page = ({ children }) => (
  <div className="relative w-full max-w-[210mm] min-h-[297mm] mx-auto bg-[linear-gradient(180deg,#f8fdff_0%,#ffffff_14%)] border-[5px] border-sky-200 shadow-[0_16px_50px_rgba(14,116,144,0.14)] mb-10 flex flex-col p-[20mm] print:shadow-none print:m-0 print:w-full print:h-screen print:min-h-screen print:p-[15mm] print:break-after-page box-border overflow-hidden">
    <div className="pointer-events-none absolute inset-0 border-[10px] border-white/70" />
    <div className="pointer-events-none absolute left-0 top-0 h-20 w-20 rounded-br-[2.5rem] bg-sky-100/70" />
    <div className="pointer-events-none absolute right-0 bottom-0 h-24 w-24 rounded-tl-[3rem] bg-teal-100/60" />
    {children}
  </div>
);

// Reusable Table Component for standardized styling
const DataTable = ({ title, icon: Icon, rows, headerRow = false }) => (
  <article className="mb-8 break-inside-avoid">
    <div className="flex items-center gap-2.5 text-slate-800 mb-3">
      {Icon && (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-700 border border-sky-200">
          <Icon size={16} />
        </span>
      )}
      <h3 className="text-[13px] font-bold uppercase tracking-[0.15em] text-slate-800">{title}</h3>
    </div>
    <div className="overflow-hidden rounded-2xl border border-slate-500 shadow-[0_8px_18px_rgba(15,23,42,0.05)]">
      <table className="w-full text-[13px] text-slate-700 border-collapse">
        {headerRow && (
          <thead className="bg-[linear-gradient(180deg,#eef8ff_0%,#f8fbfd_100%)] border-b border-slate-500 text-[11px] uppercase tracking-[0.15em] text-slate-700 font-bold">
            <tr>
              <th className="px-5 py-3 text-left w-1/2">Parameter / Material</th>
              <th className="px-5 py-3 text-left w-1/2 border-l border-slate-400">Value / Quantity</th>
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-slate-400">
          {rows.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-sky-100/60"}>
              <td className="w-1/2 px-5 py-3 font-semibold text-slate-700 align-top">
                {row.label}
              </td>
              <td className="w-1/2 px-5 py-3 text-slate-900 font-medium border-l border-slate-400">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </article>
);

const ConcreteMixResult = ({ result, onRestart }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const generatedDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const commonData = result?.formData?.commonData || {};
  const proportionData = result?.formData?.proportionData || {};
  const materialData = result?.formData?.materialData || {};
  
  const calculations = result?.calculations || {};
  const targetStrength = calculations.targetStrength;
  const mixProportion = calculations.mixProportion;
  const cementMass = Math.ceil(calculations.cementMass);
  const massFineAggregate = calculations.massFineAggregate;
  const massCoarseAggregate = calculations.massCoarseAggregate;
  const massAdmixture = Math.ceil(calculations.massAdmixture);
  const waterContent = Math.ceil(calculations.waterContent);
  const formattedMassFineAggregate =
    massFineAggregate !== null &&
    massFineAggregate !== undefined &&
    massFineAggregate !== "" &&
    !Number.isNaN(Number(massFineAggregate))
      ? Math.ceil(Number(massFineAggregate))
      : massFineAggregate;
  const formattedMassCoarseAggregate =
    massCoarseAggregate !== null &&
    massCoarseAggregate !== undefined &&
    massCoarseAggregate !== "" &&
    !Number.isNaN(Number(massCoarseAggregate))
      ? Math.ceil(Number(massCoarseAggregate))
      : massCoarseAggregate;
  const waterCementRatio =
    proportionData.waterCementRatio ?? proportionData.waterCement;
  const factorX = proportionData.factorX || calculations.factorX;
  const airContent =
    proportionData.airContent ||
    (calculations.entrappedAir !== undefined
      ? (calculations.entrappedAir * 100).toFixed(2)
      : "");
  const standardDeviation =
    proportionData.standardDeviation || calculations.standardDeviation;
  const minCementContent =
    proportionData.minCementContent || calculations.minCementContent;
  const maxFreeWaterCementRatio =
    proportionData.maxFreeWaterCementRatio ||
    calculations.maxFreeWaterCementRatio;

  const totalPages = 3;

  return (
    <>
      <style>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white; }
          html, body { height: 100%; overflow: visible; }
        }
      `}</style>
      
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#e0f2fe_0%,_#f8fafc_28%,_#eef2ff_100%)] py-10 px-4 flex flex-col font-sans print:py-0 print:px-0 print:bg-white">
        
        {/* PAGE 1: Client Details & Stipulations */}
        <Page>
          <ReportHeader title={result?.name} />
          <main className="flex-1">
            <div className="mb-3 -mt-1 text-center">
              <p className="text-sm font-semibold text-slate-600">
                Report Generated On: <span className="font-bold text-sky-800">{generatedDate}</span>
              </p>
            </div>
            <DataTable 
              title="Client & Common Details"
              icon={Building}
              rows={[
                { label: "Client", value: displayValue(commonData.client) },
                { label: "Address", value: displayValue(commonData.clientAddress) },
                { label: "Starting Date", value: displayValue(commonData.periodStart) },
                { label: "End Date", value: displayValue(commonData.periodEnd) },
                { label: "Brand of Cement", value: displayValue(commonData.brandOfCement) },
                { label: "Source Coarse Aggregate", value: displayValue(commonData.sourceCoarseAggregate) },
                { label: "Source Fine Aggregate", value: displayValue(commonData.sourceFineAggregate) },
              ]}
            />
            <DataTable 
              title="Design Stipulations"
              icon={SlidersHorizontal}
              rows={[
                { label: "Characteristic compressive strength required at the site at 28 days", value: displayValue(proportionData.characteristicStrength) },
                { label: "Degree of exposure", value: displayValue(proportionData.exposureCondition) },
                { label: "Maximum size of coarse aggregate", value: displayValue(proportionData.maxNominalSize) },
                { label: "Shape of aggregate", value: displayValue(proportionData.shapeOfAggregate) },
                { label: "Type of Cement", value: displayValue(materialData.cementType) },
                { label: "Method Of Concrete Placing", value: displayValue(proportionData.methodOfPlacing) },
                { label: "Water Cement Ratio", value: displayValue(waterCementRatio) },
                { label: "Factor X", value: displayValue(factorX) },
                { label: "Air content (%)", value: displayValue(airContent) },
                { label: "Standard deviation, S (MPa)", value: displayValue(standardDeviation) },
                { label: "Minimum cement content (kg/m³)", value: displayValue(minCementContent) },
                { label: "Maximum free water-cement ratio", value: displayValue(maxFreeWaterCementRatio) },
              ]}
            />
          </main>
          <ReportFooter pageNum={1} totalPages={totalPages} />
        </Page>

        {/* PAGE 2: Test Data for Materials */}
        <Page>
          <ReportHeader title={result?.name} />
          <main className="flex-1">
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-sky-100 bg-white/80 px-4 py-3">
              <FlaskConical size={20} className="text-slate-800" />
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest">Test Data for Materials</h2>
            </div>
            
            <DataTable 
              title="1. Cement"
              headerRow={true}
              rows={[
                { label: "Brand", value: displayValue(commonData.brandOfCement) },
                { label: "Type", value: displayValue(materialData.cementType) },
                { label: "Initial setting time (mins)", value: displayValue(materialData.initialST) },
                { label: "Final setting time (mins)", value: displayValue(materialData.finalST) },
                { label: "3 days compressive strength (MPa)", value: displayValue(materialData.cement3DayStrength) },
                { label: "7 days compressive strength (MPa)", value: displayValue(materialData.cement7DayStrength) },
                { label: "28 days compressive strength (MPa)", value: displayValue(materialData.cement28DayStrength) },
                { label: "Specific gravity", value: displayValue(materialData.sgCement) },
              ]}
            />

            <DataTable 
              title="2. Coarse Aggregate (20mm)"
              headerRow={true}
              rows={[
                { label: "Specific gravity", value: displayValue(materialData.sgCoarseAggregateSSD) },
                { label: "Water absorption (%)", value: displayValue(materialData.waterAbsorptionCoarse) },
              ]}
            />

            <DataTable 
              title="3. Fine Aggregate (River Sand)"
              headerRow={true}
              rows={[
                { label: "Specific gravity", value: displayValue(materialData.sgFineAggregateSSD) },
                { label: "Water absorption (%)", value: displayValue(materialData.waterAbsorptionFine) },
                { label: "Grading zone", value: displayValue(materialData.zoneFineAggregate) },
              ]}
            />
          </main>
          <ReportFooter pageNum={2} totalPages={totalPages} />
        </Page>

        {/* PAGE 3: Final Results & Signatures */}
        <Page>
          <ReportHeader title={result?.name} />
          <main className="flex-1 flex flex-col">
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-teal-100 bg-white/80 px-4 py-3">
              <CheckCircle size={20} className="text-slate-800" />
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest">Final Calculations</h2>
            </div>

            <DataTable 
              title="Target Mean Strength "
              rows={[
                { label: "Target mean strength of concrete (MPa)", value: displayValue(targetStrength) },
              ]}
            />

            <DataTable 
              title="Mix Design Recommendations"
              rows={[
                { label: "Mix proportion by weight (Cement : Fine : Coarse )", value: displayValue(mixProportion) },
              ]}
            />

            <DataTable 
              title="Materials Required per m³ of Concrete"
              headerRow={true}
              icon={Beaker}
              rows={[
                { label: "Cement (kg)", value: displayValue(cementMass) },
                { label: "Fine Aggregate (kg)", value: displayValue(formattedMassFineAggregate) },
                { label: "Coarse Aggregate (kg)", value: displayValue(formattedMassCoarseAggregate) },
                { label: "Water (kg)", value: displayValue(waterContent) },
                { label: "Chemical Admixture (kg)", value: displayValue(massAdmixture) },
              ]}
            />

            <DataTable 
              title="Cube Test Results"
              headerRow={true}
              icon={Beaker}
              rows={[
                { label: "7 days Compressive Strength", value: displayValue(materialData.cube7DayStrength) },
                { label: "28 days Compressive Strenngth", value: displayValue(materialData.cube28DayStrength) },
              ]}
            />

            <article className="mt-4 p-6 bg-[linear-gradient(135deg,#f0f9ff_0%,#f8fafc_55%,#ecfeff_100%)] border border-sky-200 rounded-2xl shadow-[0_10px_24px_rgba(14,116,144,0.08)]">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-sky-800 mb-2">Summary Note</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                This report captures the concrete mix design calculations and material data submitted for review. It is prepared as per the inputs provided and should be validated against field requirements and test batches before site implementation.
              </p>
            </article>

            {/* Signatures at the bottom of the last page's content area */}
            <div className="mt-auto pt-16 pb-8">
              <div className="grid grid-cols-2 gap-10">
                <div className="text-center rounded-2xl border border-slate-200 bg-white/70 px-4 py-6">
                  <div className="h-16 border-b border-dashed border-slate-400 w-48 mx-auto mb-3" />
                  <p className="font-black text-slate-900 text-[11px] uppercase tracking-widest">Tested By</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Lab Technician</p>
                </div>
                <div className="text-center rounded-2xl border border-slate-200 bg-white/70 px-4 py-6">
                  <div className="h-16 border-b border-dashed border-slate-400 w-48 mx-auto mb-3" />
                  <p className="font-black text-slate-900 text-[11px] uppercase tracking-widest">Verified By</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Faculty In-charge</p>
                </div>
              </div>
            </div>
          </main>
          <ReportFooter pageNum={3} totalPages={totalPages} />
        </Page>

        {/* Floating Action Buttons (Hidden on Print)
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl shadow-2xl print:hidden">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-5 py-3 text-slate-300 font-bold text-sm hover:bg-slate-800 rounded-xl transition-colors"
          >
            <RefreshCw size={18} />
            <span className="hidden md:inline">Restart</span>
          </button>
          <div className="w-px h-8 bg-slate-700 mx-1" />
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold text-sm rounded-xl hover:bg-slate-100 transition-all shadow-sm"
          >
            <Printer size={18} /> 
            <span>Print Report</span>
          </button>
        </div> */}
      </div>
    </>
  );
};

export default ConcreteMixResult;