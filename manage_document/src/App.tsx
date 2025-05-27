import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocumentTable from './components/Document/DocumentTable';
import DocumentDetailTable from './components/DocumentDetail/DocumentDetailTable';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<DocumentTable />} />
          <Route path="/documents/:documentNumber" element={<DocumentDetailTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 