import React from 'react';

interface DivideHorizontalContainerProps {
  children: React.ReactNode;
}

const DivideHorizontalContainer: React.FC<DivideHorizontalContainerProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flex: 1, overflow: 'auto' }}>{children}</div>
      <div style={{ flex: 1, overflow: 'auto' }}>{children}</div>
    </div>
  );
};

export default DivideHorizontalContainer;
