import {
  IPromise,
  TPromiseExecutor
} from '@qiwi/substrate-types/lib/es5/IPromise'


export interface TInsideOutPromise<TValue = any, TReason = any> extends IPromise<TValue, TReason> {
  resolve: (value: TValue) => IPromise,
  reject: (reason: TReason) => IPromise,
  promise: IPromise
}

export {
  IPromise,
  TPromiseExecutor
}

export interface IPromiseFactory {
  (executor?: TPromiseExecutor): TInsideOutPromise<any, any>
  Promise?: any
}
