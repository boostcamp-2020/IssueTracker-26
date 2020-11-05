import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const InputTag = styled.input`
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
  const { type, placeholder, value, onChange, width = '150px', border } = props;

  return (
    <InputTag
      width={width}
      type={type}
      placeholder={placeholder}
      border={border}
      value={value}
      onChange={onChange}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.string,
  border: PropTypes.string,
};

export default Input;
