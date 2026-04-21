import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Printer,
  RefreshCw,
  Building,
  Calendar,
  ClipboardList,
  Beaker,
} from "lucide-react";
import nitclogo from "../../assets/NITC_logo.png";
import { calculateTileWithSubtests } from "../../utils/calculations/tileCalc";

const displayValue = (value, fallback = "—") => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }
  return value;
};

const TileResult = ({ onRestart }) => {
  const location = useLocation();
  const { inputs } = location.state || {};
  const [status, setStatus] = useState("PASS");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  if (!inputs) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-slate-600 font-semibold">No data provided</p>
        </div>
      </div>
    );
  }

  const results = calculateTileWithSubtests(inputs);
  const { common, subtests, specimens, averages } = results;
  const commonData = common || {};

  const getStatusTheme = () => {
    if (status === "PASS") {
      return {
        color: "text-emerald-700",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        badge: "bg-emerald-600",
      };
    }
    if (status === "FAIL") {
      return {
        color: "text-red-700",
        bg: "bg-red-50",
        border: "border-red-200",
        badge: "bg-red-600",
      };
    }
    return {
      color: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
      badge: "bg-amber-600",
    };
  };

  const theme = getStatusTheme();
  const exactPrintColor = {
    WebkitPrintColorAdjust: "exact",
    printColorAdjust: "exact",
  };

  return (
    <div
      className="min-h-screen bg-slate-50 pb-32 p-4 md:p-8 flex justify-center items-start font-sans print:min-h-0 print:pb-0 print:p-0 print:bg-white"
      style={exactPrintColor}
    >
      {/* Main Report Card */}
      <div className="bg-white w-full max-w-[210mm] shadow-2xl rounded-xl print:shadow-none print:w-full print:max-w-none print:rounded-none print:overflow-visible print:flex print:flex-col print:box-border print:min-h-[250mm]">
        <div
          className={`h-2 w-full rounded-t-xl ${theme.badge}`}
          style={exactPrintColor}
        />

        <div className="p-8 print:p-4 relative flex flex-col h-full print:flex-1">
          {/* Header Section */}
          <header className="flex flex-col items-center justify-center text-center border-b-2 border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
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

              <div className="text-left">
                <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight whitespace-nowrap leading-none">
                  National Institute of Technology Calicut
                </h1>
                <div className="mt-1">
                  <span className="inline-block px-3 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Material Testing Laboratory
                  </span>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-serif font-bold text-slate-900 mt-1">
              Tile Test Report
            </h2>
          </header>

          {/* Meta Data Bar */}
          <div
            className="flex flex-row justify-between items-center bg-slate-50 rounded-lg p-2.5 border border-slate-200 mb-4 print:bg-slate-100"
            style={exactPrintColor}
          >
            <div className="flex gap-6 text-[10px]">
              <div className="flex items-center gap-2">
                <Calendar size={12} className="text-slate-500" />
                <span className="text-slate-600 font-medium">Date:</span>
                <span className="font-bold text-slate-800">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>

            <div
              className={`px-2 py-0.5 rounded text-white text-[10px] font-bold uppercase tracking-wider ${theme.badge} print:border print:border-black print:text-black print:hidden`}
            >
              Status: {status}
            </div>
          </div>

          {/* Details Grid */}
          <section className="grid grid-cols-2 gap-6 mb-4 text-[10px]">
            <div className="space-y-1.5">
              <h3 className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-1">
                <Building size={10} /> Client Details
              </h3>
              <div className="grid grid-cols-[70px_1fr] gap-y-1">
                <span className="text-slate-600">Client:</span>
                <span className="font-semibold text-slate-900">
                  {displayValue(commonData.client)}
                </span>
                <span className="text-slate-600">Address:</span>
                <span className="font-medium text-slate-800">
                  {displayValue(commonData.clientAddress)}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-1">
                <Beaker size={10} /> Sample Information
              </h3>
              <div className="grid grid-cols-[90px_1fr] gap-y-1">
                <span className="text-slate-600">Sample ID:</span>
                <span className="font-semibold text-slate-900">
                  {displayValue(commonData.sampleIdentification)}
                </span>
                <span className="text-slate-600">Type:</span>
                <span className="font-medium text-slate-800">
                  Ceramic Tiles
                </span>
                <span className="text-slate-600">Test Date:</span>
                <span className="font-medium text-slate-800">
                  {displayValue(commonData.dateTesting)}
                </span>
                <span className="text-slate-600">Remarks:</span>
                <span className="font-medium text-slate-800">
                  {displayValue(commonData.remarks)}
                </span>
              </div>
            </div>
          </section>

          {/* Results Tables */}
          <section className="mb-6 space-y-8">
            {/* Dimension Test - Length */}
            {subtests.dimension?.enabled && (
              <div>
                <h3 className="text-[10px] font-bold text-slate-900 mb-2">
                  (1) Test for Dimension: Length (to the nearest 0.1 mm)
                </h3>
                <div
                  className="overflow-hidden border border-slate-400 rounded-lg"
                  style={exactPrintColor}
                >
                  <table className="w-full text-[9px] text-left">
                    <thead
                      className="bg-slate-100 text-slate-700 font-bold border-b border-slate-400"
                      style={exactPrintColor}
                    >
                      <tr>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Sl. No.</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Side 1</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Side 2</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Avg.</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">% deviation from work size</th>
                        <th className="px-2 py-1.5 text-center">% deviation from avg. of tiles</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-400">
                      {specimens.map((spec, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="px-2 py-1 border-r border-slate-400 text-center font-semibold">{idx + 1}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center">{spec.dimensionCalc?.side1length || "—"}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center">{spec.dimensionCalc?.side2length || "—"}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center font-semibold">{spec.dimensionCalc?.lengthAvg || "—"}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center">—</td>
                          <td className="px-2 py-1 text-center">—</td>
                        </tr>
                      ))}
                      <tr className="bg-slate-50 font-semibold border-t-2 border-slate-400">
                        <td colSpan="2" className="px-2 py-1 border-r border-slate-400 text-center">Avg. of tiles</td>
                        <td className="px-2 py-1 border-r border-slate-400 text-center">—</td>
                        <td className="px-2 py-1 border-r border-slate-400 text-center">{averages.dimension.lengthAvg}</td>
                        <td className="px-2 py-1 border-r border-slate-400 text-center">—</td>
                        <td className="px-2 py-1 text-center">—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Dimension Test - Width */}
            {subtests.dimension?.enabled && (
              <div>
                <h3 className="text-[10px] font-bold text-slate-900 mb-2">
                  (2) Test for Dimension: Width (to the nearest 0.1 mm)
                </h3>
                <div
                  className="overflow-hidden border border-slate-400 rounded-lg"
                  style={exactPrintColor}
                >
                  <table className="w-full text-[9px] text-left">
                    <thead
                      className="bg-slate-100 text-slate-700 font-bold border-b border-slate-400"
                      style={exactPrintColor}
                    >
                      <tr>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Sl. No.</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Side 1</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Side 2</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Avg.</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">% deviation from work size</th>
                        <th className="px-2 py-1.5 text-center">% deviation from avg. of tiles</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-400">
                      {specimens.map((spec, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="px-2 py-1 border-r border-slate-400 text-center font-semibold">{idx + 1}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center">{spec.dimensionCalc?.side1width || "—"}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center">{spec.dimensionCalc?.side2width || "—"}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center font-semibold">{spec.dimensionCalc?.widthAvg || "—"}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center">—</td>
                          <td className="px-2 py-1 text-center">—</td>
                        </tr>
                      ))}
                      <tr className="bg-slate-50 font-semibold border-t-2 border-slate-400">
                        <td colSpan="2" className="px-2 py-1 border-r border-slate-400 text-center">Avg. of tiles</td>
                        <td className="px-2 py-1 border-r border-slate-400 text-center">—</td>
                        <td className="px-2 py-1 border-r border-slate-400 text-center">{averages.dimension.widthAvg}</td>
                        <td className="px-2 py-1 border-r border-slate-400 text-center">—</td>
                        <td className="px-2 py-1 text-center">—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Dimension Test - Thickness */}
            {subtests.dimension?.enabled && (
              <div>
                <h3 className="text-[10px] font-bold text-slate-900 mb-2">
                  (3) Test for Dimension: Thickness (to the nearest 0.1 mm)
                </h3>
                <div
                  className="overflow-hidden border border-slate-400 rounded-lg"
                  style={exactPrintColor}
                >
                  <table className="w-full text-[9px] text-left">
                    <thead
                      className="bg-slate-100 text-slate-700 font-bold border-b border-slate-400"
                      style={exactPrintColor}
                    >
                      <tr>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Sl. No.</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Corner 1</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Corner 2</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Corner 3</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Corner 4</th>
                        <th className="px-2 py-1.5 text-center">Avg.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-400">
                      {specimens.map((spec, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="px-2 py-1 border-r border-slate-400 text-center font-semibold">{idx + 1}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center">{spec.dimensionCalc?.side1thickness || "—"}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center">{spec.dimensionCalc?.side2thickness || "—"}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center">{spec.dimensionCalc?.side3thickness || "—"}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center">{spec.dimensionCalc?.side4thickness || "—"}</td>
                          <td className="px-2 py-1 text-center font-semibold">{spec.dimensionCalc?.thicknessAvg || "—"}</td>
                        </tr>
                      ))}
                      <tr className="bg-slate-50 font-semibold border-t-2 border-slate-400">
                        <td colSpan="2" className="px-2 py-1 border-r border-slate-400 text-center">Avg. of tiles</td>
                        <td className="px-2 py-1 border-r border-slate-400 text-center">—</td>
                        <td colSpan="2" className="px-2 py-1 border-r border-slate-400 text-center">—</td>
                        <td className="px-2 py-1 text-center">{averages.dimension.thicknessAvg}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Water Absorption Test */}
            {subtests.waterAbsorption?.enabled && (
              <div>
                <h3 className="text-[10px] font-bold text-slate-900 mb-2">
                  (4) Test for Water Absorption
                </h3>
                <div
                  className="overflow-hidden border border-slate-400 rounded-lg"
                  style={exactPrintColor}
                >
                  <table className="w-full text-[9px] text-left">
                    <thead
                      className="bg-slate-100 text-slate-700 font-bold border-b border-slate-400"
                      style={exactPrintColor}
                    >
                      <tr>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Sl. No.</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Specimen Size (mm)</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Dry Weight (g)</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Wet Weight (g)</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Suspended Weight (g)</th>
                        <th className="px-2 py-1.5 text-center">Water Absorption (%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-400">
                      {specimens.map((spec, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="px-2 py-1 border-r border-slate-400 text-center font-semibold">{idx + 1}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center">{spec.waterAbsorption?.specimenSize || "—"}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center">{spec.waterAbsorptionCalc?.dryWeight || "—"}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center">{spec.waterAbsorptionCalc?.wetWeight || "—"}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center">{spec.waterAbsorptionCalc?.suspendedWeight || "—"}</td>
                          <td className="px-2 py-1 text-center">{spec.waterAbsorptionCalc?.absorption || "—"}</td>
                        </tr>
                      ))}
                      <tr className="bg-slate-50 font-semibold border-t-2 border-slate-400">
                        <td className="px-2 py-1 border-r border-slate-400 text-center">Avg.</td>
                        <td className="px-2 py-1 border-r border-slate-400 text-center">—</td>
                        <td className="px-2 py-1 border-r border-slate-400 text-center">—</td>
                        <td className="px-2 py-1 border-r border-slate-400 text-center">—</td>
                        <td className="px-2 py-1 border-r border-slate-400 text-center">—</td>
                        <td className="px-2 py-1 text-center">{averages.waterAbsorption}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Crazing Resistance Test */}
            {subtests.crazingResistance?.enabled && (
              <div>
                <h3 className="text-[10px] font-bold text-slate-900 mb-2">
                  (5) Test for Crazing Resistance (As per IS 13630 Part 4)
                </h3>
                <div
                  className="overflow-hidden border border-slate-400 rounded-lg"
                  style={exactPrintColor}
                >
                  <table className="w-full text-[9px] text-left">
                    <thead
                      className="bg-slate-100 text-slate-700 font-bold border-b border-slate-400"
                      style={exactPrintColor}
                    >
                      <tr>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Sl. No.</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Specimen Size (mm)</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Remarks</th>
                        <th className="px-2 py-1.5 text-center">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-400">
                      {specimens.map((spec, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="px-2 py-1 border-r border-slate-400 text-center font-semibold">{idx + 1}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center">{spec.crazingResistance?.specimenSize || "—"}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-left text-[8px]">{spec.crazingResistance?.remarks || "—"}</td>
                          <td className="px-2 py-1 text-left text-[8px]">{spec.crazingResistance?.description || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Modulus of Rupture Test */}
            {subtests.rupture?.enabled && (
              <div>
                <h3 className="text-[10px] font-bold text-slate-900 mb-2">
                  (6) Test for Modulus of Rupture and Breaking Strength
                </h3>
                <div
                  className="overflow-hidden border border-slate-400 rounded-lg"
                  style={exactPrintColor}
                >
                  <table className="w-full text-[9px] text-left">
                    <thead
                      className="bg-slate-100 text-slate-700 font-bold border-b border-slate-400"
                      style={exactPrintColor}
                    >
                      <tr>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Sl. No.</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Length (mm)</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Breadth (mm)</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Thickness (mm)</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Breaking Load (N)</th>
                        <th className="px-2 py-1.5 border-r border-slate-400 text-center">Breaking Strength (N)</th>
                        <th className="px-2 py-1.5 text-center">Modulus of Rupture (N/mm²)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-400">
                      {specimens.map((spec, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="px-2 py-1 border-r border-slate-400 text-center font-semibold">{idx + 1}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center">{spec.ruptureCalc?.length || "—"}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center">{spec.ruptureCalc?.breadth || "—"}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center">{spec.ruptureCalc?.thickness || "—"}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center">{spec.ruptureCalc?.breakingLoad || "—"}</td>
                          <td className="px-2 py-1 border-r border-slate-400 text-center">{spec.ruptureCalc?.breakingStrength || "—"}</td>
                          <td className="px-2 py-1 text-center">{spec.ruptureCalc?.modulusOfRupture || "—"}</td>
                        </tr>
                      ))}
                      <tr className="bg-slate-50 font-semibold border-t-2 border-slate-400">
                        <td className="px-2 py-1 border-r border-slate-400 text-center">Avg.</td>
                        <td colSpan="5" className="px-2 py-1 text-center">—</td>
                        <td className="px-2 py-1 text-center">{averages.rupture.modulusAvg}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>

          {/* Remarks Section */}
          <section className="flex flex-col flex-1 print:relative print:pb-20">
            <div className="mb-6">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 border-b border-slate-100 inline-block">
                Remarks
              </p>
              <div className="text-[9px] text-slate-600 space-y-0.5 leading-tight">
                <p>
                  <span className="font-bold text-slate-700">Note 1:</span> All
                  measurements in millimeters unless otherwise specified.
                </p>
                <p>
                  <span className="font-bold text-slate-700">Note 2:</span> Tests
                  conducted as per relevant Indian Standards.
                </p>
              </div>
            </div>

            {/* Signature Block */}
            <div className="grid grid-cols-2 gap-10 mt-8 pt-4 border-t border-slate-100 print:mt-0 print:pt-3 print:break-inside-avoid print:absolute print:bottom-0 print:left-0 print:right-0">
              <div className="text-center">
                <div className="h-10"></div>
                <p className="font-black text-slate-900 text-[10px] uppercase">
                  Tested By
                </p>
                <p className="text-[9px] text-slate-500 uppercase tracking-tighter">
                  Lab Technician
                </p>
              </div>
              <div className="text-center">
                <div className="h-10"></div>
                <p className="font-black text-slate-900 text-[10px] uppercase">
                  Verified By
                </p>
                <p className="text-[9px] text-slate-500 uppercase tracking-tighter">
                  Faculty In-charge
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white p-2 rounded-2xl shadow-xl border border-slate-200 print:hidden">
        <button
          onClick={() => window.location.href = "/"}
          className="flex items-center gap-2 px-5 py-2.5 text-slate-600 font-bold text-sm hover:bg-slate-50 rounded-xl transition-colors"
        >
          <RefreshCw size={16} />
          <span className="hidden md:inline">Restart</span>
        </button>
        <div className="w-px h-8 bg-slate-200 mx-1" />
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition-all shadow-lg"
        >
          <Printer size={16} /> Print Report
        </button>
      </div>
    </div>
  );
};

export default TileResult;
