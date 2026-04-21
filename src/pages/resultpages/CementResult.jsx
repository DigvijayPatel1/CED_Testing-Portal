import { useEffect } from "react";

import {

  Printer,

  RefreshCw,

  Building,

  Calendar,

  ClipboardList,

  Beaker,

} from "lucide-react";

import nitclogo from "../../assets/NITC_logo.png";



const displayValue = (value, fallback = "—") => {

  if (value === null || value === undefined || value === "") {

    return fallback;

  }



  return value;

};



const ResultPage = ({ result, onRestart }) => {

  useEffect(() => {

    window.scrollTo({ top: 0, behavior: "instant" });

  }, []);



  console.log('Result:', result);



  const commonData = result?.formData?.commonData || {};

  const specimens = result?.specimens || result?.formData?.specimens || [];

  const hasIndividualSpecimenFailure = specimens.some((s) => s?.isOutOfRange);



  const getStatusTheme = () => {

    if (result.status === "PASS") {

      return {

        color: "text-emerald-700",

        bg: "bg-emerald-50",

        border: "border-emerald-200",

        badge: "bg-emerald-600",

      };

    }



    if (result.status === "FAIL") {

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

      <div className="bg-white w-full max-w-[210mm] shadow-2xl rounded-xl print:shadow-none print:w-full print:max-w-none print:rounded-none print:overflow-visible print:flex print:flex-col print:box-border print:min-h-[250mm]">

        <div

          className={`h-2 w-full rounded-t-xl ${theme.badge}`}

          style={exactPrintColor}

        />



        <div className="p-8 print:p-4 relative flex flex-col h-full print:flex-1">

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

              {result.name || "Test Report"}

            </h2>

          </header>



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

              Status: {result.status}

            </div>

          </div>



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

                  {displayValue(commonData.sampleIdentification, "Not Specified")}

                </span>

                <span className="text-slate-600">Description:</span>

                <span className="font-medium text-slate-800">

                  Cement cubes provided by party

                </span>

                <span className="text-slate-600">Test Standard:</span>

                <span className="font-medium text-slate-800 italic">

                  IS: 4031 Part 4,5 & 6 - 1988

                </span>

                <span className="text-slate-600">Grade of Cement:</span>

                <span className="font-medium text-slate-800 italic">

                  {displayValue(commonData.cementGrade)}

                </span>

                <span className="text-slate-600">Brand of Cement:</span>

                <span className="font-medium text-slate-800 italic">

                  {displayValue(commonData.cementBrand)}

                </span>

              </div>

            </div>

          </section>



          <section className="mb-4 text-[10px]">

            <div className="space-y-1.5">

              <h3 className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-1">

                <Beaker size={10} /> Consistency

              </h3>



              <div className="flex items-center gap-2">

                <span className="text-slate-600">Standard Consistency:</span>

                <span className="font-semibold text-slate-900">

                  {displayValue(

                    commonData.consistency !== ""

                      ? `${commonData.consistency} %`

                      : "",

                  )}

                </span>

              </div>

            </div>

          </section>



          <section className="grid grid-cols-2 gap-6 mb-4 text-[10px]">

            <div className="space-y-1.5">

              <h3 className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-1">

                <Building size={10} /> Setting Time

              </h3>

              <div className="grid grid-cols-[100px_1fr] gap-y-1">

                <span className="text-slate-600">Initial Setting Time:</span>

                <span className="font-semibold text-slate-900">

                  {displayValue(commonData.initialST)}

                </span>

                <span className="text-slate-600">Final Setting Time:</span>

                <span className="font-medium text-slate-800">

                  {displayValue(commonData.finalST)}

                </span>

              </div>

            </div>

          </section>



          <section className="mb-4">

            <h3 className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">

              <ClipboardList size={10} /> Test Observations & Results

            </h3>



            <div

              className="overflow-hidden border border-slate-400 rounded-lg print:border-slate-400"

              style={exactPrintColor}

            >

              <table className="w-full text-[10px] text-left border-collapse">

                <thead

                  className="bg-slate-100 text-slate-700 font-bold uppercase text-[9px] tracking-wider border-b border-slate-400 print:bg-slate-100"

                  style={exactPrintColor}

                >

                  <tr>

                    <th

                      rowSpan={2}

                      className="px-2 py-1.5 w-16 text-center border-r border-b border-slate-400 align-middle"

                    >

                      Sample ID

                    </th>

                    <th

                      colSpan={3}

                      className="px-3 py-1.5 text-center border-r border-b border-slate-400"

                    >

                      Compressive strength (N/mm²)

                    </th>

                    <th

                      rowSpan={2}

                      className="px-3 py-1.5 w-32 text-center border-b border-slate-400 align-middle"

                    >

                      Avg Compressive strength

                    </th>

                  </tr>

                  <tr>

                    <th className="px-3 py-1.5 text-center border-r border-slate-400">

                      3 days

                    </th>

                    <th className="px-3 py-1.5 text-center border-r border-slate-400">

                      7 days

                    </th>

                    <th className="px-3 py-1.5 text-center border-r border-slate-400">

                      28 days

                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-400">

                  {specimens.map((s, i) => (

                    <tr

                      key={i}

                      className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}

                    >

                      <td className="px-2 py-2 text-center font-bold text-slate-500 border-r border-slate-400">

                        {displayValue(s.specimenId, i + 1)}

                      </td>

                      <td className="px-3 py-2 text-center text-slate-700 border-r border-slate-400">

                        {displayValue(s.strength3d)}

                      </td>

                      <td className="px-3 py-2 text-center text-slate-700 border-r border-slate-400">

                        {displayValue(s.strength7d)}

                      </td>

                      <td className="px-3 py-2 text-center text-slate-700 border-r border-slate-400">

                        {displayValue(s.strength28d)}

                      </td>

                      {i === 0 ? (

                        <td

                          className="px-3 py-2 bg-white align-middle"

                          rowSpan={specimens.length}

                        >

                          <div className="flex flex-col gap-2">

                            <div className="flex justify-between items-center border-b border-slate-100 pb-1">

                              <span className="text-slate-400 text-[8px] font-bold">

                                3 days:

                              </span>

                              <span className="font-black text-slate-600">

                                {displayValue(result.avgStrength3d)}

                              </span>

                            </div>

                            <div className="flex justify-between items-center border-b border-slate-100 pb-1">

                              <span className="text-slate-400 text-[8px] font-bold">

                                7 days:

                              </span>

                              <span className="font-black text-slate-600">

                                {displayValue(result.avgStrength7d)}

                              </span>

                            </div>

                            <div className="flex justify-between items-center">

                              <span className="text-slate-400 text-[8px] font-bold">

                                28 days:

                              </span>

                              <span className="font-black text-slate-600">

                                {displayValue(result.avgStrength28d)}

                              </span>

                            </div>

                          </div>

                        </td>

                      ) : null}

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>



          <section className="flex flex-col flex-1 print:relative print:pb-20">

            <div className="mb-6">

              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 border-b border-slate-100 inline-block">

                Remarks

              </p>

              <div className="text-[9px] text-slate-600 space-y-0.5 leading-tight">

                <p>

                  <span className="font-bold text-slate-700">Note 1:</span> Date

                  of casting as reported by the party in their letter.

                </p>

              </div>

            </div>



            <div className="grid grid-cols-2 gap-10 mt-8 pt-4 border-t border-slate-100 print:mt-0 print:pt-3 print:break-inside-avoid print:absolute print:bottom-0 print:left-0 print:right-0">

              <div className="text-center">

                <div className="h-10" />

                <p className="font-black text-slate-900 text-[10px] uppercase">

                  Tested By

                </p>

                <p className="text-[9px] text-slate-500 uppercase tracking-tighter">

                  Lab Technician

                </p>

              </div>

              <div className="text-center">

                <div className="h-10" />

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



      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white p-2 rounded-2xl shadow-xl border border-slate-200 print:hidden">

        <button

          onClick={onRestart}

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



export default ResultPage;

