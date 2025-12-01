import React from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { BottomNavigation, Sidebar } from './components/Navigation';
import { FinancialProvider } from './context/FinancialContext';
import { Accounts } from './pages/Accounts';
import { AddTransaction } from './pages/AddTransaction';
import { Budgets } from './pages/Budgets';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isFullScreen = location.pathname === '/add';

  return (
    <div className="w-full h-screen bg-background-dark text-white flex overflow-hidden">
      {/* Sidebar for Desktop */}
      {!isFullScreen && <Sidebar />}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        <main className="flex-1 overflow-y-auto relative scroll-smooth bg-background-dark no-scrollbar">
          <div className={`w-full h-full mx-auto ${isFullScreen ? '' : 'max-w-7xl'}`}>
            {children}
          </div>
        </main>
        
        {/* Bottom Navigation for Mobile */}
        {!isFullScreen && <BottomNavigation />}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <FinancialProvider>
      <HashRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/add" element={<AddTransaction />} />
          </Routes>
        </AppLayout>
      </HashRouter>
    </FinancialProvider>
  );
};

export default App;