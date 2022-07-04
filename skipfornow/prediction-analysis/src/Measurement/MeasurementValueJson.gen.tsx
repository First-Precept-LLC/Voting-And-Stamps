/* TypeScript file generated from MeasurementValueJson.rei by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as MeasurementValueJsonBS__Es6Import from './MeasurementValueJson.bs';
const MeasurementValueJsonBS: any = MeasurementValueJsonBS__Es6Import;

import type {Json_t as Js_Json_t} from './Js.gen';

import type {t as MeasurementValue_t} from './MeasurementValue.gen';

// tslint:disable-next-line:interface-over-type-literal
export type t = Js_Json_t;

export const toMeasurementValue: (_1:Js_Json_t) => 
    { tag: "Ok"; value: MeasurementValue_t }
  | { tag: "Error"; value: string } = function (Arg1: any) {
  const result = MeasurementValueJsonBS.toMeasurementValue(Arg1);
  return result.TAG===0
    ? {tag:"Ok", value:result._0}
    : {tag:"Error", value:result._0}
};
