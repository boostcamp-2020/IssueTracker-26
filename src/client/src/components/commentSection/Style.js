import styled from 'styled-components';
import theme from '../Theme';

const InputContainer = styled.div`
  display: flex;
  height: 300px;
  width: 100%;
`;
const ProfileBox = styled.div`
  position: relative;
  width: 15%;

  & > img {
    position: absolute;
    top: 5px;
    right: 20px;
    width: 28px;
    height: 28px;
  }
`;
const InputBox = styled.div`
  width: 85%;
  height: 100%;
  border: 1px solid #e1e4e8;
  border-radius: 8px;

  position: relative;
  &:after,
  &:before {
    position: absolute;
    right: 100%;
    top: 93%;
    border: solid;
    content: '';
  }

  &:after {
    border-color: rgba(255, 255, 255, 0);
    border-right-color: ${theme.Color.grayBackground};
    border-width: 8px;
    margin-top: -264px;
  }
  &:before {
    border: solid 1px red;
    border-color: rgba(245, 2, 2, 0);
    border-right-color: #e1e4e8;
    border-width: 10px;
    margin-top: -266px;
  }
`;
const InputHeader = styled.div`
  height: 18%;
  font-size: 16px;
  background-color: ${theme.Color.grayBackground};
  border-bottom: 1px solid ${theme.Color.border};
  position: relative;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  & > div {
    position: absolute;
    top: 13px;
    left: 10px;
    background-color: white;
    border: 1px solid ${theme.Color.border};
    border-bottom: 1px solid white;
    border-radius: 5px 5px 0 0;
    padding: 10px 10px;
    &:hover {
      cursor: pointer;
    }
  }
`;
const InputBody = styled.div`
  padding: 16px 10px;
`;
const SubmitLayer = styled.div`
  float: right;
`;

const Button = styled.button`
  opacity: ${(props) => !props.canSubmit && 0.5};
  color: ${(props) => props.fontColor};
  background-color: ${(props) => props.bgColor};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 3px;
  outline: none;
  padding: 5px 10px;
  height: 30px;
  &:hover {
    background-color: ${(props) => props.canSubmit && props.hoverColor};
    cursor: ${(props) => props.canSubmit && 'pointer'};
  }
  & + & {
    margin-left: 5px;
  }
`;

export {
  InputContainer,
  ProfileBox,
  InputBox,
  InputHeader,
  InputBody,
  SubmitLayer,
  Button,
};
