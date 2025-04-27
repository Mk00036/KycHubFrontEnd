import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OverView from "./components/Dashboard/OverView/OverView";
import MainLayout from '../src/components/Layouts/Wrapper/MainLayout';
import RiskAssessment from './components/Dashboard/RiskAssesment/RiskAssesment';
import WorkFlowAutomation from './components/Dashboard/WorkFlowAutomation/WorkFlowAutomation';
const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<OverView />} />
          <Route path="/risk-assessment" element={<RiskAssessment />} />
          <Route path="/workflow-automation" element={<WorkFlowAutomation />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
