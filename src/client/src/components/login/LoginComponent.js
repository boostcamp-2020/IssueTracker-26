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

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem 0;
`;

const Sign = styled.div`
  color: ${(props) => props.theme.Color.blue};
  cursor: pointer;
  &:hover {
    color: #2656a8;
  }
`;

function Login() {
  const [input, setInput] = useState({
    id: '',
    passwd: '',
    checkPasswd: '',
  });
  const [isLogin, setIsLogin] = useState(true);
  const [correct, setCorrect] = useState(false);

  const width = '400px';
  const buttonProps = {
    width: '100%',
    fontSize: '18px',
    height: '42px',
  };

  const HandleInput = (e) => {
    const { value, name } = e.target;
    if (name === 'checkPasswd') {
      if (input.passwd === value) {
        setCorrect(false);
      } else {
        setCorrect(true);
      }
    }
    setInput({
      ...input,
      [name]: value,
    });
  };
  const HandleIsLogin = (bool) => () => {
    setInput({
      id: '',
      passwd: '',
      checkPasswd: '',
    });
    setIsLogin(bool);
  };

  return (
    <LoginComponent>
      <FormContainer width={width}>
        <Title>{isLogin ? '이슈 트래커' : '이슈 트래커 - 회원가입'}</Title>
        <Form>
          <Label>아이디</Label>
          <Layer>
            <Input name="id" value={input.id} onChange={HandleInput} />
          </Layer>
          <Label>비밀번호</Label>
          <Layer>
            <Input
              name="passwd"
              type="password"
              value={input.passwd}
              onChange={HandleInput}
            />
          </Layer>
          {isLogin ? null : (
            <>
              <Label>비밀번호 확인</Label>
              <Layer>
                <Input
                  outlineColor={correct}
                  name="checkPasswd"
                  type="password"
                  value={input.checkPasswd}
                  onChange={HandleInput}
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
              <ButtonGroup>
                <Button {...buttonProps}>Sign in</Button>
                <Button {...buttonProps}>Sign in with GitHub</Button>
              </ButtonGroup>
            ) : (
              <Button {...buttonProps}>Sign up</Button>
            )}
          </Layer>
        </Form>
      </FormContainer>
    </LoginComponent>
  );
}

export default Login;
