/* eslint-disable array-callback-return */
const commentModel = require('../models/commentModel');
const userModel = require('../models/userModel');

const containMention = (content) => {
  const reg = /(@[\w]{6,16})/g;
  const mentions = content.match(reg);
  return mentions;
};

const checkUser = async (mentions) => {
  // select id from user where userName=${mention}
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

const createMention = (userId, issueId, commentId = null) => {
  console.log(commentId);
};

const create = async ({ content, userId, issueId }) => {
  try {
    const commentId = await commentModel.create({ content, userId, issueId });
    // const mentions = containMention(content);

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
};
