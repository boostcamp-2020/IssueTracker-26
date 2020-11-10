import styled from 'styled-components';
import theme from '../Theme';

const Container = styled.div`
  max-width: 100%;
  width: 1200px;
  margin: 0 40px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 100px;
  margin-bottom: -10px;
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
  font-size: 0.7rem;
  border-radius: 10px;
  background: ${(props) => props.color};
  display: inline-block;
  padding: 4px 8px;
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

const EditDeleteBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${(props) => props.width};
`;

const WorkContainer = styled.div`
  width: 100%;
  padding: 1em;
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

const EditButton = styled.button`
  padding: 4px 8px;
  outline: none;
  border: red;
  background-color: white;
  margin-right: 5px;
  border-radius: 2px;
  width: ${(props) => props.width};
  height: 30px;
  &:hover {
    background-color: skyblue;
  }
`;

const Div = styled.div`
  width: ${(props) => props.width};
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
  EditButton,
};
