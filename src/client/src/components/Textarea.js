import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: ${(props) => props.width};
`;

const TextArea = styled.textarea`
  min-width: 100%;
  max-width: 100%;
  min-height: ${(props) => props.height}px;
  max-height: ${(props) => props.height * 2}px;
  border-radius: 5px;
  padding: 0.5rem 0.5rem;
  &:focus {
    box-shadow: 0 0 0 4px ${(props) => props.theme.Color.inputShadow};
    outline-style: none;
    border: 0.1px solid ${(props) => props.theme.Color.inputOutline};
  }
`;

const Span = styled.span`
  color: #afafaf;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;

let timeoutId = null;

function TextareaComponent({
  width = '100%',
  height = 300,
  placeholder = '',
  handleInput,
  value,
}) {
  const spanRef = useRef(null);
  const handleCount = () => {
    const inputCount = value.length;
    spanRef.current.innerText = `${
      inputCount ? `${inputCount} characters` : ' '
    }`;
    setTimeout(() => {
      spanRef.current.innerText = '';
    }, 2000);
  };
  useEffect(() => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      handleCount();
    }, 2000);
  }, [value]);
  return (
    <Container width={width}>
      <TextArea
        height={height}
        placeholder={placeholder}
        onChange={handleInput}
        value={value}
      ></TextArea>
      <Span ref={spanRef}></Span>
    </Container>
  );
}

TextareaComponent.propTypes = {
  width: PropTypes.string,
  height: PropTypes.number,
  placeholder: PropTypes.string,
  handleInput: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextareaComponent;
