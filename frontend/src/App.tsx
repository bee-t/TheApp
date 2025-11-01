import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import './App.css';

const App: React.FC = () => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={!token ? <Login /> : <Navigate to="/" />} 
          />
          <Route 
            path="/signup" 
            element={!token ? <Signup /> : <Navigate to="/" />} 
          />
          <Route 
            path="/" 
            element={token ? <Home /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;