#! /usr/bin/env node

console.log('This script populates some test items, categories, metric units and item instances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Item = require('./models/itemModel')
var Category = require('./models/categoryModel')
var Metric = require('./models/metricModel')
var ItemInstance = require('./models/itemInstanceModel')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = []
var categories = []
var metrics = []
var iteminstances = []

function categoryCreate(name,description,cb) {
 
  
  var category = new Category({
    name,
    description
  });
       
  category.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category)
  }  );
}

function metricCreate(name, abbreviation ,cb) {
  var metric = new Metric({ name, abbreviation });
       
  metric.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Metric: ' + metric);
    metrics.push(metric)
    cb(null, metric);
  }   );
}

function itemCreate(name, description, category, metricUnit, cb) {
  
    
  var item = new Item({
    name,
    description,
    category,
    metric_unit: metricUnit
  });    
  item.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Item: ' + item);
    items.push(item)
    cb(null, item)
  }  );
}


function itemInstanceCreate(item, size, price, name, cb) {
  
    
  var iteminstance = new ItemInstance({
    item,
    size,
    brandName: name,
    price
  });    
  iteminstance.save(function (err) {
    if (err) {
      console.log('ERROR CREATING BookInstance: ' + iteminstance);
      cb(err, null)
      return
    }
    console.log('New ItemInstance: ' + iteminstance);
    iteminstances.push(iteminstance)
    cb(null, item)
  }  );
}


function createCategory(cb){
  async.series([
    function(callback) {
                categoryCreate('Meat', 'fresh and delicious meat cuts from organic fed livestock', callback);
              },
              function(callback) {
                categoryCreate('Poultry', 'finger licking chicken',callback);
              },
              function(callback) {
                categoryCreate('Flour', 'good flour', callback);
              },
              function(callback) {
                categoryCreate('Dairy', 'freshest dairy',callback);
              },
              function(callback) {
                categoryCreate('Cooking Oil', 'best oils',callback);
              },
  ],cb)
}

function createMetric(cb){
    async.series([
      function(callback) {
                  metricCreate("Kilograms", 'Kgs',callback);
                },
                function(callback) {
                  metricCreate("Litres", 'L',callback);
                },
                function(callback) {
                  metricCreate("Packet", 'Pack', callback);
                },
    ],cb)
}

function createItems(cb){
  async.series([
    function(callback){
      itemCreate('Beef', 'fresh cut, organic', categories[0],metrics[0],callback)
    },
    function(callback){
      itemCreate('Mutton', 'fresh cut, organic, fatty', categories[0],metrics[0],callback)
    },
    function(callback){
      itemCreate('Chicken', 'free range chicken', categories[1],metrics[0],callback)
      
    },
    function(callback){
      itemCreate('Turkey', 'Holiday special', categories[1],metrics[0],callback)
    },
    function(callback){
      itemCreate('Maize meal ', 'premium maize flour', categories[2],metrics[0],callback)
    },
    function(callback){
      itemCreate('Wheat Flour', 'for fresh and soft chapatis', categories[2],metrics[0],callback)
    },
    function(callback){
      itemCreate('Milk', 'creamy long life milk', categories[3],metrics[2],callback)
    },
    function(callback){
      itemCreate('Ghee', 'premium ghee', categories[3],metrics[0],callback)
    },
    function(callback){
      itemCreate('Palm oil', 'made from fresh palms from mombasa', categories[4],metrics[1],callback)
    },
    function(callback){
      itemCreate('Olive oil', 'made from high grade olive fruit', categories[4],metrics[1],callback)
    },
  ],cb)
}

function creatItemInstances(cb){
  async.series([
    function(callback){
      itemInstanceCreate(items[0],'500',10000, 'wagyu beef',callback)
    },
    function(callback){
      itemInstanceCreate(items[3],'2',210, 'Soko Maize meal',callback)
    },
    function(callback){
      itemInstanceCreate(items[9],'2',980, 'Picogram premium',callback)
    },
    function(callback){
      itemInstanceCreate(items[7],'500',550, 'Brookside Ghee',callback)
    },
    function(callback){
      itemInstanceCreate(items[6],'500',550, 'Fresha',callback)
    },
    function(callback){
      itemInstanceCreate(items[6],'500',550, 'KCC Longlife',callback)
    },
  ],cb)
}




async.series([
  createCategory,
  createMetric,
  createItems,
  creatItemInstances
],function(err, results) {
  if (err) {
      console.log('FINAL ERR: '+err);
  }
  else {
      console.log('BOOKInstances: '+iteminstances);
      
  }
  // All done, disconnect from database
  mongoose.connection.close();
})


