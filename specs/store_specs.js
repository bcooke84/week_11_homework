var assert = require('assert')
var Store = require('../store.js')
var Record = require('../record.js')
var RecordCollector = require('../record_collector.js')

describe('Store', function() {

  var store;
  var record1;
  var record2;
  var record3;
  var recordCollector;

  beforeEach(function() {
    store = new Store("Southside Sounds", "Glasgow", 100.00);
    record1 = new Record("Arctic Monkeys", "AM", "Indie", 9.99);
    record2 = new Record("Arctic Monkeys", "Suck It and See", "Indie", 8.99);
    record3 = new Record("Daft Punk", "Discovery", "Electronic", 10.99);
    recordCollector = new RecordCollector(20.00);
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

  it("should be able to list the inventory", function() {
    assert.strictEqual(store.returnAllInventory(), "Artist: Arctic Monkeys, Title: AM, Genre: Indie, Price:  9.99" + "\n" + "Artist: Arctic Monkeys, Title: Suck It and See, Genre: Indie, Price:  8.99" + "\n" + "Artist: Daft Punk, Title: Discovery, Genre: Electronic, Price:  10.99" + "\n")
  });

  it("should be able to decrease balance when a record is bought", function () {
    store.removeFromInventory(record1);
    recordCollector.addRecord(record1);
    store.buyRecord(record1, recordCollector);
    assert.strictEqual(store.balance, 90.01);
  });

  it("should add a record from the inventory when the record is bought", function () {
    store.removeFromInventory(record1);
    recordCollector.addRecord(record1);
    store.buyRecord(record1, recordCollector);
    assert.strictEqual(store.inventory.length, 3);
  });

  it("should be able to increase balance when a record is sold", function () {
    store.sellRecord(record1, recordCollector);
    assert.strictEqual(store.balance, 109.99);
  });

  it("should remove a record from the inventory when the record is sold", function () {
    store.sellRecord(record1, recordCollector);
    assert.strictEqual(store.inventory.length, 2);
  });

  it("should report the store balance and value of store inventory", function() {
    assert.strictEqual(store.financialReport(), "The store balance is: £100.00" + "\n" + "The value of the inventory is £29.97")
  })

  it("should return all records from inventory of a specified genre", function() {
    assert.strictEqual(store.recordsByGenre("Indie").length, 2)
  })

  it("should be able to log all records of a specified genre", function() {
    assert.strictEqual(store.viewRecordsByGenre("indie"), "Artist: Arctic Monkeys, Title: AM, Genre: Indie, Price:  9.99" + "\n" + "Artist: Arctic Monkeys, Title: Suck It and See, Genre: Indie, Price:  8.99" + "\n")
  });


});
