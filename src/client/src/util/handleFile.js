const handleFiles = (setImgUrl) => (e) => {
  e.preventDefault();
  const PATH = process.env.REACT_APP_IMGUR_PATH;
  const CLIENT = process.env.REACT_APP_CLIENT;

  const newFiles = e.dataTransfer?.files || e.target.files; // object
  const newFileList = [];
  for (let i = 0; i < newFiles.length; i += 1) {
    newFileList.push(newFiles[i]);
  }
  Promise.all(
    newFileList.map((newFile) => {
      if (newFile.size < 500000) {
        return fetch(PATH, {
          method: 'POST',
          headers: {
            Authorization: `Client-ID ${CLIENT}`,
            Accept: 'application/json',
          },
          body: newFile,
        })
          .then((res) => res.json())
          .then((res) => {
            return res.data.link;
          });
      }
      return undefined;
    }),
  ).then((urlList) => setImgUrl([...urlList]));
};

export default handleFiles;
