import React from 'react';
import DivideHorizontalContainer from './DivideHorizontalContainer';

const RecentCalls: React.FC = () => {
  const recentCalls = ['Call 1', 'Call 2', 'Call 3', /* ... */];

  return (
    <div>
      {recentCalls.map((call, index) => (
        <div key={index}>{call}</div>
      ))}
    </div>
  );
};

export default RecentCalls;
