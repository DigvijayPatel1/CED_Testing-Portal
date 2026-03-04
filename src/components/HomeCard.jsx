import { ClipboardCheck, ArrowRight } from 'lucide-react';

const HomeCard = ({ test, onClick }) => (
  <div 
    onClick={() => onClick(test.id)}
    className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group hover:border-blue-400"
  >
    <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition">
      <ClipboardCheck className="text-blue-600" />
    </div>
    <h3 className="text-lg font-bold text-slate-800 mb-2">{test.name}</h3>
    <p className="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-2">{test.description}</p>
    <div className="flex items-center text-blue-600 text-sm font-semibold">
      Start Test <ArrowRight size={16} className="ml-1" />
    </div>
  </div>
);

export default HomeCard;