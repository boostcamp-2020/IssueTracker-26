import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  height: 98%;
  background-color: #fff;
  padding: 2rem 2rem;
`;

function Content({ message }) {
  return <Container>{message}</Container>;
}

Content.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Content;
