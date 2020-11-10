import styled from 'styled-components';
import theme from '../Theme';

const Container = styled.div`
  padding-top: 100px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonBox = styled.div`
  margin: 1em;
  padding: 1em;
`;

const ContentsContainer = styled.div`
  margin: 0 2em;
  border: 1px solid ${theme.Color.border};
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
  }
`;

const EditDeleteBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${(props) => props.width};
`;

const WorkContainer = styled.div`
  padding: 1em;
  margin: ${(props) => (props.isEdit ? null : '-1em 2em 1em 2em')};
  background-color: ${theme.Color.grayBackground};
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
  ButtonBox,
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
