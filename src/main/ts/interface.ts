import {
  IPromise,
  TPromiseExecutor,
} from '@qiwi/substrate-types/lib/es5/IPromise'

export enum TPromiseState {
  PENDING = 'Pending',
  FULFILLED = 'Fulfilled',
  REJECTED = 'Rejected',
}

export interface TInsideOutPromise<TValue = any, TReason = never> extends IPromise<TValue, TReason> {
  promise: TInsideOutPromise<TValue, TReason>,
  resolve: (value: TValue) => TInsideOutPromise<TValue, TReason>,
  reject: (reason: any) => TInsideOutPromise<TValue, TReason>,
  then: (onSuccess?: (value: TValue) => any, onReject?: (reason: any) => any) => TInsideOutPromise<TValue, TReason>,
  catch: (onReject: (reason: any) => any) => TInsideOutPromise<TValue, TReason>,
  finally: (handler: () => any) => TInsideOutPromise<TValue, TReason>,
  readonly [Symbol.toStringTag]: string,

  state: TPromiseState,
  status: TPromiseState,

  result: any,
  value: any,
  reason: any,

  isRejected: () => boolean,
  isFulfilled: () => boolean,
  isPending: () => boolean,
  isResolved: () => boolean,
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
  (executor?: TPromiseExecutor, opts?: TPromiseFactoryOpts): TInsideOutPromise,
  (opts?: TPromiseFactoryOpts): TInsideOutPromise,
  Promise?: any
}
