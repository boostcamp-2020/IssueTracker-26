const labelModel = require('../models/labelModel');

const createLabel = async (labelInfo) => {
  try {
    const labelId = await labelModel.createLabel(labelInfo);
    return labelId;
  } catch (err) {
    return undefined;
  }
};

module.exports = { createLabel };
