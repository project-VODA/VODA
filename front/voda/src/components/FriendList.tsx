import React from 'react';
import DivideHorizontalContainer from './DivideHorizontalContainer';

const FriendList: React.FC = () => {
  const friendList = ['Friend 1', 'Friend 2', 'Friend 3', /* ... */];

  return (
    <div>
      {friendList.map((friend, index) => (
        <div key={index}>{friend}</div>
      ))}
    </div>
  );
};

export default FriendList;
