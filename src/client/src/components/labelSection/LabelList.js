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
  const { label } = props;
  const width = '80px';
  return (
    <ContentsList>
      <LabelBox width={width}>
        <LabelSpan color={label.color}>{label.title}</LabelSpan>
      </LabelBox>
      <Description>{label.description}</Description>
      <div></div>
      <EditDeleteBox width={width}>
        <TextContents>Edit</TextContents>
        <TextContents>Delete</TextContents>
      </EditDeleteBox>
    </ContentsList>
  );
}

LabelList.propTypes = {
  label: PropTypes.object,
};

export default LabelList;
