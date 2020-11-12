import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../Button';
import Http from '../../util/http-common';
import MilestoneForm from './MilestoneForm';
import LabelMilestoneButton from '../LabelMilestoneButton';

const MilestoneContainer = styled.div`
  max-width: 100%;
  width: 1200px;
  margin: 0 40px;

  div:last-child {
    float: right;
    & > button {
      margin: 0em 0.5em;
    }
  }
`;

const HeaderDiv = styled.div`
  width: 100%;
  height: 200px;
  align-items: center;
  padding-top: 100px;
  * {
    margin: 1em 0em;
  }
`;

function MilestoneEditSection(props) {
  const { id } = props;
  const history = useHistory();
  const [milestone, setMilestone] = useState({
    title: '',
    dueDate: '',
    description: '',
  });

  useEffect(() => {
    fetch(`${Http}api/milestone/${id}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  const changeMilstone = (name) => (e) =>
    setMilestone({ ...milestone, [name]: e.target.value });

  const editMilestone = () =>
    fetch(`${Http}api/milestone/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(milestone),
    }).then(() => history.replace(`/milestone`));

  return (
    <MilestoneContainer>
      <HeaderDiv>
        <LabelMilestoneButton page={'milestone'} />
      </HeaderDiv>
      <MilestoneForm milestone={milestone} changeMilstone={changeMilstone} />
      <div>
        <Button
          width={'80px'}
          height={'35px'}
          color={'ghostwhite'}
          hoverColor={'whitesmoke'}
          fontColor={'darkslategray'}
          handler={() => history.replace('/milestone')}
        >
          Cancel
        </Button>
        <Button
          width={'150px'}
          height={'35px'}
          color={'ghostwhite'}
          hoverColor={'whitesmoke'}
          fontColor={'darkslategray'}
          handler={editMilestone}
        >
          Close Milestone
        </Button>
        <Button width={'120px'} height={'35px'} handler={editMilestone}>
          Save changes
        </Button>
      </div>
    </MilestoneContainer>
  );
}

MilestoneEditSection.propTypes = {
  id: PropTypes.string,
};

export default MilestoneEditSection;
