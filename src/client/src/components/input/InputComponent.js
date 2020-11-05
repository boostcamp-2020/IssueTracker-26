import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import SharedStyle from '../SharedStyle';

const InputTag = styled.input`
  font-size: ${(props) => props.fontSize};
  border: 1px solid ${(props) => props.theme.Color.border};
  border-radius: 5px;
  width: ${(props) => props.width};
  min-height: ${(props) => props.height};
  padding: 0 0.5rem;
  ${(props) =>
    props.outlineColor
      ? SharedStyle.warningOutlineStyle
      : SharedStyle.inputOutlineStyle}
  ${(props) =>
    props.border === 'none'
      ? css`
          border: none;
          outline: none;
        `
      : css`
          border: 1px solid props.theme.currentColor.border;
          outline-color: props.theme.Color.inputOutline;
        `}

    border-radius: 3px;
  width: ${(props) => props.width || '150px'};
`;

function Input(props) {
  const {
    type,
    placeholder,
    value,
    name,
    onChange,
    width = '100%',
    height = '42px',
    fontSize = '18px',
    outlineColor,
    border,
  } = props;

  return (
    <InputTag
      width={width}
      height={height}
      fontSize={fontSize}
      type={type}
      placeholder={placeholder}
      border={border}
      value={value}
      onChange={onChange}
      name={name}
      outlineColor={outlineColor}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  fontSize: PropTypes.string,
  name: PropTypes.string,
  outlineColor: PropTypes.bool,
  border: PropTypes.string,
};

export default Input;
