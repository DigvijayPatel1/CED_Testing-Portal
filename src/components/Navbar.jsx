import { Home as HomeIcon } from 'lucide-react';
import nitclogo from '../assets/NITC_logo.png';

const Navbar = ({ onNavigate }) => (
  <nav className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-10 print:hidden">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2 cursor-pointer" onClick={onNavigate}>
        <img src={nitclogo} alt="NITC_logo" className="w-10 h-10 object-contain" />
        <span className="font-bold text-xl tracking-tight">
          CED_Testing Portal <span className="text-blue-400 text-sm font-normal">v1.1</span>
        </span>
      </div>
      <div className="flex gap-6 text-sm font-medium">
        <button onClick={onNavigate} className="hover:text-blue-400 transition flex items-center gap-1">
          <HomeIcon size={16} /> Home
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;
