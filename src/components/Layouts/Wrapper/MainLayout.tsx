import React from 'react';
import NavBar from '../NavBar/navBar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div style={{
      maxWidth: '1680px',
      margin: '0 auto',
      padding: '20px',
      width: '100%',
      minHeight: '100vh',
      boxSizing: 'border-box',
      backgroundColor: '#f9f9f9',
      border: '1px solid #d9d9d9',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}>
      <NavBar />
      <div>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
