const TransferTime = (time) => {
  const nowTime = new Date();
  const ctime = new Date(time);
  const result = Math.floor((nowTime - ctime) / 1000);

  if (result < 60) {
    return `${result} seconds ago`;
  }

  if (result < 60 * 60) {
    return `${Math.floor(result / 60)} minute ago`;
  }

  if (result < 60 * 60 * 24) {
    return `${Math.floor(result / (60 * 60))} hours ago`;
  }
  return `${Math.floor(result / (60 * 60 * 24))} day ago`;
};

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

const getFormatDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  let day = date.getDate();
  day = day >= 10 ? day : `0${day}`;
  return `${MONTH[month]} ${day}, ${year}`;
};

export { TransferTime, getFormatDate };
