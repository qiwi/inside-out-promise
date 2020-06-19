import {
  IPromise,
  IPromiseConstructor,
} from '@qiwi/substrate'

export type TPromiseExecutor<TValue = any, TReason = any> = (resolve: (value: TValue) => void, reject: (reason: TReason) => void) => void

declare module '@qiwi/substrate' {
  interface IPromiseConstructor<TValue = any, TReason = any> {
    readonly [Symbol.species]: any
    new (executor: TPromiseExecutor<TValue>): IPromise<TValue, TReason>
    all: (values: Iterable<IPromise<TValue, TReason>>) => IPromise<TValue[], TReason>
    allSettled: (values: Iterable<IPromise<TValue, TReason>>) => IPromise<any>
    any: (values: Iterable<IPromise<TValue, TReason>>) => IPromise<TValue, TReason>
    race: (values: Iterable<IPromise<TValue, TReason>>) => IPromise<TValue, TReason>
    reject: (reason?: TReason) => IPromise<TValue, TReason>
    resolve: (value?: TValue) => IPromise<TValue, TReason>
  }
}

export enum TPromiseState {
  PENDING = 'Pending',
  FULFILLED = 'Fulfilled',
  REJECTED = 'Rejected',
}

export interface TInsideOutPromise<TValue = any, TReason = any> extends IPromise<TValue, TReason> {
  promise: TInsideOutPromise<TValue, TReason>,
  resolve: (value?: TReason) => TInsideOutPromise<TValue, TReason>,
  reject: (reason?: TReason) => TInsideOutPromise<TValue, TReason>,
  then: (onSuccess?: (value: TValue) => any, onReject?: (reason: any) => any) => TInsideOutPromise<TValue, TReason>,
  catch: (onReject: (reason: any) => any) => TInsideOutPromise<TValue, TReason>,
  finally: (handler?: () => any) => TInsideOutPromise<TValue, TReason>,
  readonly [Symbol.toStringTag]: string,
  readonly [Symbol.species]: any,

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
  IPromiseConstructor,
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
