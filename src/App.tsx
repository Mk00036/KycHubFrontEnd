import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OverView from "./components/Dashboard/OverView/OverView";
import MainLayout from '../src/components/Layouts/Wrapper/MainLayout';

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<OverView />} />
          {/* <Route path="/risk-assessment" element={<RiskAssessment />} /> */}
          {/* <Route path="/workflow-automation" element={<WorkflowAutomation />} /> */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
