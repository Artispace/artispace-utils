// @flow
import find from "crocks/Maybe/find";
import compose from "crocks/helpers/compose";
import option from "crocks/pointfree/option";
import { isPropEqual } from "./pred";

// import isSameType from "crocks/predicates/isSameType";

// import Pred from "crocks/Pred";

// import equals from "crocks/pointfree/equals";

// export const isPropTrue = Pred(equals(true));

// console.log(isSameType(isPropTrue)(Pred))

type Maybetype = (
  prop: any
) => {
  map: () => any,
  concat: () => any,
  option: () => any
};

//findObject :: a -> Array<a> -> M a
export const findAny = (a: any) => (b: Array<any>): Maybetype =>
  find(isPropEqual(a), b);

export const findAnyC = (a: any, def: any): (any => boolean) =>
  compose(
    option(def),
    findAny(a)
  );
