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

module.exports = {
  create,
};
