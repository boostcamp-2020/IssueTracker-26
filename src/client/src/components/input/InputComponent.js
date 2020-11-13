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
  background-color: ${(props) => props.bgColor};
  ${(props) =>
    props.outlineColor === 'warning' ? SharedStyle.warningOutlineStyle : null}
  ${(props) =>
    props.outlineColor === 'default' ? SharedStyle.inputOutlineStyle : null}
  ${(props) =>
    props.border === 'none'
      ? css`
          border: none;
          outline: none;
          &:hover {
            box-shadow: none;
            border: none;
          }
        `
      : null}

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
    outlineColor = 'default',
    border,
    bgColor = 'none',
    onKeyPress,
    onBlur,
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
      bgColor={bgColor}
      onKeyPress={onKeyPress}
      onBlur={onBlur}
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
  outlineColor: PropTypes.string,
  border: PropTypes.string,
  bgColor: PropTypes.string,
  onKeyPress: PropTypes.func,
  onBlur: PropTypes.func,
};

export default Input;
