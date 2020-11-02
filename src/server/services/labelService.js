const labelModel = require('../models/labelModel');

const createLabel = async (labelInfo) => {
  try {
    const labelId = await labelModel.createLabel(labelInfo);
    return labelId;
  } catch (err) {
    return undefined;
  }
};

const getLabelList = async () => {
  try {
    const labelList = await labelModel.getLabelList();
    return labelList;
  } catch (err) {
    return undefined;
  }
};

module.exports = { createLabel, getLabelList };
