/* eslint-disable array-callback-return */
const commentModel = require('../models/commentModel');
const userModel = require('../models/userModel');
const mentionModel = require('../models/mentionModel');

const containMention = (content) => {
  const reg = /(@[\w]{3,16})/g;
  const mentions = content.match(reg);
  return mentions;
};

const checkUser = async (mentions) => {
  if (!mentions) {
    return undefined;
  }

  const userId = [];
  const promiseList = [];

  mentions.forEach((mention) => {
    const userName = mention.replace('@', '');
    const resultUser = userModel.checkDuplicated(userName);
    promiseList.push(resultUser);
  });

  await Promise.all(promiseList).then((items) => {
    items.map((item) => {
      if (item) {
        userId.push(item.id);
      }
    });
  });
  return userId;
};

const createMention = async ({ userId, issueId, commentId = null }) => {
  const mentionId = await mentionModel.create({ userId, issueId, commentId });
  return mentionId;
};

const removeMention = async ({ issueId, commentId = null }) => {
  const result = await mentionModel.remove({ issueId, commentId });
  return result;
};

const updateMention = async ({ issueId, commentId = null}) => {

};

const create = async ({ content, userId, issueId }) => {
  try {
    const commentId = await commentModel.create({ content, userId, issueId });
    const mentions = containMention(content);
    const mentionedUserIds = await checkUser(mentions);

    if (mentionedUserIds) {
      mentionedUserIds.map(async (MUID) => {
        const mentionId = await createMention({
          userId: MUID,
          issueId,
          commentId,
        });
        return mentionId;
      });
    }

    return commentId;
  } catch (err) {
    return undefined;
  }
};

const read = async (issueId) => {
  const comments = await commentModel.read(issueId);
  return comments;
};

const remove = async (commnetId) => {
  const result = await commentModel.remove(commnetId);
  return result;
};

const update = async ({ commentId, content, issueId }) => {
  try {
    const result = await commentModel.update(commentId, content);
    if (!result) {
      return undefined;
    }
    removeMention({ issueId, commentId });
    const mentions = containMention(content);
    const mentionedUserIds = await checkUser(mentions);

    if (mentionedUserIds) {
      mentionedUserIds.map(async (muid) => {
        const mentionId = await createMention({
          userId: muid,
          commentId,
        });
        return mentionId;
      });
    }

    return commentId;
  } catch (err) {
    return undefined;
  }
};

module.exports = {
  create,
  containMention,
  checkUser,
  createMention,
  read,
  remove,
  update,
  removeMention,
  updateMention,
};
