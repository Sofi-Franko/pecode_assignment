import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SuppliersPage from './pages/Suppliers';
import CustomersPage from './pages/Customers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/customers" element={<CustomersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
