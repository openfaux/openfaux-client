var ss = require('sdk/simple-storage');
api.storage = {};

var storage = api.storage.local = api.storage.sync = {};

storage.get = function(query, cb) {
  var result = {};
  var keys = [];
  var defaultValues = [];

  if (typeof query === 'string')
    keys.push(query);
  else if (Array.isArray(query)) {
    keys = query;
    keys.forEach(function(key) {
      if (typeof key !== 'string')
        throw new Error('Invalid key ' + key + ' specified. Expected string but was ' + typeof key);
    });
  }
  else if (typeof query === 'object') {
    for (let key in query){
      keys.push(key);
      defaultValues.push(query[key]);
    }
  }
  else if (query === null){
    //return entire storage object
  }
  else {
    throw new Error('Illegal arguments. Expected are string, array, or object but was ' + typeof query);
  }

  for (var i = keys.length - 1; i >= 0; i--) {
    var key = keys[i];
    var defaultValue = defaultValues[i];

    result[key] = ss.storage[key] || defaultValue;
  }

  cb(result);
};

storage.set = function(obj, cb) {
  if (typeof obj !== 'object'){
    throw new Error('Illegal argument. Expected key/value pair dictionary but was' + typeof obj);
  }

  var change = {};

  for (var key in obj){
    change[key] = {
      oldValue: ss.storage[key],
      newValue: obj[key]
    };

    ss.storage[key] = obj[key];
  }

  storage.onChanged.listeners.forEach(function(fn) {
    setTimeout(function() {
      fn(change);
    }, 0);
  });

  cb();
};

storage.remove = function(query, cb) {
  if (typeof query === string) 
    delete ss.storage[query];
  else if (Array.isArray(query)){
    query.forEach(function(key) {
      delete ss.storage[key];
    });
  }
  else {
    throw new Error('Illegal argument ' + query + '. Expected string or array but was ' + typeof key);
  }

  cb();
};

storage.onChanged = {
  listeners: [],
};

storage.onChanged.addListener = function(cb) {
  this.listeners.push(cb);
};