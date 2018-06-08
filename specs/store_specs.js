var assert = require('assert')
var Store = require('../store.js')
var Record = require('../record.js')
// var RecordCollector = require('../record_collector.js')

describe('Store', function() {

  var store;
  var record1;
  var record2;
  var record3;
  // var recordCollector;

  beforeEach(function() {
    store = new Store("Southside Sounds", "Glasgow", 100.00);
    record1 = new Record("Arctic Monkeys", "AM", "Indie", 9.99);
    record2 = new Record("Arctic Monkeys", "Suck It and See", "Indie", 8.99);
    record3 = new Record("Daft Punk", "Discovery", "Electronic", 10.99);
    // recordCollector = new RecordCollector();
    store.addToInventory(record1);
    store.addToInventory(record2);
    store.addToInventory(record3);
  })

  it("should have name", function() {
    assert.strictEqual(store.name, "Southside Sounds");
  });

  it("should have a location", function() {
    assert.strictEqual(store.city, "Glasgow");
  });

  it("should have a balance", function() {
    assert.strictEqual(store.balance, 100);
  });

  it("should be able to add a record to Inventory", function() {
    assert.strictEqual(store.inventory.length, 3);
  });


});
