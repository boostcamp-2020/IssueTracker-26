import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import theme from '../Theme';

const inputOutlineStyle = css`
  box-shadow: 0 4px 0 4px ${theme.Color.inputShadow};
  outline-style: none;
  border: 0.1px solid ${theme.Color.inputBorder};
  border-top: 0.1px dotted ${theme.Color.inputBorder};
`;

const InputImgFileContainer = styled.div`
  margin-top: -6px;
  margin-bottom: 10px;
  border: 1px solid #e1e4e8;
  border-top: 1px dotted #e1e4e8;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  width: ${(props) => props.width};
  height: 30px;
  position: relative;
  background: ${theme.Color.lightGrayBackground};
  ${(props) => props.focus && inputOutlineStyle}
`;

const DivDescription = styled.div`
  position: absolute;
  padding: 6px;
  padding-left: 10px;
  color: gray;
  font-size: 13px;
`;

const InputImgFile = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0%;
  position: absolute;
  &:hover {
    cursor: pointer;
  }
`;

function ImageUpload(props) {
  const { width = '100%', handleFiles, focus } = props;
  return (
    <InputImgFileContainer width={width} focus={focus}>
      <DivDescription>
        Attach files by dragging &amp; dropping, selecting or pasting theme.
      </DivDescription>
      <InputImgFile
        multiple
        onChange={handleFiles}
        type="file"
        accept="image/*"
      ></InputImgFile>
    </InputImgFileContainer>
  );
}

ImageUpload.propTypes = {
  width: PropTypes.string,
  handleFiles: PropTypes.func,
  focus: PropTypes.bool,
};

export default ImageUpload;
