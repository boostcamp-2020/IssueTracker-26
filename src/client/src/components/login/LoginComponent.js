import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../input/InputComponent';
import Button from '../Button';

const LoginComponent = styled.div`
  max-width: 960px;
  margin: 12rem auto;
`;

const FormContainer = styled.div`
  width: ${(props) => props.width};
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  margin: 0 auto;
  border: 1px solid ${(props) => props.theme.Color.border};
  background-color: ${(props) => props.theme.Color.lightGrayBackground};
  border-radius: 3px;
  width: 100%;
  padding: 2rem 2rem;
`;

const Label = styled.label`
  margin: 0.5rem 0;
  font-weight: 600;
`;

const Layer = styled.div`
  display: flex;
  margin-bottom: 17px;
  padding: 0.5rem 0;
  justify-content: space-around;
`;

const Sign = styled.div`
  color: ${(props) => props.theme.Color.blue};
  cursor: pointer;
  &:hover {
    color: #2656a8;
  }
`;

function Login() {
  const [id, setId] = useState('');
  const [passwd, setPasswd] = useState('');
  const [checkPasswd, setCheckPasswd] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const width = '400px';
  const buttonProps = {
    width: '100%',
    fontSize: '18px',
    height: '42px',
  };

  const HandleId = (event) => setId(event.target.value);
  const HandlePasswd = (event) => setPasswd(event.target.value);
  const HandleCheckPasswd = (event) => setCheckPasswd(event.target.value);
  const HandleIsLogin = (bool) => () => {
    setId('');
    setPasswd('');
    setCheckPasswd('');
    setIsLogin(bool);
  };

  return (
    <LoginComponent>
      <FormContainer width={width}>
        <Title>{isLogin ? '이슈 트래커' : '이슈 트래커 - 회원가입'}</Title>
        <Form>
          <Label>아이디</Label>
          <Layer>
            <Input value={id} onChange={HandleId} />
          </Layer>
          <Label>비밀번호</Label>
          <Layer>
            <Input type="password" value={passwd} onChange={HandlePasswd} />
          </Layer>
          {isLogin ? null : (
            <>
              <Label>비밀번호 확인</Label>
              <Layer>
                <Input
                  type="password"
                  value={checkPasswd}
                  onChange={HandleCheckPasswd}
                />
              </Layer>
            </>
          )}
          <Layer>
            <Sign onClick={HandleIsLogin(true)}>로그인</Sign>
            <Sign onClick={HandleIsLogin(false)}>회원가입</Sign>
          </Layer>
          <Layer>
            {isLogin ? (
              <Button {...buttonProps}>Sign in with GitHub</Button>
            ) : (
              <Button {...buttonProps}>Sign Up</Button>
            )}
          </Layer>
        </Form>
      </FormContainer>
    </LoginComponent>
  );
}

export default Login;
