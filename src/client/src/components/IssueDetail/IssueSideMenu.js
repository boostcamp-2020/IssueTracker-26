import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import searchImg from '../../../public/images/setting.svg';
import sideImg from '../../../public/images/github.png';
import Assignee from './ListDropBox/Assignee';
import Label from './ListDropBox/Label';
import Milestone from './ListDropBox/Milstone';
import UserImage from '../../../public/images/user.png';
import UserContext from '../Context/UserContext';
import IssueDetailContext from '../Context/IssueDetailContext';
import IssueDetailAction from './action';
import getFontColor from '../labelSection/utils';

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
  flex-direction: column;
  text-align: left;
  margin-right: auto;
  font-size: 12px;
  flex-grow: 1;
  line-height: 29.5px;
  span {
    margin-right: auto;
  }
  width: 100%;
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

const DivBar = styled.div`
  background: #e1e4e8;
  height: 8px;
  border-radius: 10px;
`;

const DivInBar = styled.div`
  background: #28a745;
  height: 8px;
  width: ${(props) => props.width}%;
  border-radius: 10px;
`;

const SpanStyled = styled.span`
  font-weight: bold;
  color: #586069;
  font-size: 14px;
`;

const LabelStyled = styled.span`
  line-height: 100%;
  margin-right: 10px !important;
  font-weight: bold;
  color: ${(props) => props.fontColor};
  background: ${(props) => props.color};
  font-size: 14px;
  padding: 5px 10px;
  display: inline-block;
  border-radius: 20px;
  margin-bottom: 5px;
`;
const DivProfileStyled = styled.div`
  margin: 2px 0;
  display: flex;
  align-items: center;
`;
const ImgProfileStyled = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-right: 5px;
`;

const SpanProfileStyled = styled.span`
  font-weight: bold;
  color: #586069;
  font-size: 14px;
`;

const Span = styled.span`
  &:hover {
    color: #0366d6;
    cursor: pointer;
  }
`;

function IssueSideMenu({ selectMiliestone, selectLabel, selectAssignee }) {
  const { state: user } = useContext(UserContext);
  const { dispatch } = useContext(IssueDetailContext);
  const MENU = ['Assignee', 'Label', 'Milstones'];
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
              right={0}
              top={30}
              width={'285px'}
              height={'20px'}
              subtitle={'Clear assignees'}
            ></Assignee>
          )}
        </DivTitleStyled>
        <DivContentStyled>
          {selectAssignee.length > 0 ? (
            <>
              {selectAssignee.map((assign, index) => {
                return (
                  <DivProfileStyled key={index}>
                    <ImgProfileStyled src={assign.profile || UserImage} />
                    <SpanProfileStyled>{assign.username}</SpanProfileStyled>
                  </DivProfileStyled>
                );
              })}
            </>
          ) : (
            <span>
              No one—
              <Span
                onClick={() => {
                  const obj = {
                    id: user.userId,
                    username: user.userName,
                    profile: user.profile,
                  };
                  dispatch({
                    type: IssueDetailAction.UPDATE_ASSIGNEE_LIST,
                    assignee: obj,
                    dispatch,
                  });
                }}
              >
                assign yourself
              </Span>
            </span>
          )}
        </DivContentStyled>
      </DivSubStyled>
      <DivSubStyled>
        <DivTitleStyled onClick={() => handleDropMenu('Label')}>
          <SpanTitleStyled>Labels</SpanTitleStyled>
          <ImgStyled src={searchImg} />
          {dropMenuList[MENU.indexOf('Label')] && (
            <Label
              title={'Apply labels to this issue'}
              subtitle={'Clear this labels'}
              handleCloseMenu={handleCloseMenu}
              right={0}
              top={30}
              width={'285px'}
              height={'20px'}
            ></Label>
          )}
        </DivTitleStyled>
        <DivContentStyled>
          {selectLabel.length > 0 ? (
            <>
              <SpanStyled>
                {selectLabel.map((label, index) => {
                  return (
                    <LabelStyled
                      key={index}
                      color={label.color}
                      fontColor={getFontColor(label.color)}
                    >
                      {label.title}
                    </LabelStyled>
                  );
                })}
              </SpanStyled>
            </>
          ) : (
            <span>None yet</span>
          )}
        </DivContentStyled>
      </DivSubStyled>
      <DivSubStyled>
        <DivTitleStyled onClick={() => handleDropMenu('Milestone')}>
          <SpanTitleStyled>Milestone</SpanTitleStyled>
          <ImgStyled src={searchImg} />
          {dropMenuList[MENU.indexOf('Milestone')] && (
            <Milestone
              title={'Set milestone'}
              subtitle={'Clear this milestone'}
              handleCloseMenu={handleCloseMenu}
              right={0}
              top={30}
              width={'285px'}
            ></Milestone>
          )}
        </DivTitleStyled>
        <DivContentStyled>
          {selectMiliestone.title ? (
            <>
              <DivBar>
                <DivInBar
                  width={
                    selectMiliestone.ratio
                      ? parseFloat(selectMiliestone.ratio) * 100
                      : 0
                  }
                ></DivInBar>
              </DivBar>
              <SpanStyled>{selectMiliestone.title}</SpanStyled>
            </>
          ) : (
            <span>No milestone</span>
          )}
        </DivContentStyled>
      </DivSubStyled>
      <ImgSideStyled src={sideImg} />
    </DivStyled>
  );
}

IssueSideMenu.propTypes = {
  selectMiliestone: PropTypes.object,
  setSelectMiliestone: PropTypes.func,
  selectLabel: PropTypes.array,
  setSelectLabel: PropTypes.func,
  setSelectAssignee: PropTypes.func,
  selectAssignee: PropTypes.array,
};

export default IssueSideMenu;
