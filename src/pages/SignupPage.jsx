import React, { useState } from 'react';
import axios from 'axios';
import '../styles/MainPage.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errorMsg, setErrorMsg] = useState({
    username: '',
    password: '',
    passwordCheck: '',
    general: '',
  });
  const [successMsg, setSuccessMsg] = useState('');  // 성공 메시지 상태

  const handleSignup = async () => {
    const errors = {};
    if (!username) errors.username = '아이디를 입력해주세요.';
    if (!password) errors.password = '비밀번호를 입력해주세요.';
    if (password !== passwordCheck) errors.passwordCheck = '비밀번호가 일치하지 않아요.';

    if (Object.keys(errors).length > 0) {
      setErrorMsg(errors);
      setSuccessMsg('');
      return;
    }

/*수정*/
    try {
     const response = await axios.post(
       '/api/sign_up',
       { username, password },
       {
         headers: {
           'Content-Type': 'application/json'
         }
       }
     );

      console.log('✅ 회원가입 성공:', response.data);
      setSuccessMsg(response.data);  // 서버 메시지 저장
      setErrorMsg({ username: '', password: '', passwordCheck: '', general: '' });

    } catch (error) {
      console.error('❌ 회원가입 실패:', error);
      setErrorMsg((prev) => ({ ...prev, general: '이미 존재하는 아이디입니다.' }));
      setSuccessMsg('');
    }
  };

  return (
    <div className="main-container">
      <div className="main-box">
        <h2>회원가입</h2>

        <input
          type="text"
          placeholder="아이디를 입력해주세요"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorMsg((prev) => ({ ...prev, username: '', general: '' }));
            setSuccessMsg('');
          }}
        />
        {errorMsg.username && <p className="error-text">{errorMsg.username}</p>}
        {errorMsg.general && <p className="error-text">{errorMsg.general}</p>}

        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMsg((prev) => ({ ...prev, password: '' }));
            setSuccessMsg('');
          }}
        />
        {errorMsg.password && <p className="error-text">{errorMsg.password}</p>}

        <input
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          value={passwordCheck}
          onChange={(e) => {
            setPasswordCheck(e.target.value);
            setErrorMsg((prev) => ({ ...prev, passwordCheck: '' }));
            setSuccessMsg('');
          }}
        />
        {errorMsg.passwordCheck && <p className="error-text">{errorMsg.passwordCheck}</p>}

        <button className="main-button" onClick={handleSignup}>회원가입</button>
        <button className="sub-link" onClick={() => window.location.href = '/login'}>로그인 하러 가기</button>

        {successMsg && (
          <p className="success-text" style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
            {successMsg}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
