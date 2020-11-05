import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const colorStyles = css`
  ${({ theme, color, hoverColor, fontColor }) => {
    const selectedColor = color || theme.Color.button;
    const selectedHover = hoverColor || theme.Color.buttonHover;
    const selectFontColor = fontColor || 'white';

    return css`
      color: ${selectFontColor};
      background: ${selectedColor};
      &:hover {
        background: ${selectedHover};
      }
    `;
  }}
`;

const sizeStyles = css`
  ${({ width, height, fontSize }) => css`
    width: ${width};
    height: ${height};
    font-size: ${fontSize};
  `}
`;

const fullWidthStyle = css`
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
      justify-content: center;
      & + & {
        margin-left: 0;
        margin-top: 1rem;
      }
    `}
`;

const StyledButton = styled.button`
  outline: none;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  ${sizeStyles}

  ${colorStyles}

  ${fullWidthStyle}
`;

function Button({
  children,
  color,
  width = '90px',
  height = '30px',
  fontSize = '0.8em',
  fullWidth,
  handler,
  type,
  hoverColor,
  fontColor,
}) {
  return (
    <StyledButton
      color={color}
      hoverColor={hoverColor}
      fontColor={fontColor}
      width={width}
      height={height}
      fontSize={fontSize}
      fullWidth={fullWidth}
      onClick={handler}
      type={type}
    >
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.string,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  fontSize: PropTypes.string,
  fullWidth: PropTypes.string,
  handler: PropTypes.func,
  type: PropTypes.string,
  fontColor: PropTypes.string,
};

export default Button;
