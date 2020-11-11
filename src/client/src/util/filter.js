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
    }
  });
  return list;
};

export default filter;
