const filter = (issueList, filterList) => {
  const filterArr = filterList.split(' ');
  let list = issueList;
  filterArr.forEach((info) => {
    const filtering = info.split(':');
    const filterType = filtering[0];
    const filterData = filtering[1];
    if (filterType === 'author') {
      list = list.filter((issue) => filterData === issue.username);
    } else if (filterType === 'is') {
      if (filterData === 'open') {
        list = list.filter((issue) => issue.state === 1);
      } else if (filterData === 'close') {
        list = list.filter((issue) => issue.state === 0);
      }
    } else if (filterType === 'label') {
      list = list.filter((issue) => {
        let check = false;
        issue.label.forEach((label) => {
          if (label.title === filterData) {
            check = true;
          }
        });
        return check;
      });
    } else if (filterType === 'milestone') {
      list = list.filter((issue) => filterData === issue.milestonename);
    } else if (filterType === 'assignee') {
      list = list.filter((issue) => {
        let check = false;
        issue.assignee.forEach((user) => {
          if (user.username === filterData) {
            check = true;
          }
        });
        return check;
      });
    } else if (filterType === 'no') {
      if (filterData === 'label') {
        list = list.filter((issue) => issue.label.length === 0);
      } else if (filterData === 'assignee') {
        list = list.filter((issue) => issue.assignee.length === 0);
      } else if (filterData === 'milestone') {
        list = list.filter((issue) => !issue.milestone_id);
      }
    }
  });
  return list;
};

export default filter;
