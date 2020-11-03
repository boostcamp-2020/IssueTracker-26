const labelService = require('../services/labelService');

const createLabel = async (req, res) => {
  const labelInfo = req.body;
  if (!labelInfo.title || !labelInfo.color) {
    return res.status(400).end();
  }
  const labelId = await labelService.createLabel(labelInfo);
  if (labelId) {
    return res.status(201).end();
  }
  return res.status(500).end();
};

const getLabelList = async (req, res) => {
  const labelList = await labelService.getLabelList();
  if (labelList) {
    return res.status(200).json(labelList);
  }
  return res.status(500).end();
};

const updateLabel = async (req, res) => {
  const { id } = req.params;
  const labelInfo = req.body;
  if (!(id && labelInfo.title && labelInfo.color)) {
    return res.status(400).end();
  }
  const changedRows = await labelService.updateLabel(id, labelInfo);
  if (changedRows) {
    return res.status(200).end();
  }
  return res.status(404).end();
};

const deleteLabel = async (req, res) => {
  const { id } = req.params;
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(id)) {
    return res.status(400).end();
  }
  const affectedRows = await labelService.deleteLabel(id);
  if (affectedRows) {
    return res.status(205).end();
  }
  return res.status(404).end();
};

module.exports = { createLabel, getLabelList, updateLabel, deleteLabel };
