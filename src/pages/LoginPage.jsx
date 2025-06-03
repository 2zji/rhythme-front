import React, { useState } from 'react';
import axios from 'axios';
import '../styles/MainPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMsg('아이디와 비밀번호를 모두 입력해주세요.');
      setSuccessMsg('');
      return;
    }

    try {
      await axios.post('/api/login', {
        username,
        password,
      }, { withCredentials: true });

      localStorage.setItem('username', username); // username만 저장
      setSuccessMsg('로그인 성공!');
      window.location.href = '/Index';
    } catch (error) {
      console.error('로그인 실패:', error);
      setErrorMsg('아이디 또는 비밀번호가 올바르지 않습니다.');
      setSuccessMsg('');
    }
  };

  return (
    <div className="main-container">
      <div className="main-box">
        <h2>로그인</h2>

        <input
          type="text"
          placeholder="아이디를 입력해주세요"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorMsg('');
            setSuccessMsg('');
          }}
        />

        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMsg('');
            setSuccessMsg('');
          }}
        />

        {errorMsg && <p className="error-text">{errorMsg}</p>}
        {successMsg && <p className="success-text">{successMsg}</p>}

        <button className="main-button" onClick={handleLogin}>로그인</button>
        <button className="sub-link" onClick={() => window.location.href = '/sign_up'}>회원가입 하러 가기</button>
      </div>
    </div>
  );
};

export default LoginPage;
