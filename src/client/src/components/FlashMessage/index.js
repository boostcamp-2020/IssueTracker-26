import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import flashKeyframes from './keyframes';
import Content from './Content';
import ProgressBar from './ProgressBar';

const Container = styled.div`
  flex-direction: column;
  position: absolute;
  top: 50px;
  left: ${(props) => `${props.left}px`};
  width: 400px;
  height: 100px;
  animation: ${flashKeyframes.bounceInUp} 1s;
  box-shadow: 0 0 5px 1px #333333;
`;

function FlashMessage({ messageState, duration = 2, handleMessage }) {
  const { innerWidth } = window;
  useEffect(() => {
    const timeId = setTimeout(() => {
      handleMessage({ key: 0, message: '' });
    }, duration * 1000);
    return () => {
      clearTimeout(timeId);
    };
  }, [messageState.message]);

  return (
    <Container left={innerWidth / 2 - 200}>
      <Content message={messageState.message} />
      <ProgressBar duration={duration} />
    </Container>
  );
}

FlashMessage.propTypes = {
  handleMessage: PropTypes.func.isRequired,
  messageState: PropTypes.object,
  duration: PropTypes.number,
};

export default FlashMessage;
