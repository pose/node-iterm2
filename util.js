
exports.toArray = function (nsArray) {
  var count = nsArray('count');
  var a = [];

  for (var i = 0; i < count; i++) {
    a.push(nsArray('objectAtIndex', i));
  }

  return a;
};
