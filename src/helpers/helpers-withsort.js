var isUndefined = function(value) {
  return value === 'undefined' || toString.call(value) === '[object Function]' || (value.hash != null);
};

module.exports.register = function(Handlebars, options) {

  Handlebars.registerHelper('withSort', function(array, field, options) {
    
    var order = options.hash.order === 'desc' ? -1 : 1;

    var getDescendantProp, item, result, i, len;
    getDescendantProp = function (obj, desc) {
      var arr;
      arr = desc.split(".");
      while (arr.length && (obj = obj[arr.shift()])) {
        continue;
      }
      return obj;
    };
    result = '';
    if (isUndefined(field)) {
      options = field;
      array = array.sort();
      for (i = 0, len = array.length; i < len; i++) {
        item = array[i];
        result += options.fn(item);
      }
    } else {
      array = array.sort(function (a, b) {
        var aProp, bProp;
        aProp = getDescendantProp(a, field);
        bProp = getDescendantProp(b, field);
        if (aProp > bProp) {
          return 1*order;
        } else {
          if (aProp < bProp) {
            return -1*order;
          }
        }
        return 0;
      });
      for (item in array) {
        result += options.fn(array[item]);
      }
    }
    return result;
  });

};

