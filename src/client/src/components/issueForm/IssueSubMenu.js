import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import searchImg from '../../../public/images/setting.svg';
import sideImg from '../../../public/images/github.png';
import Assignee from '../listDropBox/Assignee';
import Label from '../listDropBox/Label';
import UserContext from '../Context/UserContext';
import Milestone from '../listDropBox/Milstone';

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
  padding: 0;
  position: relative;
  display: flex;
  color: #586069;
  font-size: 12px;
  flex-grow: 1;
  height: 29.5px;
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
  margin-top: 6px;
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
  const MENU = ['Assignee', 'Label', 'Milstones'];
  const { state } = useContext(UserContext);
  const [dropMenuList, setdropMenuList] = useState(
    MENU.map(() => {
      return false;
    }),
  );

  const handleCloseMenu = () => {
    setdropMenuList(MENU.map(() => false));
  };

  const handleDropMenu = (menu) => {
    const menuList = [...dropMenuList];
    const selectIndex = MENU.indexOf(menu);
    menuList[selectIndex] = !dropMenuList[selectIndex];
    setdropMenuList(menuList);
  };

  const handleAssigneeMenu = () => {
    console.log('dd');
  };

  const handleLabelMenu = () => {
    console.log('dd');
  };

  const handleMilstonsMenu = () => {
    console.log('dd');
  };

  return (
    <DivStyled>
      <DivSubStyled>
        <DivTitleStyled onClick={() => handleDropMenu('Assignee')}>
          <SpanTitleStyled>Assignees</SpanTitleStyled>
          <ImgStyled src={searchImg} />
          {dropMenuList[MENU.indexOf('Assignee')] && (
            <Assignee
              title={'Assign up to 10 people to this issue'}
              handleCloseMenu={handleCloseMenu}
              handleAssigneeMenu={handleAssigneeMenu}
              right={0}
              top={30}
              width={'285px'}
              height={'20px'}
            ></Assignee>
          )}
        </DivTitleStyled>
        <DivContentStyled>
          <span>No one—assign yourself</span>
        </DivContentStyled>
      </DivSubStyled>
      <DivSubStyled>
        <DivTitleStyled onClick={() => handleDropMenu('Label')}>
          <SpanTitleStyled>Labels</SpanTitleStyled>
          <ImgStyled src={searchImg} />
          {dropMenuList[MENU.indexOf('Label')] && (
            <Label
              title={'Apply labels to this issue'}
              handleCloseMenu={handleCloseMenu}
              handleLabelMenu={handleLabelMenu}
              right={0}
              top={30}
              width={'285px'}
              height={'20px'}
            ></Label>
          )}
        </DivTitleStyled>
        <DivContentStyled>
          <span>None yet</span>
        </DivContentStyled>
      </DivSubStyled>
      <DivSubStyled>
        <DivTitleStyled onClick={() => handleDropMenu('Milestone')}>
          <SpanTitleStyled>Milestone</SpanTitleStyled>
          <ImgStyled src={searchImg} />
          {dropMenuList[MENU.indexOf('Milestone')] && (
            <Milestone
              title={'Set milestone'}
              handleCloseMenu={handleCloseMenu}
              handleMilstonsMenu={handleMilstonsMenu}
              right={0}
              top={30}
              width={'285px'}
              height={'20px'}
            ></Milestone>
          )}
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
