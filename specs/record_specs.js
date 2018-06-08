var assert = require('assert')
var Record = require('../record.js')

describe('Record', function() {

  var record1;
  var record2;

  beforeEach(function() {
    record1 = new Record("Arctic Monkeys", "AM", "Indie", 9.99);
    record2 = new Record("Daft Punk", "Discovery", "Electronic", 10.99);
  })

  it("should have artist", function() {
    assert.strictEqual(record1.artist, "Arctic Monkeys");
  });

  it("should have a title", function() {
    assert.strictEqual(record1.title, "AM");
  });

  it("should have a genre", function() {
    assert.strictEqual(record1.genre, "Indie");
  });

  it("should have price", function() {
    assert.strictEqual(record1.price, 9.99);
  });


});
