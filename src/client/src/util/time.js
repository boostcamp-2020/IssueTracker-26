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

export default TransferTime;
