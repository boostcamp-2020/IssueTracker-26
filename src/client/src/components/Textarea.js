import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import sharedStyle from './SharedStyle';

const Container = styled.div`
  position: relative;
  width: ${(props) => props.width};
`;

const TextArea = styled.textarea`
  min-width: 100%;
  max-width: 100%;
  min-height: ${(props) => props.height}px;
  max-height: ${(props) => props.height * 2}px;
  border: #e1e4e8 1px solid;
  font-size: 1.2rem;
  padding: 20px;
  border-radius: 5px;
  padding: 0.5rem 0.5rem;
  ${sharedStyle.inputOutlineStyle};
  border-bottom-left-radius: ${(props) => props.imageUpload && 0};
  border-bottom-right-radius: ${(props) => props.imageUpload && 0};
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
  handleFiles,
  handleInput,
  handleFocus,
  value,
  imageUpload = false,
}) {
  const spanRef = useRef(null);
  const handleCount = () => {
    const inputCount = value.length;
    if (!spanRef.current) return;
    spanRef.current.innerText = `${
      inputCount ? `${inputCount} characters` : ' '
    }`;
    setTimeout(() => {
      if (!spanRef.current) return;
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
        onFocus={() => handleFocus && handleFocus(true)}
        onBlur={() => handleFocus && handleFocus(false)}
        onDrop={handleFiles}
        value={value}
        imageUpload={imageUpload}
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
  handleFocus: PropTypes.func,
  handleFiles: PropTypes.func,
  value: PropTypes.string.isRequired,
  imageUpload: PropTypes.bool,
};

export default TextareaComponent;
