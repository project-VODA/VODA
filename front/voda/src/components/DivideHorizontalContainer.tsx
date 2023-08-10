import React, { useEffect } from 'react';
import { useState } from 'react';

interface DivideHorizontalContainerProps {
  leftChild: React.ReactNode;
  rightChild: React.ReactNode;
}

const DivideHorizontalContainer: React.FC<DivideHorizontalContainerProps> = ({ leftChild, rightChild }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener( "resize", handleResize );
  }, []);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flex: 1, overflowX: isMobile ? "auto" : "hidden", overflowY: 'auto' }}>{leftChild}</div>
      <div style={{ flex: 1, overflowX: isMobile ? "auto" : "hidden", overflowY: 'auto' }}>{rightChild}</div>
    </div>
  );
};

export default DivideHorizontalContainer;
