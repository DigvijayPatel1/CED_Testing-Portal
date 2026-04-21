import { useState, useEffect } from "react";

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

  if (value === null || value === undefined || value === "") return fallback;

  return value;

};



const ReportHeader = ({ title }) => (

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

        {title || "Test Report"}

      </h2>

      <div className="h-px flex-1 bg-slate-300" />

    </div>

  </header>

);



const ReportFooter = ({ pageNum, totalPages }) => (

  <footer className="mt-auto pt-4 border-t-2 border-sky-100 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-slate-400 shrink-0">

    <span className="text-slate-500">NITC Material Testing Lab</span>

    <span className="font-bold text-slate-600">

      Page {pageNum} of {totalPages}

    </span>

  </footer>

);



const Page = ({ children }) => (

  <div className="compstrength-print-fit relative w-full max-w-[210mm] min-h-[297mm] mx-auto bg-[linear-gradient(180deg,#f8fdff_0%,#ffffff_14%)] border-[5px] border-sky-200 shadow-[0_16px_50px_rgba(14,116,144,0.14)] mb-10 flex flex-col p-[20mm] box-border overflow-hidden print:shadow-none print:mb-0">

    <div className="pointer-events-none absolute inset-0 border-[10px] border-white/70" />

    <div className="pointer-events-none absolute left-0 top-0 h-20 w-20 rounded-br-[2.5rem] bg-sky-100/70" />

    <div className="pointer-events-none absolute right-0 bottom-0 h-24 w-24 rounded-tl-[3rem] bg-teal-100/60" />

    {children}

  </div>

);



const ResultPage = ({ result, onRestart }) => {

  const [reportRef] = useState(() =>

    Math.random().toString(36).substr(2, 9).toUpperCase(),

  );



  useEffect(() => {

    window.scrollTo({ top: 0, behavior: "instant" });

  }, []);



  const commonData = result?.formData?.commonData || {};

  const specimens = result?.specimens || result?.formData?.specimens || [];

  const hasIndividualSpecimenFailure = specimens.some((s) => s?.isOutOfRange);



  const getStatusTheme = () => {

    if (result.status === "PASS") {

      return {

        badge: "bg-emerald-600",

      };

    }

    if (result.status === "FAIL") {

      return {

        badge: "bg-red-600",

      };

    }

    return {

      badge: "bg-amber-600",

    };

  };



  const theme = getStatusTheme();



  return (

    <>

      <style>{`

        @media print {

          @page { size: A4; margin: 0; }

          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white; }

          html, body { overflow: visible; }

          .compstrength-print-fit {

            zoom: 0.96;

          }

        }

      `}</style>



      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#e0f2fe_0%,_#f8fafc_28%,_#eef2ff_100%)] py-10 px-4 flex flex-col font-sans print:py-0 print:px-0 print:bg-white">

        <Page>

          <ReportHeader title={result?.name || "Test Report"} />



          <main className="flex-1 flex flex-col">

            <div className="mb-4 flex flex-row justify-between items-center bg-white/85 rounded-2xl p-3 border border-slate-300">

              <div className="flex gap-6 text-[11px]">

                <div className="flex items-center gap-2">

                  <Calendar size={14} className="text-slate-500" />

                  <span className="text-slate-600 font-medium">Date:</span>

                  <span className="font-bold text-slate-800">

                    {new Date().toLocaleDateString()}

                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <span className="text-slate-600 font-medium">Report Ref:</span>

                  <span className="font-bold text-slate-800">{reportRef}</span>

                </div>

              </div>



              <div

                className={`px-2.5 py-1 rounded text-white text-[10px] font-bold uppercase tracking-wider print-hidden${theme.badge}`}

              >

                Status: {displayValue(result.status)}

              </div>

            </div>



            <section className="grid grid-cols-2 gap-6 mb-5 text-[11px]">

              <div className="space-y-2 rounded-2xl border border-slate-300 bg-white/85 p-4">

                <h3 className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 pb-2">

                  <Building size={12} /> Client Details

                </h3>

                <div className="grid grid-cols-[90px_1fr] gap-y-1.5">

                  <span className="text-slate-600">Client:</span>

                  <span className="font-semibold text-slate-900 ">

                    {displayValue(commonData.client)}

                  </span>

                  <span className="text-slate-600">Address:</span>

                  <span className="font-medium text-slate-800">

                    {displayValue(commonData.clientAddress)}

                  </span>

                </div>

              </div>



              <div className="space-y-2 rounded-2xl border border-slate-300 bg-white/85 p-4">

                <h3 className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 pb-2">

                  <Beaker size={12} /> Sample Information

                </h3>

                <div className="grid grid-cols-[110px_1fr] gap-y-1.5">

                  <span className="text-slate-600">Sample ID:</span>

                  <span className="font-semibold text-slate-900">

                    {displayValue(commonData.sampleIdentification, "Not Specified")}

                  </span>

                  <span className="text-slate-600">Description:</span>

                  <span className="font-medium text-slate-800">

                    Concrete cubes provided by party

                  </span>

                  <span className="text-slate-600">Test Standard:</span>

                  <span className="font-medium text-slate-800 italic">

                    IS: 516 – 1959

                  </span>

                </div>

              </div>

            </section>



            <section className="mb-5">

              <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-800 mb-3">

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-700 border border-sky-200">

                  <ClipboardList size={16} />

                </span>

                Test Observations & Results

              </h3>



              <div className="overflow-hidden rounded-2xl border border-slate-500 shadow-[0_8px_18px_rgba(15,23,42,0.05)]">

                <table className="w-full text-[11px] text-left border-collapse">

                  <thead className="bg-[linear-gradient(180deg,#eef8ff_0%,#f8fbfd_100%)] border-b border-slate-500 text-[10px] uppercase tracking-[0.12em] text-slate-700 font-bold">

                    <tr>

                      <th className="px-2 py-2 w-8 text-center border-r border-slate-400">

                        #

                      </th>

                      <th className="px-3 py-2 w-1/3 border-r border-slate-400">

                        Parameter

                      </th>

                      {specimens.map((s, i) => (

                        <th

                          key={i}

                          className="px-3 py-2 text-center border-r border-slate-400 last:border-r-0"

                        >

                          Specimen {i + 1}

                        </th>

                      ))}

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-400">

                    {[

                      {

                        label: "Identification",

                        val: (i) => displayValue(specimens[i]?.specimenId),

                      },

                      {

                        label: "Date of Testing",

                        val: () => displayValue(commonData.dateTesting),

                      },

                      {

                        label: "Date of Casting",

                        val: () => displayValue(commonData.dateCasting),

                        note: "(Note 1)",

                      },

                      {

                        label: "Age of Specimen (days)",

                        val: () => displayValue(result.ageofSpecimen),

                      },

                      {

                        label: "Curing Conditions",

                        val: () =>

                          commonData.curingCondition === "None"

                            ? "Note 2"

                            : displayValue(commonData.curingCondition),

                      },

                      {

                        label: "Weight",

                        val: (i) =>

                          specimens[i]?.weight

                            ? `${specimens[i].weight} kg`

                            : "—",

                      },

                      {

                        label: "Dimensions (mm)",

                        val: () => displayValue(commonData.specimenSize),

                      },

                      {

                        label: "Cross-sectional Area (mm²)",

                        val: () => displayValue(result.areaUsed),

                      },

                      {

                        label: "Maximum Load (kN)",

                        val: (i) => displayValue(specimens[i]?.load),

                      },

                      {

                        label: "Compressive Strength (N/mm²)",

                        val: (i) => displayValue(specimens[i]?.strength),

                      },

                      {

                        label: "Fracture Type",

                        val: (i) => displayValue(specimens[i]?.fractureType),

                      },

                      {

                        label: "Average Strength (N/mm²)",

                        val: () =>

                          hasIndividualSpecimenFailure

                            ? "Note 3"

                            : displayValue(result.calculatedValue),

                      },

                    ].map((row, idx) => (

                      <tr

                        key={idx}

                        className={idx % 2 === 0 ? "bg-white" : "bg-sky-100/60"}

                      >

                        <td className="px-2 py-1.5 text-center font-bold text-slate-500 text-[10px] border-r border-slate-400 italic">

                          {String.fromCharCode(97 + idx)}

                        </td>

                        <td className="px-3 py-1.5 font-medium text-slate-800 border-r border-slate-400">

                          {row.label}{" "}

                          {row.note && (

                            <span className="text-slate-500 text-[10px] font-normal ml-1 italic">

                              {row.note}

                            </span>

                          )}

                        </td>

                        {specimens.map((_, i) => (

                          <td

                            key={i}

                            className="px-3 py-1.5 text-center border-r border-slate-400 last:border-r-0 text-slate-700"

                          >

                            {row.val(i)}

                          </td>

                        ))}

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </section>



            <section className="flex flex-col flex-1">

              <article className="mt-1 p-5 bg-[linear-gradient(135deg,#f0f9ff_0%,#f8fafc_55%,#ecfeff_100%)] border border-sky-200 rounded-2xl shadow-[0_10px_24px_rgba(14,116,144,0.08)] mb-6">

                <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-sky-800 mb-2">

                  Remarks

                </h4>

                <div className="text-[11px] text-slate-600 space-y-1 leading-relaxed">

                  <p>

                    <span className="font-bold text-slate-700">Note 1:</span> Date

                    of casting as reported by the party in their letter.

                  </p>

                  <p>

                    <span className="font-bold text-slate-700">Note 2:</span>{" "}

                    Cubes have been delivered after completion of curing; curing

                    condition unknown to the lab.

                  </p>

                  {hasIndividualSpecimenFailure && (

                    <p>

                      <span className="font-bold text-slate-700">Note 3:</span>{" "}

                      Average value is not reported because individual specimen

                      compressive strength values deviates by more than 15% from

                      the average compressive strength.

                    </p>

                  )}

                </div>

              </article>



              <div className="mt-auto pt-10 pb-6">

                <div className="grid grid-cols-2 gap-10">

                  <div className="text-center rounded-2xl border border-slate-200 bg-white/70 px-4 py-6">

                    <div className="h-14 border-b border-dashed border-slate-400 w-48 mx-auto mb-3" />

                    <p className="font-black text-slate-900 text-[11px] uppercase tracking-widest">

                      Tested By

                    </p>

                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">

                      Lab Technician

                    </p>

                  </div>

                  <div className="text-center rounded-2xl border border-slate-200 bg-white/70 px-4 py-6">

                    <div className="h-14 border-b border-dashed border-slate-400 w-48 mx-auto mb-3" />

                    <p className="font-black text-slate-900 text-[11px] uppercase tracking-widest">

                      Verified By

                    </p>

                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">

                      Faculty In-charge

                    </p>

                  </div>

                </div>

              </div>

            </section>

          </main>



          <ReportFooter pageNum={1} totalPages={1} />

        </Page>



        {/* <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl shadow-2xl print:hidden">

          <button

            onClick={onRestart}

            className="flex items-center gap-2 px-5 py-3 text-slate-300 font-bold text-sm hover:bg-slate-800 rounded-xl transition-colors "

          >

            <RefreshCw size={18} />

            <span className="hidden md:inline">Restart</span>

          </button>

          <div className="w-px h-8 bg-slate-700 mx-1" />

          <button

            onClick={() => window.print()}

            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold text-sm rounded-xl hover:bg-slate-100 transition-all shadow-sm "

          >

            <Printer size={18} />

            <span>Print Report</span>

          </button>

        </div> */}

      </div>

    </>

  );

};



export default ResultPage;