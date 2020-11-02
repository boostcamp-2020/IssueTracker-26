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

const create = async ({ content, userId, issueId }) => {
  try {
    const commentId = await commentModel.create({ content, userId, issueId });
    const mentions = containMention(content);
    const mentionedUserIds = await checkUser(mentions);

    if (mentionedUserIds) {
      mentionedUserIds.map(async (muid) => {
        const mentionId = await createMention({
          userId: muid,
          issueId,
          commentId,
        });
        return mentionId;
      });
    }

    return commentId;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

module.exports = {
  create,
  containMention,
  checkUser,
  createMention,
};
