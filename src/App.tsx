import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from "./components/Layouts/NavBar/navBar"
import OverView from "./components/Dashboard/OverView/OverView"
const App = () => {
  return (
   <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<OverView />} />
          {/* <Route path="/risk-assessment" element={<RiskAssessment />} /> */}
          {/* <Route path="/workflow-automation" element={<WorkflowAutomation />} /> */}
        </Routes>
      </BrowserRouter>
   </div>
  )
}

export default App
