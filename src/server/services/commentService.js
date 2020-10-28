const commentModel = require('../models/commentModel');

const containMention = (content) => {
  const reg = /(@[\w]{6,16})/g;
  const mentions = content.match(reg);
  return mentions;
};

const create = async ({ content, userId, issueId }) => {
  try {
    const commentId = await commentModel.create({ content, userId, issueId });
    return commentId;
  } catch (err) {
    return undefined;
  }
};

module.exports = {
  create,
  containMention,
};
