/**
* Post.js
*
* @description :: represents a twitter post that has been scheduled for a
* future date.
*/

module.exports = {

  attributes: {
    message: {
      type: 'string',
      required: true
    },
    scheduledfor: 'datetime',
    isPosted: 'boolean',
    owner: {
      model: 'user'
    }
  }
};
