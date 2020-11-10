import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import flashKeyframes from './keyframes';

const Container = styled.div`
  height: 2%;
  background-color: ${(props) => props.theme.Color.lightGreen};
  transform-origin: left;
  animation: ${flashKeyframes.trackProgress} linear
    ${(props) => `${props.duration}s`} forwards;
`;

function ProgressBar({ duration }) {
  return <Container duration={duration}></Container>;
}

ProgressBar.propTypes = {
  duration: PropTypes.number.isRequired,
};

export default ProgressBar;
