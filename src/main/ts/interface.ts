import {
  IPromise,
  TPromiseExecutor,
} from '@qiwi/substrate-types/lib/es5/IPromise'

export enum TPromiseState {
  PENDING = 'Pending',
  FULFILLED = 'Fulfilled',
  REJECTED = 'Rejected',
}

export interface TInsideOutPromise<TValue = any, TReason = any> extends IPromise<TValue, TReason> {
  promise: IPromise,
  resolve: (value: TValue) => IPromise,
  reject: (reason: TReason) => IPromise,

  state: TPromiseState,
  status: TPromiseState,

  result: any,
  value: any,

  isRejected: () => boolean,
  isFulfilled: () => boolean,
  isPending: () => boolean,
  isResolved: () => boolean
}

export {
  IPromise,
  TPromiseExecutor,
}

export type TPromiseFactoryOpts = {
  executor?: TPromiseExecutor,
  Promise?: any
}

export type TNormalizedPromiseFactoryOpts = {
  executor: TPromiseExecutor,
  Promise: any
}

export interface IPromiseFactory {
  (executor?: TPromiseExecutor, opts?: TPromiseFactoryOpts): TInsideOutPromise<any, any>,
  (opts?: TPromiseFactoryOpts): TInsideOutPromise<any, any>,
  Promise?: any
}
