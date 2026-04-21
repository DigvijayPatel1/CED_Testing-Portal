import React from "react";
import { LayoutGrid, Layers } from "lucide-react";

const InputSidebar = ({ summary, stats = [], tips = [] }) => {
  return (
    <aside className="space-y-6 lg:sticky lg:top-6 self-start">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <LayoutGrid size={18} className="text-emerald-600" />
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">
            Quick Summary
          </h2>
        </div>
        <p className="text-sm text-slate-500 leading-6">{summary}</p>
        {stats.length > 0 && (
          <div className="mt-6 space-y-3 text-sm text-slate-600">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
              >
                <span>{stat.label}</span>
                <span className={`font-semibold ${stat.valueClassName || "text-slate-900"}`}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Layers size={18} className="text-slate-500" />
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">
            Input Tips
          </h2>
        </div>
        <ul className="space-y-3 text-sm text-slate-600">
          {tips.map((tip) => (
            <li key={tip} className="rounded-2xl bg-slate-50 px-4 py-3">
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default InputSidebar;
