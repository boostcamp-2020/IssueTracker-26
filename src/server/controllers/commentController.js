const commentService = require('../services/commentService');

const create = async (req, res) => {
  const { content, userId, issueId } = req.body;
  if (!(content && userId && issueId)) {
    return res.status(400).end();
  }
  const commentId = await commentService.create({ content, userId, issueId });
  if (commentId) {
    return res.status(201).end();
  }
  return res.status(500).end();
};

const read = async (req, res) => {
  const { issueId } = req.body;
  if (!issueId) {
    return res.status(400).end();
  }
  const comments = await commentService.read(issueId);
  if (comments) {
    return res.status(200).end();
  }
  return res.status(204).end();
};

const remove = async (req, res) => {
  const { id } = req.params;
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(id)) {
    return res.status(400).end();
  }
  const result = await commentService.remove(id);
  if (result) {
    return res.status(205).end(); // this means need refresh
  }
  return res.status(406).end();
};

module.exports = {
  create,
  read,
  remove,
};
