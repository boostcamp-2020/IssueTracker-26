import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TouchLabel from './TouchLabel';
import Http from '../../util/http-common';
import getFontColor from './utils';
import {
  LabelBox,
  LabelSpan,
  ContentsList,
  TextContents,
  Description,
  EditDeleteBox,
} from './labelStyle';

function LabelList(props) {
  const { label, handleRender } = props;
  const width = '80px';
  const [activeEdit, setAcitveEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleEditLabel = () => setAcitveEdit(!activeEdit);
  const handleDelete = () => {
    fetch(`${Http}api/label/${label.id}`, {
      method: 'DELETE',
    })
      .then((res) => res.status)
      .then((status) => {
        if (status === 205) {
          setDeleted(true);
        } else {
          alert('fail');
        }
      });
  };

  useEffect(() => {
    handleRender();
  }, [activeEdit]);

  if (deleted) return null;
  return (
    <>
      {activeEdit ? (
        <TouchLabel
          id={label.id}
          title={label.title}
          description={label.description}
          color={label.color}
          isEdit={true}
          handler={handleEditLabel}
        ></TouchLabel>
      ) : (
        <ContentsList>
          <LabelBox width={width}>
            <LabelSpan
              fontColor={getFontColor(label.color)}
              color={label.color}
            >
              {label.title}
            </LabelSpan>
          </LabelBox>
          <Description>{label.description}</Description>
          <div></div>
          <EditDeleteBox width={width}>
            <TextContents onClick={handleEditLabel}>Edit</TextContents>
            <TextContents onClick={handleDelete}>Delete</TextContents>
          </EditDeleteBox>
        </ContentsList>
      )}
    </>
  );
}

LabelList.propTypes = {
  label: PropTypes.object,
  handleRender: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default LabelList;
