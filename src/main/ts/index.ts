import {
  TInsideOutPromise,
  TPromiseExecutor,
  IPromise,
  IPromiseFactory,
  TPromiseState,
  TPromiseFactoryOpts,
  TNormalizedPromiseFactoryOpts,
} from './interface'
import {noop, alias} from './util'

export * from './interface'

export const factory: IPromiseFactory = (executor?: TPromiseExecutor | TPromiseFactoryOpts, opts?: TPromiseFactoryOpts): InsideOutPromise<any, any> => {
  return new InsideOutPromise(executor, opts)
}

Object.defineProperty(factory, 'Promise', {
  get() {
    return InsideOutPromise.Promise
  },
  set(P) {
    Object.setPrototypeOf(InsideOutPromise.prototype, P.prototype)
    InsideOutPromise.Promise = P
  },
})

export class InsideOutPromise<TValue, TReason> implements TInsideOutPromise<TValue, TReason> {

  promise: IPromise
  resolve: (value: TValue) => IPromise
  reject: (reason: TReason) => IPromise
  state: TPromiseState = TPromiseState.PENDING
  // @ts-ignore it's a getter
  status: TPromiseState
  result: any
  value: any

  constructor(executor?: TPromiseExecutor<TValue> | TPromiseFactoryOpts, opts?: TPromiseFactoryOpts) {
    let _resolve: Function
    let _reject: Function
    const _opts = InsideOutPromise.normalizeOpts(executor, opts)
    const P: PromiseConstructor = _opts.Promise
    const exec: TPromiseExecutor = _opts.executor
    const chain = (handler: Function) => (data?: any): IPromise => {
      handler(data)
      return this.promise
    }

    this.resolve = chain((data?: any) => _resolve(data))
    this.reject = chain((err?: any) => _reject(err))
    this.promise = new P((resolve, reject) => {
      _resolve = resolve
      _reject = reject
      exec(resolve, reject)
    }).then(v => {
      this.result = v
      this.state = TPromiseState.FULFILLED
      return v
    }, e => {
      this.result = e
      this.state = TPromiseState.REJECTED
      throw e
    })

    alias(this, 'state', 'status')
    alias(this, 'result', 'value')
  }

  then(onSuccess?: (value: TValue) => any, onReject?: (reason: TReason) => any): IPromise {
    return this.promise.then(onSuccess, onReject)
  }

  catch(onReject: (reason: TReason) => any): IPromise {
    return this.promise.catch(onReject)
  }

  finally(handler: () => any) {
    return this.promise.finally
      ? this.promise.finally(handler)
      : this.promise.then(handler).catch(handler)
  }

  isPending(): boolean {
    return this.state === TPromiseState.PENDING
  }

  isFulfilled(): boolean {
    return this.state === TPromiseState.FULFILLED
  }

  isRejected(): boolean {
    return this.state === TPromiseState.REJECTED
  }

  isResolved(): boolean {
    return !this.isPending()
  }

  static normalizeOpts(executor?: TPromiseExecutor | TPromiseFactoryOpts, opts: TPromiseFactoryOpts = {}): TNormalizedPromiseFactoryOpts {
    const mixin = typeof executor === 'function'
      ? {
        ...opts,
        executor,
      }
      : executor || opts

    return {
      Promise: InsideOutPromise.Promise,
      executor: noop,
      ...mixin,
    }
  }

  static Promise = Promise

}

// NOTE proto chaining
factory.Promise = Promise
