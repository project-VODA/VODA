import React from 'react';

interface DivideHorizontalContainerProps {
  leftChild: React.ReactNode;
  rightChild: React.ReactNode;
}

const DivideHorizontalContainer: React.FC<DivideHorizontalContainerProps> = ({ leftChild, rightChild }) => {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flex: 1, overflow: 'auto' }}>{leftChild}</div>
      <div style={{ flex: 1, overflow: 'auto' }}>{rightChild}</div>
    </div>
  );
};

export default DivideHorizontalContainer;
