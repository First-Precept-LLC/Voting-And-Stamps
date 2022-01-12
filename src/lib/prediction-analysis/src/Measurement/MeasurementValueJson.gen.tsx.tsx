/* TypeScript file generated from MeasurementValueJson.rei by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const MeasurementValueJsonBS = require('./MeasurementValueJson.bs');

import {Json_t as Js_Json_t} from './Js.gen.tsx';

import {t as MeasurementValue_t} from './MeasurementValue.gen.tsx';

// tslint:disable-next-line:interface-over-type-literal
export type t = Js_Json_t;

export const toMeasurementValue: (_1:Js_Json_t) => 
    { tag: "Ok"; value: MeasurementValue_t }
  | { tag: "Error"; value: string } = function (Arg1: any) {
  const result = MeasurementValueJsonBS.toMeasurementValue(Arg1);
  return result.tag===0
    ? {tag:"Ok", value:result[0]}
    : {tag:"Error", value:result[0]}
};
