import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TouchLabel from './TouchLabel';
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
  const [activeEdit, setAcitveEdit] = useState(false);
  const handleEditLabel = () => setAcitveEdit(!activeEdit);

  return (
    <>
      {activeEdit ? (
        <TouchLabel
          title={label.title}
          description={label.description}
          color={label.color}
          isEdit={true}
          handler={handleEditLabel}
        ></TouchLabel>
      ) : (
        <ContentsList>
          <LabelBox width={width}>
            <LabelSpan color={label.color}>{label.title}</LabelSpan>
          </LabelBox>
          <Description>{label.description}</Description>
          <div></div>
          <EditDeleteBox width={width}>
            <TextContents onClick={handleEditLabel}>Edit</TextContents>
            <TextContents>Delete</TextContents>
          </EditDeleteBox>
        </ContentsList>
      )}
    </>
  );
}

LabelList.propTypes = {
  label: PropTypes.object,
};

export default LabelList;
