import React from 'react';

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

// 추후 통화목록으로 개조 필요
// import React, { useEffect, useState } from 'react';
// import DivideHorizontalContainer from './DivideHorizontalContainer';
// import { getFriendList } from '../apis/friend';

// type Friend = {
//   userEmail: string;
//   userName: string;
//   isFriend: boolean;
// };

// type FriendList = Friend[];

// const FriendList = () => {
  
//   const [friendList, setFriendList] = useState<FriendList>([]);

//   useEffect(() => {
//     getFriendList(sessionStorage.getItem("userEmail"))
//       .then((res: FriendList) => {
//         setFriendList(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   })

//   return (
//     <>
//       <table className = 'friendTable'>
//         <colgroup>
//           <col width = "50%" />
//           <col width = "50%" />
//         </colgroup>
//         <thead>
//           <tr>
//             <th>이름</th>
//             <th>이메일</th>
//           </tr>
//         </thead>
//         <tbody>
//           {friendList.map((friend: Friend) => (
//             <tr>
//               <td>{friend.userName}</td>
//               <td>{friend.userEmail}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default FriendList;

