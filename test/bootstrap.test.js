var Sails = require('sails');
var Barrels = require('barrels');

before(function(done) {
  Sails.lift({
    log: {
      level: 'error'
    },
    models: {
      name: 'test',
      migrate: 'drop'
    }
  }, function(err, sails) {
    if (err) return done(err);

    // load fixtures
    var barrels = new Barrels();
    fixtures = barrels.data;

    barrels.populate(function(err) {
      done(err, sails);
    });
  });
});

after(function(done) {
  console.log();
  sails.lower(done);
});
