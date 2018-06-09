
// The RecordCollector should be able to compare the value of their collection with another RecordCollector

var RecordCollector = function(cash) {
  this.collection = [];
  this.cash = cash;
}

RecordCollector.prototype.addRecord = function (record) {
  this.collection.push(record);
};

RecordCollector.prototype.removeRecord = function (record) {
  let index = this.collection.indexOf(record);
  if (index > -1) {
    this.collection.splice(index, 1);
  }
};

RecordCollector.prototype.buyRecord = function (record) {
  if(this.cash >= record.price) {
    this.addRecord(record);
    this.cash -= record.price;
    return true;
  }
};

RecordCollector.prototype.sellRecord = function (record) {
  this.cash += record.price;
  this.removeRecord(record);
};

RecordCollector.prototype.getCollectionValue = function () {
  return this.collection.reduce(function(sum, record) {
    return sum + record.price;
  }, 0);
};

RecordCollector.prototype.recordsByGenre = function (genre) {
  const genreArray = [];
  this.collection.forEach(function(record) {
    if(record.genre.toLowerCase() === genre.toLowerCase()) {
      genreArray.push(record);
    }
  })
  return genreArray;
};

RecordCollector.prototype.getCollectionValueByGenre = function (genre) {
  return this.recordsByGenre(genre).reduce(function(sum, record) {
    return sum + record.price;
  }, 0);
};

RecordCollector.prototype.mostValuableRecord = function () {
  return this.sortRecordsMostValuableFirst()[0];
};

RecordCollector.prototype.sortRecordsMostValuableFirst = function () {
  this.collection.sort(function(a, b) {
    return b.price - a.price;
  });
  return this.collection;
};

RecordCollector.prototype.sortRecordsLeastValuableFirst = function () {
  this.collection.sort(function(a, b) {
    return a.price - b.price;
  })
  sortedArray = this.collection;
  return sortedArray;
};

RecordCollector.prototype.compareRecordValueWithOtherCollector = function (recordCollector) {
  yourValue = this.getCollectionValue();
  theirValue = recordCollector.getCollectionValue();
  if (yourValue > theirValue) {
    return "Your collection is more valuable at £" + yourValue.toFixed(2);
  } else if (theirValue > yourValue) {
    return "Their collection is more valuable at £" + theirValue.toFixed(2);
  } else {
    return "The collections have the same value at £" + yourValue.toFixed(2);
  }

};

module.exports = RecordCollector;
