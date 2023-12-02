import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/signup.js';
import Login from './pages/login.js';
import AccountSettings from './pages/AccountSettings.js';
import CoachesLookup from './pages/CoachesLookup.js'; // Import Coaches Look Up page
import InitialSurvey from './pages/initialSurvey.js';
import Admin from './pages/admin.js';


function App() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup onSwitch={handleSwitch} />} />
          <Route path="/login" element={<Login onSwitch={handleSwitch} />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/coaches-lookup" element={<CoachesLookup />} />
          <Route path="*" element={<Navigate to="/account-settings" replace />} />
          <Route path="/initial-survey" element={<InitialSurvey />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
