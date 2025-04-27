import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
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
    }}>
      {children}
    </div>
  );
};

export default PageLayout;
