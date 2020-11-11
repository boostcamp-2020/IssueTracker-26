import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Textarea from '../Textarea';
import InputComponent from '../input/InputComponent';
import Button from '../Button';
import Http from '../../util/http-common';

const MilestoneContainer = styled.div`
  max-width: 100%;
  width: 1200px;
  margin: 0 40px;

  div:last-child {
    float: right;
  }
`;

const HeaderDiv = styled.div`
  width: 100%;
  height: 200px;
  align-items: center;
  justify-content: space-around;
  padding-top: 100px;
  * {
    margin: 1em 0em;
  }
`;

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

function MilestoneSection() {
  const history = useHistory();
  const [milestone, setMilestone] = useState({
    title: '',
    dueDate: '',
    description: '',
  });

  const changeMilstone = (name) => (e) =>
    setMilestone({ ...milestone, [name]: e.target.value });

  const createMilestone = () =>
    fetch(`${Http}api/milestone/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(milestone),
    }).then((res) => history.replace('/milestone'));

  return (
    <MilestoneContainer>
      <HeaderDiv>
        <h1 style={{ marginBottom: 5 }}>New milestone</h1>
        <h5>
          Create a new milestone to help organize your issues and pull requests.
          Learn more about{' '}
          <a
            href="https://guides.github.com/features/issues/"
            style={{ color: 'royalblue' }}
          >
            milestones and issues.
          </a>
        </h5>
      </HeaderDiv>
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
          value={milestone.dueDate}
          onChange={changeMilstone('dueDate')}
        />
        <h3>Description (optional)</h3>
        <Textarea
          value={milestone.description}
          handleInput={changeMilstone('description')}
        />
        <hr />
      </StyledFrom>
      <div>
        <Button width={'150px'} height={'35px'} handler={createMilestone}>
          Create milestone
        </Button>
      </div>
    </MilestoneContainer>
  );
}

MilestoneSection.propTypes = {
  milestone: PropTypes.object,
};

export default MilestoneSection;
