var Store = function (name, city, balance) {
  this.name = name;
  this.city = city;
  this.inventory = [];
  this.balance = balance;
}

Store.prototype.addToInventory = function (record) {
  this.inventory.push(record);
};

Store.prototype.returnAllInventory = function () {
  let results = ""
  this.inventory.forEach(function(record) {
    results = results + record.printProperties();
  })
  return results;
};

Store.prototype.sellRecord = function (record) {
  let index = this.inventory.indexOf(record);
  if (index > -1) {
    this.inventory.splice(index, 1);
    this.balance += record.price;
  }
  return this.balance;
};

Store.prototype.financialReport = function () {
  let inventoryTotal = this.inventory.reduce(function(inventoryTotal, record) {
    return inventoryTotal + record.price;
  } ,0)

  return "The store balance is: £" + this.balance.toFixed(2) + "\n" + "The value of the inventory is £" + inventoryTotal.toFixed(2);
};

Store.prototype.recordsByGenre = function (genre) {
  const genreArray = [];
  this.inventory.forEach(function(record) {
    if(record.genre.toLowerCase() === genre.toLowerCase()) {
      genreArray.push(record);
    }
  })
  return genreArray;
};

Store.prototype.viewRecordsByGenre = function (genre) {
  let results = "";
  this.recordsByGenre(genre).forEach(function(record) {
    results = results + record.printProperties();
  })
  return results;
};

module.exports = Store;
