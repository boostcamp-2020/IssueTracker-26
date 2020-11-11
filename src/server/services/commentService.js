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

const createMentionLogic = async ({ content, issueId, commentId }) => {
  const mentions = containMention(content);
  const mentionedUserIds = await checkUser(mentions);

  if (mentionedUserIds) {
    const promiseList = [];
    mentionedUserIds.map(async (MUID) => {
      const promiseItem = createMention({
        userId: MUID,
        issueId,
        commentId,
      });
      promiseList.push(promiseItem);
      return MUID;
    });
    await Promise.all(promiseList);
  }
};

const create = async ({ content, userId, issueId }) => {
  try {
    const comment = await commentModel.create({ content, userId, issueId });

    await createMentionLogic({ content, issueId, commendId: comment.id });

    return comment;
  } catch (err) {
    return undefined;
  }
};

const read = async (issueId) => {
  const comments = await commentModel.read(issueId);
  return comments;
};

const remove = async (commentId) => {
  const result = await commentModel.remove(commentId);
  return result;
};

const update = async ({ commentId, content, issueId }) => {
  try {
    const result = await commentModel.update(commentId, content);
    if (!result) {
      return undefined;
    }
    await removeMention({ issueId, commentId });

    await createMentionLogic({ content, issueId, commentId });

    return true;
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
};
