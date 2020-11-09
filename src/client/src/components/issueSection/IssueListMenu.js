import React, { Fragment, useState, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DropBox from '../DropBox';
import drop from '../../../public/images/drop.png';
import Http from '../../util/http-common';
import UserContext from '../Context/UserContext';
import Author from '../listDropBox/Author';

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
}) {
  const MENU = ['Author', 'Lavel', 'Milstones', 'Assignee', 'Mark as'];
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

  const handleAuthorMenu = (e) => {
    console.log(e.target.childNodes[2].dataset.id)
    setdropMenuList(MENU.map(() => false));
  };

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
                handleAuthorMenu={handleAuthorMenu}
                right={0}
              ></Author>
            )}
          </div>
          <div>
            <span>
              Lavel <img src={drop} />
            </span>
          </div>
          <div>
            <span>
              Milstones <img src={drop} />
            </span>
          </div>
          <div>
            <span>
              Assignee <img src={drop} />
            </span>
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
};

export default IssueListMenu;
