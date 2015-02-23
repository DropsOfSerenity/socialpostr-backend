var expect = require('chai').expect;

describe('Posts', function() {
  it('should not allow empty messages', function(done) {
    Post.create({
      message: '',
      scheduledfor: new Date(),
      isPosted: false,
      owner: 1
    }).exec(function(err, post) {
      expect(err).to.exist;
      expect(post).to.be.undefined;
      done();
    });
  });
});
