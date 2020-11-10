import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import calendarImg from '../../../public/images/calendar.svg';

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
  height: 80px;
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
  * {
    margin-right: 15px;
    &:hover {
      cursor: pointer;
    }
  }
  color: royalblue;
  span:last-child {
    color: crimson;
  }
`;

const MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function MilestoneListContent(props) {
  const { milestones, setMilestones } = props;

  const getFormatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    let day = date.getDate();
    day = day >= 10 ? day : `0${day}`;
    return `${MONTH[month]} ${day}, ${year}`;
  };

  const getIssueStatus = (milestone) => {
    console.log(milestone);
  };

  const milestoneRows = milestones.map((milestone, index) => (
    <ContentDiv key={index}>
      <LeftDiv>
        <h3>{milestone.title}</h3>
        <div>
          {milestone.duedate ? (
            <div>
              <img src={calendarImg} />
              Due by {getFormatDate(new Date(milestone.duedate))}
            </div>
          ) : (
            <br></br>
          )}
        </div>
        <div>{milestone.description || <br></br>}</div>
      </LeftDiv>
      <RightDiv>
        <div>progress bar</div>
        <StatusDiv>
          <span>33% complete</span>
          <span>2 open</span>
          <span>1 closed</span>
        </StatusDiv>
        <ControlDiv>
          <span>Edit</span>
          <span>Close</span>
          <span>Delete</span>
        </ControlDiv>
      </RightDiv>
    </ContentDiv>
  ));

  return <div>{milestoneRows}</div>;
}

MilestoneListContent.propTypes = {
  milestones: PropTypes.array,
  setMilestones: PropTypes.func,
};

export default MilestoneListContent;
