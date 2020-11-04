import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: ${(props) => props.width};
`;

const TextArea = styled.textarea`
  width: 100%;
  border-radius: 5px;
  padding: 0.5rem 0.5rem;
  &:focus {
    box-shadow: 0 0 0 4px ${(props) => props.theme.Color.inputShadow};
    outline-style: none;
    border: 0.1px solid #0466d5;
  }
`;

function TextareaComponent({
  width = '100%',
  placeholder = '',
  handleInput,
  value,
}) {
  return (
    <Container width={width}>
      <TextArea
        placeholder={placeholder}
        rows={10}
        onChange={handleInput}
        value={value}
      ></TextArea>
    </Container>
  );
}

TextareaComponent.propTypes = {
  width: PropTypes.string,
  placeholder: PropTypes.string,
  handleInput: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextareaComponent;
