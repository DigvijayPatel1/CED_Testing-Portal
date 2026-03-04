const TestCard = ({ title, rangeInfo, children }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
    <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
    <p className="text-slate-500 mb-8 border-b pb-4">{rangeInfo}</p>
    {children}
  </div>
);

export default TestCard;