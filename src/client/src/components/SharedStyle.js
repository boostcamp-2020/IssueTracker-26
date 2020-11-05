import { css } from 'styled-components';

const ShardStyle = {};

const sharedInputOutlineStyle = css`
  outline-style: none;
  border: 0.1px solid ${(props) => props.theme.Color.inputBorder};
`;

ShardStyle.inputOutlineStyle = css`
  &:focus {
    box-shadow: 0 0 0 4px ${(props) => props.theme.Color.inputShadow};
    ${sharedInputOutlineStyle}
  }
`;

ShardStyle.warningOutlineStyle = css`
  &:focus {
    box-shadow: 0 0 0 4px ${(props) => props.theme.Color.warningInputShadow};
    ${sharedInputOutlineStyle}
  }
`;

export default ShardStyle;
