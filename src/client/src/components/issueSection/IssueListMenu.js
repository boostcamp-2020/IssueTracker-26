import React, { Fragment, useState, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DropBox from '../DropBox';
import drop from '../../../public/images/drop.png';
import Http from '../../util/http-common';
import UserContext from '../Context/UserContext';
import Author from '../listDropBox/Author';
import Label from '../listDropBox/Label';
import Assignee from '../listDropBox/Assignee';
import Milstone from '../listDropBox/Milstone';
import Filter from '../../util/filter';

const ContentDiv = styled.div`
  display: flex;
  border-radius: 10px;
  height: 50px;
  padding-top: 15px;
  padding-right: 15px;
  font-size: 0.9rem;
  background: ${(props) => props.theme.Color.grayBackground};
  text-align: center;
  color: #586069;
  div {
    position: relative;
    width: 150px;

    span {
      &:hover {
        color: black;
        cursor: pointer;
      }
    }
  }

  div:first-child {
    width: 70px;
  }

  div:nth-child(2) {
    width: 100%;
    display: flex;
    flex-direction: column;
    div:first-child {
      width: 100%;
      flex-grow: 1.3;
    }

    div:nth-child(2) {
      flex-grow: 0.7;
    }
  }

  img {
    width: 7px;
    margin-left: -2px;
    filter: invert(38%) sepia(4%) saturate(1346%) hue-rotate(172deg)
      brightness(91%) contrast(84%);
  }
`;

const SelectedStyled = styled.span`
  text-align: left;
  margin-top: -2px;
  color: #586069;
`;

function IssueListMenu({
  handleAllCheck,
  headerCheck,
  issueList,
  checkList,
  setIssueList,
  setChecked,
  setHeaderCheck,
  selectFilter,
  searchVal,
  setSearchVal,
  setListState,
}) {
  const MENU = ['Author', 'Label', 'Milstones', 'Assignee', 'Mark as'];
  const { state } = useContext(UserContext);
  const [dropMenuList, setdropMenuList] = useState(
    MENU.map(() => {
      return false;
    }),
  );

  const handleDropMenu = (menu) => {
    const menuList = [...dropMenuList];
    const selectIndex = MENU.indexOf(menu);
    menuList[selectIndex] = !dropMenuList[selectIndex];
    setdropMenuList(menuList);
  };

  const handleMarkMenu = (e) => {
    const selected = e.target.innerText;
    const promiseList = issueList.map((issue, index) => {
      if (checkList[index]) {
        return fetch(`${Http}api/issue/state/${issue.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            state: selected,
          }),
        });
      }
      return null;
    });
    Promise.all(promiseList).then(() => {
      fetch(`${Http}api/issue/filter/${state.userId}/${selectFilter}`)
        .then((res) => res.json())
        .then((data) => {
          setIssueList(data);
          setChecked(data.map(() => ''));
          setHeaderCheck({ state: '', count: 0 });
        });
    });
    setdropMenuList(MENU.map(() => false));
  };

  const handleCloseMenu = () => {
    setdropMenuList(MENU.map(() => false));
  };

  const handleMenu = (val, type) => {
    console.log(val, type);
    fetch(`${Http}api/issue/all`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        let searchResult;
        switch (type) {
          case 'Author': {
            const searchArr = searchVal.split(' ');
            const result = searchArr.filter((info) => !info.includes('author'));
            searchResult = `${result.join(' ')} author:${val.userName}`;
            setSearchVal(searchResult);
            break;
          }
          case 'Label': {
            const searchArr = searchVal.split(' ');
            const result = searchArr.filter(
              (info) => !info.includes(val.title),
            );
            searchResult = `${result.join(' ')} label:${val.title}`;
            setSearchVal(searchResult);
            break;
          }
          default:
            break;
        }
        setListState(false);
        setTimeout(() => {
          setListState(true);
          setIssueList(Filter(data, searchResult));
        }, 1000);
      });
    setdropMenuList(MENU.map(() => false));
  };

  // const handleLabelMenu = () => {
  //   console.log('라벨클릭!');
  //   setdropMenuList(MENU.map(() => false));
  // };

  // const handleAssigneeMenu = () => {
  //   console.log('어사인 클릭!');
  //   setdropMenuList(MENU.map(() => false));
  // };

  // const handleMilstonsMenu = () => {
  //   console.log('마일스톤 클릭!');
  //   setdropMenuList(MENU.map(() => false));
  // };

  return (
    <ContentDiv>
      <div>
        <input
          type="checkbox"
          onChange={handleAllCheck}
          checked={headerCheck.state}
        />
      </div>
      <div>
        <SelectedStyled>
          {headerCheck.count !== 0 ? `${headerCheck.count} selected` : ''}
        </SelectedStyled>
        <div></div>
        <div></div>
      </div>
      {headerCheck.count === 0 ? (
        <Fragment>
          <div>
            <span onClick={() => handleDropMenu('Author')}>
              Author <img src={drop} />
            </span>
            {dropMenuList[MENU.indexOf('Author')] && (
              <Author
                handleCloseMenu={handleCloseMenu}
                handleAuthorMenu={handleMenu}
                right={0}
              ></Author>
            )}
          </div>
          <div>
            <span onClick={() => handleDropMenu('Label')}>
              Label <img src={drop} />
            </span>
            {dropMenuList[MENU.indexOf('Label')] && (
              <Label
                handleCloseMenu={handleCloseMenu}
                handleLabelMenu={handleMenu}
                right={0}
              ></Label>
            )}
          </div>
          <div>
            <span onClick={() => handleDropMenu('Milstones')}>
              Milstones <img src={drop} />
            </span>
            {dropMenuList[MENU.indexOf('Milstones')] && (
              <Milstone
                handleCloseMenu={handleCloseMenu}
                handleMilstonsMenu={handleMenu}
                right={0}
              ></Milstone>
            )}
          </div>
          <div>
            <span onClick={() => handleDropMenu('Assignee')}>
              Assignee <img src={drop} />
            </span>
            {dropMenuList[MENU.indexOf('Assignee')] && (
              <Assignee
                handleCloseMenu={handleCloseMenu}
                handleAssigneeMenu={handleMenu}
                right={0}
              ></Assignee>
            )}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </Fragment>
      )}
      <div>
        {headerCheck.count === 0 ? (
          <span>Comment</span>
        ) : (
          <span onClick={() => handleDropMenu('Mark as')}>
            Mark as <img src={drop} />
          </span>
        )}
        {dropMenuList[MENU.indexOf('Mark as')] && (
          <DropBox
            title={'Actions'}
            data={['Open', 'Closed']}
            handler={handleMarkMenu}
            handleCloseMenu={handleCloseMenu}
            right={0}
          ></DropBox>
        )}
      </div>
    </ContentDiv>
  );
}

IssueListMenu.propTypes = {
  handleAllCheck: PropTypes.func,
  headerCheck: PropTypes.object,
  issueList: PropTypes.array,
  checkList: PropTypes.array,
  setIssueList: PropTypes.func,
  setChecked: PropTypes.func,
  setHeaderCheck: PropTypes.func,
  selectFilter: PropTypes.string,
  searchVal: PropTypes.string,
  setSearchVal: PropTypes.func,
  setListState: PropTypes.func,
};

export default IssueListMenu;
