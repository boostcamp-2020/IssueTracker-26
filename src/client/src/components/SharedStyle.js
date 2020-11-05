import { css } from 'styled-components';

const ShardStyle = {};

ShardStyle.inputOutlineStyle = css`
  &:focus {
    box-shadow: 0 0 0 4px ${(props) => props.theme.Color.inputShadow};
    outline-style: none;
    border: 0.1px solid ${(props) => props.theme.Color.inputOutline};
  }
`;

export default ShardStyle;
