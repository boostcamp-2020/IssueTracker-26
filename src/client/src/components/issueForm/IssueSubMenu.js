import React from 'react';
import styled from 'styled-components';
import searchImg from '../../../public/images/setting.svg';
import sideImg from '../../../public/images/github.png';

const DivStyled = styled.div`
  flex-basis: 312px;
  display: flex;
  flex-direction: column;
`;

const DivSubStyled = styled.div`
  border-bottom: #e1e4e8 1px solid;
  display: flex;
  flex-direction: column;
  flex-basis: 90px;
  padding: 20px 15px 20px 15px;
  text-align: center;
`;

const DivTitleStyled = styled.div`
  display: flex;
  color: #586069;
  font-size: 12px;
  flex-grow: 1;
  line-height: 29.5px;
  &:hover {
    color: #0366d6;
    cursor: pointer;
    img {
      filter: invert(27%) sepia(97%) saturate(1378%) hue-rotate(194deg)
        brightness(97%) contrast(107%);
    }
  }
`;

const DivContentStyled = styled.div`
  display: flex;
  font-size: 12px;
  flex-grow: 1;
  line-height: 29.5px;
`;

const SpanTitleStyled = styled.span`
  font-weight: bold;
  vertical-align: middle;
  margin-right: auto;
`;

const ImgStyled = styled.img`
  filter: invert(34%) sepia(6%) saturate(925%) hue-rotate(171deg)
    brightness(103%) contrast(86%);
`;

const ImgSideStyled = styled.img`
  width: 200px;
  margin: 0 auto;
`;

function IssueSubMenu() {
  return (
    <DivStyled>
      <DivSubStyled>
        <DivTitleStyled>
          <SpanTitleStyled>Assignees</SpanTitleStyled>
          <ImgStyled src={searchImg} />
        </DivTitleStyled>
        <DivContentStyled>
          <span>No one—assign yourself</span>
        </DivContentStyled>
      </DivSubStyled>
      <DivSubStyled>
        <DivTitleStyled>
          <SpanTitleStyled>Labels</SpanTitleStyled>
          <ImgStyled src={searchImg} />
        </DivTitleStyled>
        <DivContentStyled>
          <span>None yet</span>
        </DivContentStyled>
      </DivSubStyled>
      <DivSubStyled>
        <DivTitleStyled>
          <SpanTitleStyled>Milestone</SpanTitleStyled>
          <ImgStyled src={searchImg} />
        </DivTitleStyled>
        <DivContentStyled>
          <span>No milestone</span>
        </DivContentStyled>
      </DivSubStyled>
      <ImgSideStyled src={sideImg} />
    </DivStyled>
  );
}

export default IssueSubMenu;
