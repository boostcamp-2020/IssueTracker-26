import React from 'react';
import PropTypes from 'prop-types';
import {
  LabelBox,
  LabelSpan,
  ContentsList,
  TextContents,
  Description,
  EditDeleteBox,
} from './labelStyle';

function LabelList(props) {
  const { label, handleEdit } = props;
  const width = '80px';
  return (
    <ContentsList>
      <LabelBox width={width}>
        <LabelSpan color={label.color}>{label.title}</LabelSpan>
      </LabelBox>
      <Description>{label.description}</Description>
      <div></div>
      <EditDeleteBox width={width}>
        <TextContents onClick={handleEdit}>Edit</TextContents>
        <TextContents>Delete</TextContents>
      </EditDeleteBox>
    </ContentsList>
  );
}

LabelList.propTypes = {
  label: PropTypes.object,
  handleEdit: PropTypes.func,
};

export default LabelList;
