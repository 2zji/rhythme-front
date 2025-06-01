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

  const handleSignup = async () => {
    const errors = {};
    if (!username) errors.username = '아이디를 입력해주세요.';
    if (!password) errors.password = '비밀번호를 입력해주세요.';
    if (password !== passwordCheck) errors.passwordCheck = '비밀번호가 일치하지 않아요.';

    if (Object.keys(errors).length > 0) {
      setErrorMsg(errors);
      return;
    }

    try {
      const response = await axios.post('/api/sign_up', {
        username,
        password,
      });

      console.log('✅ 회원가입 성공:', response.data);
      alert('회원가입 성공!');
      // TODO: 성공 시 이동
    } catch (error) {
      console.error('❌ 회원가입 실패:', error);
      setErrorMsg((prev) => ({ ...prev, general: '이미 존재하는 아이디입니다.' }));
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
          }}
        />
        {errorMsg.passwordCheck && <p className="error-text">{errorMsg.passwordCheck}</p>}

        <button className="main-button" onClick={handleSignup}>회원가입</button>
        <button className="sub-link" onClick={() => window.history.back()}>로그인하러 가기</button>
      </div>
    </div>
  );
};

export default SignupPage;
