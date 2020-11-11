import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import IssueForm from '../components/issueForm/IssueForm';
import IssueSubMenu from '../components/issueForm/IssueSubMenu';
import UserContext from '../components/Context/UserContext';
import ProfileImg from '../../public/images/user.png';
import Http from '../util/http-common';

const DivStyled = styled.div`
  margin: auto;
  display: flex;
  max-width: 1248px;
  width: 100%;
  height: 660px;
  padding-top: 170px;
`;

const DivProfilStyled = styled.div`
  display: flex;
  flex-basis: 80px;
`;

const ImgProfilStyled = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 40px;
  margin-left: 14px;
`;

function IssueCreatePage() {
  const { state } = useContext(UserContext);
  const [selectMiliestone, setSelectMiliestone] = useState({});
  const [selectLabel, setSelectLabel] = useState([]);
  const [selectAssignee, setSelectAssignee] = useState([]);
  const [textAreaVal, setTextAreaVal] = useState('');
  const [inputVal, setInputVal] = useState('');
  const history = useHistory();
  const handlerForm = () => {
    const issueInfo = {
      userId: state.userId,
      title: inputVal,
      content: textAreaVal,
      milestoneId: selectMiliestone.id,
      labels: selectLabel,
      assignees: selectAssignee,
    };
    fetch(`${Http}api/issue/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(issueInfo),
    }).then(() => {
      history.replace('/');
    });
  };

  return (
    <DivStyled>
      <DivProfilStyled>
        {state.profile ? (
          <ImgProfilStyled src={state.profile} />
        ) : (
          <ImgProfilStyled src={ProfileImg} />
        )}
      </DivProfilStyled>
      <IssueForm
        handlerForm={handlerForm}
        textAreaVal={textAreaVal}
        setTextAreaVal={setTextAreaVal}
        inputVal={inputVal}
        setInputVal={setInputVal}
      />
      <IssueSubMenu
        setSelectMiliestone={setSelectMiliestone}
        selectMiliestone={selectMiliestone}
        selectLabel={selectLabel}
        setSelectLabel={setSelectLabel}
        selectAssignee={selectAssignee}
        setSelectAssignee={setSelectAssignee}
      />
    </DivStyled>
  );
}

export default IssueCreatePage;
