import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import IssueListMenu from './IssueListMenu';
import IssueListContent from './IssueContent';

const ContainerDiv = styled.div`
  width: 100%;
  border: ${(props) => props.theme.Color.border} 1px solid;
  border-radius: 10px;
`;

function IssueList(props) {
  const {
    issueList,
    checkList,
    setChecked,
    setIssueList,
    headerCheck,
    setHeaderCheck,
    selectFilter,
  } = props;

  const handleAllCheck = () => {
    if (headerCheck.state === '') {
      setChecked(checkList.map(() => 'checked'));
      setHeaderCheck({ state: 'checked', count: issueList.length });
    } else {
      setChecked(checkList.map(() => ''));
      setHeaderCheck({ state: '', count: 0 });
    }
  };

  const handleSingleCheck = (index) => {
    setChecked(
      checkList.map((check, i) => {
        if (index === i) {
          if (check === 'checked') {
            setHeaderCheck({ state: '', count: headerCheck.count - 1 });
          } else {
            let headerState = '';
            if (headerCheck.count + 1 === checkList.length)
              headerState = 'checked';
            setHeaderCheck({
              state: headerState,
              count: headerCheck.count + 1,
            });
          }
          return check === '' ? 'checked' : '';
        }
        return check;
      }),
    );
  };

  return (
    <ContainerDiv>
      <IssueListMenu
        handleAllCheck={handleAllCheck}
        headerCheck={headerCheck}
        issueList={issueList}
        checkList={checkList}
        setIssueList={setIssueList}
        setChecked={setChecked}
        setHeaderCheck={setHeaderCheck}
        selectFilter={selectFilter}
      />
      <IssueListContent
        issueList={issueList}
        checkList={checkList}
        handleSingleCheck={handleSingleCheck}
      />
    </ContainerDiv>
  );
}

IssueList.propTypes = {
  issueList: PropTypes.array,
  checkList: PropTypes.array,
  setChecked: PropTypes.func,
  setIssueList: PropTypes.func,
  headerCheck: PropTypes.object,
  setHeaderCheck: PropTypes.func,
  selectFilter: PropTypes.string,
};

export default IssueList;
