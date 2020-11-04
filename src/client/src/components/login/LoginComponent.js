/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../input/InputComponent';

const Title = styled.h1`
  text-align: center;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const FormBox = styled.div`
  margin: 0 auto; // wow
  border: 1px solid ${(props) => props.theme.Color.border};
  border-radius: 3px;
  width: ${(props) => props.width};
  padding: 10px;
`;

const Layer = styled.div`
  display: flex;
  margin-bottom: 17px;
  justify-content: space-around;
`;

const Sign = styled.div`
  color: ${(props) => props.theme.Color.blue};
`;

const Button = styled.button`
  width: 100%;
  font-size: 12px;
  padding: 10px;
  color: white;
  background-color: ${(props) => props.theme.Color.lightGreen};
  border: 1px solid ${(props) => props.theme.Color.border};
  border-radius: 3px;
  outline: none;

  &:hover {
    background-color: green;
  }
`;

function Login() {
  const [id, setId] = useState('');
  const [passwd, setPasswd] = useState('');
  const width = '200px';

  const HandleChangeId = (event) => {
    setId(event.target.value);
  };

  const HandleChangePasswd = (event) => {
    setPasswd(event.target.value);
  };

  return (
    <div>
      <Title>이슈 트래커</Title>
      <FormBox width={width}>
        <p>아이디</p>
        <Layer>
          <Input width={width} onChange={HandleChangeId} />
        </Layer>
        <p>비밀번호</p>
        <Layer>
          <Input width={width} type="password" onChange={HandleChangePasswd} />
        </Layer>
        <Layer>
          <Sign>로그인</Sign>
          <Sign>회원가입</Sign>
        </Layer>
        <Layer>
          <Button>Sign in with GitHub</Button>
        </Layer>
      </FormBox>
    </div>
  );
}

export default Login;
