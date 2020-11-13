import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Textarea from '../Textarea';
import InputComponent from '../input/InputComponent';
import { getDateInputFormat } from '../../util/time';

const StyledFrom = styled.div`
  margin: 1em 0em;
  h3 {
    margin-top: 1em;
    margin-bottom: 0.5em;
  }
  textarea {
    margin-bottom: 1em;
  }
`;

function MilestoneForm(props) {
  const { milestone, changeMilstone } = props;
  return (
    <StyledFrom>
      <hr />
      <h3>Title</h3>
      <InputComponent
        width={'400px'}
        placeholder={'Title'}
        value={milestone.title}
        onChange={changeMilstone('title')}
      />
      <h3>Due date (optional)</h3>
      <InputComponent
        width={'400px'}
        type={'date'}
        value={milestone.duedate ? getDateInputFormat(milestone.duedate) : ''}
        onChange={changeMilstone('duedate')}
      />
      <h3>Description (optional)</h3>
      <Textarea
        value={milestone.description || ''}
        handleInput={changeMilstone('description')}
      />
      <hr />
    </StyledFrom>
  );
}
MilestoneForm.propTypes = {
  milestone: PropTypes.object,
  changeMilstone: PropTypes.func,
};

export default MilestoneForm;
