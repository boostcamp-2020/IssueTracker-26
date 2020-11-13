const AuthorFilter = (filterData, list) => {
  return list.filter((issue) => filterData === issue.username);
};

const IsFilter = (filterData, list) => {
  let result = [];
  if (filterData === 'open') {
    result = list.filter((issue) => issue.state === 1);
  } else if (filterData === 'close') {
    result = list.filter((issue) => issue.state === 0);
  } else {
    result = list;
  }
  return result;
};

const LabelFilter = (filterData, list) => {
  return list.filter((issue) => {
    let check = false;
    issue.label.forEach((label) => {
      if (label.title === filterData) {
        check = true;
      }
    });
    return check;
  });
};

const MilstoneFilter = (filterData, list) => {
  return list.filter((issue) => filterData === issue.milestonename);
};

const AssigneeFilter = (filterData, list) => {
  const result = list.filter((issue) => {
    let check = false;
    issue.assignee.forEach((user) => {
      if (user.username === filterData) {
        check = true;
      }
    });
    return check;
  });
  return result;
};

const NoFilter = (filterData, list) => {
  let result;
  if (filterData === 'label') {
    result = list.filter((issue) => issue.label.length === 0);
  } else if (filterData === 'assignee') {
    result = list.filter((issue) => issue.assignee.length === 0);
  } else if (filterData === 'milestone') {
    result = list.filter((issue) => !issue.milestone_id);
  }
  return result;
};

const filter = (issueList, filterList) => {
  const filterArr = filterList.split(' ');
  let list = issueList;
  filterArr.forEach((info) => {
    const filtering = info.split(':');
    const filterType = filtering[0];
    const filterData = filtering[1];
    if (filterType === 'author') {
      list = AuthorFilter(filterData, list);
    } else if (filterType === 'is') {
      list = IsFilter(filterData, list);
    } else if (filterType === 'label') {
      list = LabelFilter(filterData, list);
    } else if (filterType === 'milestone') {
      list = MilstoneFilter(filterData, list);
    } else if (filterType === 'assignee') {
      list = AssigneeFilter(filterData, list);
    } else if (filterType === 'no') {
      list = NoFilter(filterData, list);
    }
  });
  return list;
};

export default filter;
