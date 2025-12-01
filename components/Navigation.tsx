import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavItemProps {
  path: string;
  icon: string;
  label: string;
  isActive: boolean;
  onClick: (p: string) => void;
  isSidebar?: boolean;
}

const NavItem = ({ path, icon, label, isActive, onClick, isSidebar = false }: NavItemProps) => (
  <button 
    onClick={() => onClick(path)}
    className={`
      flex items-center 
      ${isSidebar ? 'w-full px-6 py-4 gap-4 hover:bg-white/5 transition-colors rounded-xl mx-2 w-auto' : 'flex-col justify-center w-full h-full space-y-1'}
      ${isActive ? 'text-primary bg-primary/10' : 'text-gray-400 hover:text-gray-200'}
    `}
  >
    <span 
      className={`material-symbols-outlined ${isActive && !isSidebar ? 'fill-current' : ''}`} 
      style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
    >
      {icon}
    </span>
    <span className={`${isSidebar ? 'text-base font-medium' : 'text-[10px] font-medium'}`}>{label}</span>
  </button>
);

export const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background-card border-t border-white/5 pb-safe z-50 md:hidden">
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        <NavItem path="/" icon="dashboard" label="Home" isActive={location.pathname === '/'} onClick={handleNav} />
        <NavItem path="/transactions" icon="receipt_long" label="Activity" isActive={location.pathname === '/transactions'} onClick={handleNav} />
        
        {/* Floating Action Button Placeholder */}
        <div className="relative -top-5">
            <button 
                onClick={() => navigate('/add')}
                className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-background-dark shadow-lg shadow-primary/40 transform transition-transform active:scale-95"
            >
                <span className="material-symbols-outlined text-3xl">add</span>
            </button>
        </div>

        <NavItem path="/budgets" icon="pie_chart" label="Budgets" isActive={location.pathname === '/budgets'} onClick={handleNav} />
        <NavItem path="/accounts" icon="account_balance_wallet" label="Accounts" isActive={location.pathname === '/accounts'} onClick={handleNav} />
      </div>
    </nav>
  );
};

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path: string) => {
    navigate(path);
  };

  return (
    <aside className="hidden md:flex flex-col w-64 h-full bg-background-card border-r border-white/5 pt-6 pb-6">
      <div className="px-8 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-background-dark">wallet</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight">PocketFlow</h1>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <NavItem isSidebar path="/" icon="dashboard" label="Dashboard" isActive={location.pathname === '/'} onClick={handleNav} />
        <NavItem isSidebar path="/transactions" icon="receipt_long" label="Activity & Reports" isActive={location.pathname === '/transactions'} onClick={handleNav} />
        <NavItem isSidebar path="/budgets" icon="pie_chart" label="Budgets" isActive={location.pathname === '/budgets'} onClick={handleNav} />
        <NavItem isSidebar path="/accounts" icon="account_balance_wallet" label="Accounts" isActive={location.pathname === '/accounts'} onClick={handleNav} />
      </div>

      <div className="px-6">
        <button 
            onClick={() => navigate('/add')}
            className="w-full py-3 rounded-xl bg-primary text-background-dark font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
        >
            <span className="material-symbols-outlined">add</span>
            Add Transaction
        </button>
      </div>
    </aside>
  );
};