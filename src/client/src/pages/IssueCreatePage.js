import React, { useContext } from 'react';
import styled from 'styled-components';
import IssueForm from '../components/issueForm/IssueForm';
import IssueSubMenu from '../components/issueForm/IssueSubMenu';
import UserContext from '../components/Context/UserContext';
import ProfileImg from '../../public/images/user.png';

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

  return (
    <DivStyled>
      <DivProfilStyled>
        {state.profile === undefined ? (
          <ImgProfilStyled src={ProfileImg} />
        ) : (
          <ImgProfilStyled src={state.profile} />
        )}
      </DivProfilStyled>
      <IssueForm />
      <IssueSubMenu />
    </DivStyled>
  );
}

export default IssueCreatePage;
