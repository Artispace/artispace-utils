const { getObjectC } = require("../ADTS/state");

const {
  chain,
  map,
  valueOf,
  option,
  safe,
  isArray,
  compose,
  Last,
  mconcatMap
} = require("crocks");

const nestObject = (obj, keys, v) =>
  keys.reduce((acc, curr, index, arr) => {
    if (index === arr.length - 1) {
      acc[curr] = v;
    } else {
      keys.shift();
      acc[curr] = nestObject(getObjectC(curr, {})(obj), keys, v);
    }
    return acc;
  }, obj);

const deleteNestedObjectProps = (obj, keys) =>
  keys.reduce((acc, curr, index, arr) => {
    if (index === arr.length - 1) {
      delete acc[curr];
    } else {
      keys.shift();
      acc[curr] = deleteNestedObjectProps(getObjectC(curr, {})(obj), keys);
    }
    return acc;
  }, obj);

const chooseLast = mconcatMap(Last, x => x);
const returnLastItem = compose(
  option(""),
  chain(valueOf),
  map(chooseLast),
  safe(isArray)
);

module.exports = {
  nestObject,
  deleteNestedObjectProps,
  returnLastItem
};
