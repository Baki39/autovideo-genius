
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import NewProject from './pages/NewProject';
import ContentStudio from './pages/ContentStudio';
import Analytics from './pages/Analytics';
import ContentCalendar from './pages/ContentCalendar';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-project" element={<NewProject />} />
        <Route path="/content-studio" element={<ContentStudio />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/content-calendar" element={<ContentCalendar />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
