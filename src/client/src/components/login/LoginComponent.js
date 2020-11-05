import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../input/InputComponent';
import Button from '../Button';
import UserContext from '../Context/UserContext';

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

function Login({ history }) {
  const { state, setState } = useContext(UserContext);
  const [input, setInput] = useState({
    id: '',
    password: '',
    checkPassword: '',
  });
  const [isLogin, setIsLogin] = useState(true);
  const [correct, setCorrect] = useState(false);

  const width = '400px';
  const buttonProps = {
    width: '100%',
    fontSize: '18px',
    height: '42px',
  };

  const handleInput = (e) => {
    const { value, name } = e.target;
    if (name === 'checkPassword') {
      if (input.password === value) {
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
  const handleIsLogin = (bool) => () => {
    setInput({
      id: '',
      password: '',
      checkPassword: '',
    });
    setIsLogin(bool);
  };
  const handleSignin = (e) => {
    e.preventDefault();
    const { id, password } = input;
    fetch('http://127.0.0.1:3000/api/user/signIn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: id,
        password,
      }),
    })
      .then((res) => res.json())
      .then(({ token }) => {
        if (token) {
          setState({ ...state, isLoggedIn: true });
          localStorage.setItem('jwt', token);
          history.replace('/');
          return;
        }
        alert('로그인 실패');
        setInput({ id: '', password: '', checkPassword: '' });
      });
  };
  const handleSignup = (e) => {
    e.preventDefault();
    const { id, password, checkPassword } = input;
    if (password !== checkPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    fetch('http://127.0.0.1:3000/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: id,
        password,
      }),
    })
      .then((res) => res.json())
      .then(({ token }) => {
        if (token) {
          setState({ ...state, isLoggedIn: true });
          localStorage.setItem('jwt', token);
          history.replace('/');
          return;
        }
        alert('회원가입 실패');
      });
  };

  return (
    <LoginComponent>
      <FormContainer width={width}>
        <Title>{isLogin ? '이슈 트래커' : '이슈 트래커 - 회원가입'}</Title>
        <Form onSubmit={isLogin ? handleSignin : handleSignup}>
          <Label>아이디</Label>
          <Layer>
            <Input name="id" value={input.id} onChange={handleInput} />
          </Layer>
          <Label>비밀번호</Label>
          <Layer>
            <Input
              name="password"
              type="password"
              value={input.password}
              onChange={handleInput}
            />
          </Layer>
          {isLogin ? null : (
            <>
              <Label>비밀번호 확인</Label>
              <Layer>
                <Input
                  outlineColor={correct}
                  name="checkPassword"
                  type="password"
                  value={input.checkPassword}
                  onChange={handleInput}
                />
              </Layer>
            </>
          )}
          <Layer>
            <Sign onClick={handleIsLogin(true)}>로그인</Sign>
            <Sign onClick={handleIsLogin(false)}>회원가입</Sign>
          </Layer>
          <Layer>
            {isLogin ? (
              <ButtonGroup>
                <Button {...buttonProps}>Sign in</Button>
                <Button type="button" {...buttonProps}>
                  Sign in with GitHub
                </Button>
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

Login.propTypes = {
  history: PropTypes.object,
};

export default Login;
