var assert = require('assert')
var RecordCollector = require('../record_collector.js')
var Store = require('../store.js')
var Record = require('../record.js')

describe("RecordCollector", function() {

  var recordCollector1;
  var recordCollector2;
  var record1;
  var record2;
  var record3;

  beforeEach(function() {
    recordCollector1 = new RecordCollector(10.00);
    recordCollector2 = new RecordCollector(11.00);
    record1 = new Record("Arctic Monkeys", "AM", "Indie", 9.99);
    record2 = new Record("Arctic Monkeys", "Suck It and See", "Indie", 8.99);
    record3 = new Record("Daft Punk", "Discovery", "Electronic", 10.99);
  })

  it("should have cash", function() {
    assert.strictEqual(recordCollector1.cash, 10.00);
  });

  it("should have empty collection", function() {
    assert.strictEqual(recordCollector1.collection.length, 0);
  });

  it("should be able to add record to collection", function() {
    recordCollector1.addRecord(record1);
    assert.strictEqual(recordCollector1.collection.length, 1)
  });

  it("should be able to buy record", function() {
    recordCollector1.buyRecord(record1);
    assert.strictEqual(recordCollector1.collection.length, 1);
    assert.strictEqual(+recordCollector1.cash.toFixed(2), 0.01);
  });

  it("should be able to remove record from collection", function() {
    recordCollector1.addRecord(record1);
    recordCollector1.removeRecord(record1);
    assert.strictEqual(recordCollector1.collection.length, 0);
  });

  it("should be able to sell record", function() {
    recordCollector1.addRecord(record1);
    recordCollector1.sellRecord(record1);
    assert.strictEqual(recordCollector1.collection.length, 0);
    assert.strictEqual(+recordCollector1.cash.toFixed(2), 19.99);
  });

  it("should be able to view total value of collection", function() {
    recordCollector1.addRecord(record1);
    assert.strictEqual(recordCollector1.getCollectionValue(), 9.99);
  });

  it("should be able to view total value of collection", function() {
    recordCollector1.addRecord(record1);
    recordCollector1.addRecord(record2);
    assert.strictEqual(recordCollector1.getCollectionValue(), 18.98);
  });

  it("should be able to return the most valuable record", function() {
    recordCollector1.addRecord(record1);
    recordCollector1.addRecord(record2);
    recordCollector1.addRecord(record3);
    assert.strictEqual(recordCollector1.mostValuableRecord(), record3)
  });

  it("should be able to sort their records by most valuable first", function() {
    recordCollector1.addRecord(record1);
    recordCollector1.addRecord(record2);
    recordCollector1.addRecord(record3);
    assert.strictEqual(recordCollector1.sortRecordsMostValuableFirst()[0], record3)
  });

  it("should be able to sort their records by least valuable first", function() {
    recordCollector1.addRecord(record1);
    recordCollector1.addRecord(record2);
    recordCollector1.addRecord(record3);
    assert.strictEqual(recordCollector1.sortRecordsLeastValuableFirst()[0], record2)
  });

  it("should be able to compare the total value of 2 collectors record collections and return whose is more valuable", function() {
    recordCollector1.addRecord(record1);
    recordCollector1.addRecord(record2);
    recordCollector2.addRecord(record1);
    recordCollector2.addRecord(record2);
    recordCollector2.addRecord(record3);
    assert.strictEqual(recordCollector1.compareRecordValueWithOtherCollector(recordCollector2), "Their collection is more valuable at £29.97")
  });

});
