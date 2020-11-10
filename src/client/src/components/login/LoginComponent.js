import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Input from '../input/InputComponent';
import Button from '../Button';
import UserContext from '../Context/UserContext';
import userAPI from '../../util/api/user';
import util from '../../util/index';
import FlashMessage from '../FlashMessage';

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

const ButtonWrapper = styled.div`
  width: 30%;
  padding: 0 0 0 1rem;
`;

const Sign = styled.div`
  color: ${(props) => props.theme.Color.blue};
  cursor: pointer;
  &:hover {
    color: #2656a8;
  }
`;

function Login() {
  const history = useHistory();
  const { state, setState } = useContext(UserContext);
  const [input, setInput] = useState({
    id: '',
    password: '',
    checkPassword: '',
  });
  const [isLogin, setIsLogin] = useState(true);
  const [correct, setCorrect] = useState(false);
  const [canSubmit, setSubmit] = useState(false);
  const [isDuplicated, setDuplicated] = useState(false);
  const [messageState, setMessage] = useState({ key: undefined, message: '' });

  const validInput = (duplicated) => {
    if (duplicated) {
      setDuplicated(true);
      setSubmit(
        util.validInput(input.id) &&
          util.validInput(input.password) &&
          input.password === input.checkPassword,
        true,
      );
      return;
    }
    setSubmit(
      util.validInput(input.id) &&
        util.validInput(input.password) &&
        input.password === input.checkPassword &&
        isDuplicated,
    );
  };

  const width = '400px';
  const buttonProps = {
    width: '100%',
    fontSize: '18px',
    height: '42px',
  };

  const handleValidInput = (e) => {
    const { value, name } = e.target;
    validInput();
    if (value === '') return;
    if (!util.validInput(e.target.value)) {
      if (name === 'id')
        setMessage({
          key: 3,
          message: '아이디는 최소 6~12자리 숫자를 입력해주세요.',
        });
      if (name === 'password')
        setMessage({
          key: 4,
          message: '패스워드는 최소 6~12자리 숫자를 입력해주세요.',
        });
      return;
    }
    if (name === 'checkPassword' && value !== input.password) {
      setCorrect(false);
      setMessage({ key: 5, message: '비밀번호, 비밀번호 확인이 다릅니다.' });
    }
  };

  const handleInput = (e) => {
    const { value, name } = e.target;
    if (name === 'checkPassword') {
      if (input.password === value) setCorrect(true);
      else setCorrect(false);
    }
    if (name === 'id') {
      setDuplicated(false);
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
    setCorrect(false);
    setSubmit(false);
    setDuplicated(false);
    setIsLogin(bool);
  };
  const handleCheckDuplicated = () => {
    userAPI.checkDuplicated(input.id).then(({ err, msg }) => {
      if (err) {
        setInput({ ...input, id: '' });
        setMessage({ key: 6, message: err });
        return;
      }
      if (msg) {
        setInput({ ...input, id: '' });
        setMessage({ key: 7, message: msg });
        return;
      }
      validInput(true);
      setMessage({ key: 8, message: '사용 가능한 아이디입니다.' });
    });
  };
  const handleSignin = (e) => {
    e.preventDefault();
    const { id, password } = input;
    userAPI.signIn(id, password).then(({ token, userId, userName }) => {
      if (token) {
        setState({ ...state, userId, token, userName, isLoggedIn: true });
        localStorage.setItem('jwt', token);
        history.replace('/');
        return;
      }
      setMessage({ key: 1, message: '로그인 실패. 다시 시도해주세요.' });
      setInput({ id: '', password: '', checkPassword: '' });
    });
  };
  const handleSignup = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    const { id, password } = input;
    userAPI.signUp(id, password).then(({ token, userId, userName }) => {
      if (token) {
        setState({ ...state, userId, userName, token, isLoggedIn: true });
        localStorage.setItem('jwt', token);
        history.replace('/');
        return;
      }
      setMessage({ key: 2, message: '회원가입 실패. 다시 시도해주세요.' });
    });
  };

  const handleOpenGitHub = () => {
    window.open(
      'https://github.com/login/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fgithub&client_id=2430ccbbfb13e515ed98',
      '_self',
    );
  };

  return (
    <LoginComponent>
      {messageState.message ? (
        <FlashMessage
          key={messageState.key}
          handleMessage={setMessage}
          messageState={messageState}
        />
      ) : null}
      <FormContainer width={width}>
        <Title>{isLogin ? '이슈 트래커' : '이슈 트래커 - 회원가입'}</Title>
        <Form onSubmit={isLogin ? handleSignin : handleSignup}>
          <Label>아이디</Label>
          <Layer>
            <Input
              name="id"
              value={input.id}
              onChange={handleInput}
              onBlur={isLogin ? null : handleValidInput}
            />
            {isLogin ? null : (
              <ButtonWrapper>
                <Button
                  active={util.validInput(input.id) ? undefined : 'disable'}
                  handler={
                    util.validInput(input.id) ? handleCheckDuplicated : null
                  }
                  width={'100%'}
                  height={'42px'}
                  fontSize={'13px'}
                >
                  {isDuplicated ? '완료' : '중복 확인'}
                </Button>
              </ButtonWrapper>
            )}
          </Layer>
          <Label>비밀번호</Label>
          <Layer>
            <Input
              name="password"
              type="password"
              value={input.password}
              onChange={handleInput}
              onBlur={isLogin ? null : handleValidInput}
            />
          </Layer>
          {isLogin ? null : (
            <>
              <Label>비밀번호 확인</Label>
              <Layer>
                <Input
                  outlineColor={correct ? 'default' : 'warning'}
                  name="checkPassword"
                  type="password"
                  value={input.checkPassword}
                  onChange={handleInput}
                  onBlur={handleValidInput}
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
                <Button
                  type="button"
                  {...buttonProps}
                  handler={handleOpenGitHub}
                >
                  Sign in with GitHub
                </Button>
              </ButtonGroup>
            ) : (
              <Button
                {...buttonProps}
                active={canSubmit ? undefined : 'disable'}
              >
                Sign up
              </Button>
            )}
          </Layer>
        </Form>
      </FormContainer>
    </LoginComponent>
  );
}

export default Login;
