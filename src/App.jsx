import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import CompStrengthInput from './pages/inputpages/CompStrengthInput.jsx';
import PaverBlockInput from './pages/inputpages/PaverBlockInput.jsx';
import CementInput from './pages/inputpages/CementInput.jsx';
import BrickInput from './pages/inputpages/BrickInput.jsx';
import CompStrengthRes from './pages/resultpages/CompStrengthRes.jsx';
import PaverBlockRes from './pages/resultpages/PaverBlockRes.jsx';
import CementResult from './pages/resultpages/CementResult.jsx';
import BrickResult from  './pages/resultpages/BrickResult.jsx';
import TileInput from './pages/inputpages/TileInput.jsx';
import TileSubtestInput from './pages/inputpages/TileSubtestInput.jsx';
import TileResult from './pages/resultpages/TileResult.jsx';
import ConcreteMixInput from './pages/inputpages/ConcreteMixInput.jsx';
import ConcreteMixResult from './pages/resultpages/ConcreteMixResult.jsx';
import paverBlockCalc from './utils/calculations/paverBlockCalc.js';
import cementCalc from './utils/calculations/cementCalc.js';
import compStrengthCalc from './utils/calculations/compStrengthCalc.js';
import brickCalc from './utils/calculations/brickCalc.js';
import tileCalc from './utils/calculations/tileCalc.js';
import concreteMixCalc from './utils/calculations/concreteMixCalc.js';
import './index.css';

const TEST_PAGE_MAP = {
  compressive_strength: {
    InputComponent: CompStrengthInput,
    ResultComponent: CompStrengthRes,
    calculate: compStrengthCalc,
  },
  compressiveStrengthof_PaverBlock: {
    InputComponent: PaverBlockInput,
    ResultComponent: PaverBlockRes,
    calculate: paverBlockCalc,
  },
  cement_Test: {
    InputComponent: CementInput,
    ResultComponent: CementResult,
    calculate: cementCalc,
  },
  compressiveStrengthof_Brick: {
    InputComponent: BrickInput,
    ResultComponent: BrickResult,
    calculate: brickCalc,
  },
  tileTest: {
    InputComponent: TileInput,
    ResultComponent: TileResult,
    calculate: tileCalc,
  },
  concreteMixTest: {
    InputComponent: ConcreteMixInput,
    ResultComponent: ConcreteMixResult,
    calculate: concreteMixCalc,
  }
};

function UnsupportedTestPage({ testId, onBack, stage }) {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white border border-slate-200 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold text-slate-800">Test page not configured</h2>
      <p className="text-slate-600 mt-2">
        No {stage} page is configured for test ID: <span className="font-semibold">{testId}</span>
      </p>
      <button
        onClick={onBack}
        className="mt-6 px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
      >
        Back to Home
      </button>
    </div>
  );
}

function TestRoute() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const testConfig = TEST_PAGE_MAP[testId];

  if (!testConfig) {
    return <UnsupportedTestPage testId={testId} stage="input" onBack={() => navigate('/')} />;
  }

  const { InputComponent, calculate } = testConfig;

  const handleTestSubmit = (submittedTestId, formData) => {
    const report = calculate(submittedTestId, formData);
    navigate(`/resultpages/${submittedTestId}`, {
      state: { result: report },
    });
  };

  return <InputComponent testId={testId} onSubmit={handleTestSubmit} />;
}

function ResultRoute() {
  const { testId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const testConfig = TEST_PAGE_MAP[testId];

  if (!testConfig) {
    return <UnsupportedTestPage testId={testId} stage="result" onBack={() => navigate('/')} />;
  }

  const { ResultComponent, calculate } = testConfig;
  const storedResult = location.state?.result;
  const result = storedResult?.formData
    ? calculate(testId, storedResult.formData)
    : storedResult;

  if (!result) {
    return <Navigate to={`/inputpage/${testId}`} replace />;
  }

  return <ResultComponent result={result} onRestart={() => navigate('/')} />;
}

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      <Navbar onNavigate={() => navigate('/')} />
      <main className="py-6">
        <Routes>
          <Route
            path="/"
            element={<HomePage onSelectTest={(id) => navigate(`/inputpage/${id}`)} />}
          />
          <Route path="/inputpage/:testId" element={<TestRoute />} />
          <Route path="/resultpages/:testId" element={<ResultRoute />} />
          <Route path="/tile-input" element={<TileInput />} />
          <Route path="/tile-input/subtest/:subtestId" element={<TileSubtestInput />} />
          <Route path="/tile-result" element={<TileResult />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
