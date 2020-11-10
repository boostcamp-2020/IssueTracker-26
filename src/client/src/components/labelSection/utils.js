function getFontColor(bgColor) {
  const threshold = 150;
  const WHITE = '#FFFFFF';
  const BLACK = '#000000';
  const colorHex = bgColor.replace('#', '');
  if (colorHex.length !== 6) {
    return BLACK;
  }
  const r = parseInt(colorHex.substring(0, 2), 16);
  const g = parseInt(colorHex.substring(2, 4), 16);
  const b = parseInt(colorHex.substring(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > threshold ? BLACK : WHITE;
}

export default getFontColor;
