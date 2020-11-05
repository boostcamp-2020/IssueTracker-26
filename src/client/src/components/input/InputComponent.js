import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputTag = styled.input`
  border-color: ${(props) => props.theme.Color.border};
  border-radius: 3px;
  outline-color: ${(props) => props.theme.Color.inputOutline};
  width: ${(props) => props.width || '150px'};
`;

function Input(props) {
  const { type, placeholder, value, onChange, width = '150px' } = props;

  return (
    <InputTag
      width={width}
      type={type}
      placeholder={placeholder}
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
};

export default Input;
