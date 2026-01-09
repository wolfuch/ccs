import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import ProtectedRoute from './components/ProtectedRoute';
import { ItemFooter } from './components/ItemFooter';
import { Loading } from "./components/loading/loading";
import TopBar from "./components/general/TopBar";
import './utils/i18n';

function App() {
  return (
    <>
      <Suspense fallback={<Loading style={{ position: "fixed", overflowY: "auto" }} />}>
        <main>
          <TopBar />

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
        
        </main>

        <ItemFooter />
    </Suspense>
    </>
  );
}

export default App;
