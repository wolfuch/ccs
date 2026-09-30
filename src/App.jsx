import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import ProtectedRoute from './components/ProtectedRoute';
import { Loading } from './components/ui/Loading/loading';
import './utils/i18n';

function App() {
  return (
    <Suspense fallback={<Loading style={{ position: "fixed", overflowY: "auto" }} />}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          } />
          <Route path="/change-password" element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Login />} /> {/* Ruta por defecto */}
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
