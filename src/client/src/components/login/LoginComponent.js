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

const Form = styled.div`
  margin: 0 auto;
  border: 1px solid ${(props) => props.theme.Color.border};
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
`;

function Login() {
  const [id, setId] = useState('');
  const [passwd, setPasswd] = useState('');
  const width = '400px';

  const HandleChangeId = (event) => {
    setId(event.target.value);
  };

  const HandleChangePasswd = (event) => {
    setPasswd(event.target.value);
  };

  return (
    <LoginComponent>
      <FormContainer width={width}>
        <Title>이슈 트래커</Title>
        <Form>
          <Label>아이디</Label>
          <Layer>
            <Input value={id} onChange={HandleChangeId} />
          </Layer>
          <Label>비밀번호</Label>
          <Layer>
            <Input
              type="password"
              value={passwd}
              onChange={HandleChangePasswd}
            />
          </Layer>
          <Layer>
            <Sign>로그인</Sign>
            <Sign>회원가입</Sign>
          </Layer>
          <Layer>
            <Button width={'100%'} fontSize={'18px'} height={'42px'}>
              Sign in with GitHub
            </Button>
          </Layer>
        </Form>
      </FormContainer>
    </LoginComponent>
  );
}

export default Login;
