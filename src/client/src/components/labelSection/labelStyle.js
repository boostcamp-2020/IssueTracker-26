import styled from 'styled-components';
import theme from '../Theme';

const Container = styled.div`
  max-width: 100%;
  width: 1200px;
  margin: 0 40px;
  margin-bottom: 40px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 100px;
  margin-bottom: -10px;
  div {
    padding: 2em 0em;
  }
  div:first-child {
    width: 100%;
  }
`;

const ContentsContainer = styled.div`
  border: 1px solid ${theme.Color.border};
  overflow: hidden;
  width: 100%;
  border-radius: 10px;
`;

const ContentsListHeader = styled.div`
  background-color: ${theme.Color.grayBackground};
  padding: 1em;
  padding-left: 1.5em;
  font-size: 14px;
  font-weight: 700;
`;

const ContentsList = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  border-top: 1px solid ${theme.Color.border};
`;

const LabelSpan = styled.span`
  font-weight: bold;
  color: ${(props) => props.fontColor};
  font-size: 0.7rem;
  border-radius: 10px;
  background: ${(props) => props.color};
  display: inline-block;
  padding: 6px 8px;
  text-align: center;
`;

const LabelBox = styled.div`
  width: ${(props) => props.width};
`;

const Description = styled.span`
  color: gray;
  font-size: 14px;
  width: 300px;
`;

const TextContents = styled.span`
  color: gray;
  font-size: 14px;
  &:hover {
    color: black;
    cursor: pointer;
  }
`;

const DescriptText = styled.div`
  font-weight: 600;
  margin: 3px 0;
`;

const EditDeleteBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${(props) => props.width};
`;

const WorkContainer = styled.div`
  width: 100%;
  padding: 1em 1em 1.5em 1em;
  margin-bottom: ${(props) => !props.isEdit && '15px'};
  border: ${(props) => !props.isEdit && `1px solid ${theme.Color.border}`};
  border-radius: ${(props) => !props.isEdit && `5px`};
  border-top: ${(props) => props.isEdit && `1px solid ${theme.Color.border}`};
  background-color: ${(props) =>
    props.isEdit ? 'white' : theme.Color.grayBackground};
`;

const Layer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EmptyDiv = styled.div`
  visibility: hidden;
`;

const CancelButton = styled.button`
  width: 80px;
  height: 30px;
  padding: 4px 8px;
  margin-right: 5px;
  outline: none;
  border: 1px solid ${theme.Color.border};
  border-radius: 5px;
  background-color: white;
  &:hover {
    cursor: pointer;
    background-color: #eeeff1;
  }
`;

const Div = styled.div`
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
`;

const ChangeButton = styled.button`
  width: 28px;
  height: 28px;
  margin-right: 5px;
  outline: none;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.color};
`;

export {
  Div,
  Header,
  Layer,
  Container,
  LabelBox,
  LabelSpan,
  ContentsContainer,
  ContentsListHeader,
  ContentsList,
  Description,
  TextContents,
  EditDeleteBox,
  WorkContainer,
  EmptyDiv,
  CancelButton,
  ChangeButton,
  DescriptText,
};
