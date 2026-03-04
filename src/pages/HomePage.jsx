import STANDARDS from '../data/standards.js';
import HomeCard from '../components/HomeCard.jsx';

const HomePage = ({ onSelectTest }) => (
  <div className="max-w-6xl mx-auto p-8">
    <header className="mb-10">
      <h1 className="text-3xl font-extrabold text-slate-900">Standardized Engineering Tests</h1>
      <p className="text-slate-600 mt-2">Select a material test below to input laboratory data and verify compliance with industry standards.</p>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.values(STANDARDS).map(test => (
        <HomeCard 
          key={test.id} 
          test={test} 
          onClick={onSelectTest} 
        />
      ))}
    </div>
  </div>
);

export default HomePage;

