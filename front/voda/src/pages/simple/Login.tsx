import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [useremail, setUseremail] = useState('');
  const [userpass, setUserpass] = useState('');
  // const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/user/login', {
        useremail,
        userpass,
      });

      if (response.status === 200) {
        // const { useremail, token } = response.data;
        // dispatch(loginSuccess(useremail, token));
        console.log('요청 가는중 테스트용');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error occured during login:', error);
    }
  };
  return (
    <div>
      이메일
      <input
        type='text'
        value={useremail}
        onChange={(e) => setUseremail(e.target.value)}
        placeholder='abcde@email.com'
      />{' '}
      <br />
      비밀번호
      <input
        type='password'
        value={userpass}
        onChange={(e) => setUserpass(e.target.value)}
        placeholder='********'
      />{' '}
      <br />
      <button onClick={handleLogin}>로그인</button>
      <Link to='/signup'>회원가입</Link>
    </div>
  );
};

export default Login;

//       const { useremail: userEmail, token } = response.data;
//       dispatch(loginSuccess(userEmail, token));
//     } catch (error) {
//       console.error('Error occurred during login:', error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type='text'
//         value={useremail}
//         onChange={(e) => setUseremail(e.target.value)}
//         placeholder='Email'
//       />
//       <input
//         type='password'
//         value={userpass}
//         onChange={(e) => setUserpass(e.target.value)}
//         placeholder='Password'
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;
