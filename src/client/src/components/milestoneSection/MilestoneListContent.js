import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import calendarImg from '../../../public/images/calendar.svg';
import { getFormatDate } from '../../util/time';
import Http from '../../util/http-common';

const ContentDiv = styled.div`
  display: flex;
  height: 120px;
  text-align: center;
  padding-right: 15px;
  border-top: ${(props) => props.theme.Color.border} 1px solid;
  align-items: center;
  justify-content: space-around;

  div {
    width: 500px;
    text-align: left;
  }
`;

const LeftDiv = styled.div`
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  div {
    color: #586069;
  }

  img {
    width: 15px;
    margin-right: 5px;
    filter: invert(38%) sepia(4%) saturate(1346%) hue-rotate(172deg)
      brightness(91%) contrast(84%);
  }
`;

const RightDiv = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StatusDiv = styled.div`
  * {
    margin-right: 15px;
  }
  color: #586069;
  font-weight: 30px;
`;

const ControlDiv = styled.div`
  color: royalblue;
  * {
    margin-right: 15px;
    &:hover {
      cursor: pointer;
    }
  }

  a {
    color: royalblue;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  span:last-child {
    color: crimson;
  }
`;

const DivBar = styled.div`
  background: #e1e4e8;
  height: 8px;
  border-radius: 10px;
`;

const DivInBar = styled.div`
  background: #28a745;
  height: 8px;
  width: ${(props) => Math.round(props.width)}% !important;
  border-radius: 10px;
`;

function MilestoneListContent(props) {
  const { milestones, isOpenView, fetchAllData } = props;

  const changeState = (id, state) => {
    fetch(`${Http}api/milestone/state/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state }),
    })
      .then((res) => res.json())
      .then(() => fetchAllData());
  };

  const milestoneRows = milestones.map((milestone, index) => (
    <ContentDiv key={index}>
      <LeftDiv>
        <h3>{milestone.title}</h3>
        <div>
          {milestone.dueDate ? (
            <div>
              <img src={calendarImg} />
              Due by {getFormatDate(new Date(milestone.dueDate))}
            </div>
          ) : (
            <br></br>
          )}
        </div>
        <div>{milestone.description || <br></br>}</div>
      </LeftDiv>
      <RightDiv>
        <DivBar>
          <DivInBar width={Math.round(milestone.ratio)}></DivInBar>
        </DivBar>
        <StatusDiv>
          <span>{Math.round(milestone.ratio) || 0}% complete</span>
          <span>{milestone.total - milestone.close} open</span>
          <span>{milestone.close} closed</span>
        </StatusDiv>
        <ControlDiv>
          <Link to={`/milestone-edit/${milestone.id}`}>Edit</Link>
          {isOpenView ? (
            <span onClick={() => changeState(milestone.id, milestone.state)}>
              Close
            </span>
          ) : (
            <span onClick={() => changeState(milestone.id, milestone.state)}>
              Reopen
            </span>
          )}
          <span>Delete</span>
        </ControlDiv>
      </RightDiv>
    </ContentDiv>
  ));

  return <div>{milestoneRows}</div>;
}

MilestoneListContent.propTypes = {
  milestones: PropTypes.array,
  isOpenView: PropTypes.bool,
  fetchAllData: PropTypes.func,
};

export default MilestoneListContent;
