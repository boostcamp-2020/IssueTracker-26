import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Button from '../Button';
import image from '../../../public/images/user.png';

const TitleDiv = styled.div`
  font-size: 1.7rem;
  font-weight: bold;
  color: white;
`;

const HeaderDiv = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
  background-color: black;
`;

const UserDiv = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  margin-left: 80%;
  justify-content: center;
  span {
    margin-right: 15px;
    font-weight: bold;
    color: white;
    display: block;
  }

  img {
    margin-right: 10px;
    width: 30px;
    border-radius: 50px;
  }
`;

function Header(props) {
  const { userName } = props;

  return (
    <HeaderDiv>
      <TitleDiv>
        <span>🎯ISSUE</span>
      </TitleDiv>

      <UserDiv>
        <img src={image} />
        <span>{userName}</span>
        <Button
          width={'70px'}
          color={'ghostwhite'}
          hoverColor={'#eaeaea'}
          fontColor={'#000000'}
        >
          로그아웃
        </Button>
      </UserDiv>
    </HeaderDiv>
  );
}

Header.propTypes = {
  userName: PropTypes.string,
};

export default Header;
