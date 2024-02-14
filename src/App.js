import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pay from './components/pay';
import SuccessPage from './pages/SuccessPage';
import FailurePage from './pages/FailurePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pay />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/failure" element={<FailurePage />} />
      </Routes>
    </Router>
  );
}

export default App;
