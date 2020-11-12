const TagGenerator = (
  imgUrl,
  textArea,
  setTextArea,
  setButtonState,
  buttonState,
) => {
  let temp = '';
  imgUrl.forEach((url) => {
    temp += `<img src="${url}" />\n`;
  });
  if (temp !== '') {
    let resultText = textArea;
    if (textArea !== '') resultText += '\n';
    setTextArea(`${resultText}${temp}`);
    setButtonState(buttonState);
  }
};

export default TagGenerator;
