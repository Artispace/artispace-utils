export {
  getBoolean,
  getBooleanC,
  getNumber,
  getNumberC,
  getObject,
  getObjectC,
  getNonEmptyObject,
  getNonEmptyObjectC,
  getArray,
  getArrayC,
  getNonEmptyArray,
  getNonEmptyArrayC,
  getString,
  getStringC,
  getNonEmptyString,
  getNonEmptyStringC,
  getFunction,
  getFunctionC
} from "./ADTS/state.js";

export {
  doesPropExist,
  doesPropExistC,
  isObjectPropTrue,
  isObjectPropTrueC,
  isPropString,
  isPropNonEmptyString,
  isPropNonEmptyStringC,
  isPropStringC,
  isPropTrue,
  isPropTrueC,
  isPropEqual,
  isPropEqualC
} from "./ADTS/pred";

export {
  findString,
  findStringC,
  findNumber,
  findNumberC,
  findObject,
  findObjectC,
  findArray,
  findArrayC
} from "./ADTS/maybe";
