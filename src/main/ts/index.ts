import {
  TInsideOutPromise,
  TPromiseExecutor,
  IPromiseFactory,
  TPromiseState,
  TPromiseFactoryOpts,
  TNormalizedPromiseFactoryOpts,
} from './interface'
import {noop, setProto} from './util'

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

  state: TPromiseState = TPromiseState.PENDING
  result: any

  private _resolve: any
  private _reject: any

  constructor(executor?: TPromiseExecutor<TValue> | TPromiseFactoryOpts, opts?: TPromiseFactoryOpts) {
    let _resolve: any = undefined
    let _reject: any = undefined
    const _opts = InsideOutPromise.normalizeOpts(executor, opts)
    const _P: PromiseConstructor = _opts.Promise
    const exec: TPromiseExecutor = _opts.executor
    const fake = new _P((resolve, reject) => {
      _resolve = resolve
      _reject = reject

      exec(resolve, reject)
    }).then(v => {
      Object.assign(fake, {
        result: v,
        state: TPromiseState.FULFILLED,
      })

      return v
    }, e => {
      Object.assign(fake, {
        result: e,
        state: TPromiseState.REJECTED,
      })

      throw e
    })

    Object.assign(fake, {
      state: TPromiseState.PENDING,
      _P,
      _resolve,
      _reject,
    })

    return setProto(fake, this.constructor.prototype)
  }

  get promise(): InsideOutPromise<any, any> {
    return this
  }

  get status(): TPromiseState {
    return this.state
  }

  get value(): any {
    return this.result
  }

  resolve(value: any): InsideOutPromise<any, any> {
    this._resolve(value)
    return this
  }

  reject(reason: any): InsideOutPromise<any, any> {
    this._reject(reason)
    return this
  }

  then(onSuccess?: (value: TValue) => any, onReject?: (reason: TReason) => any): InsideOutPromise<any, any> {
    return InsideOutPromise.contextify(this, 'then', onSuccess, onReject)
  }

  catch(onReject: (reason: TReason) => any): InsideOutPromise<any, any> {
    return InsideOutPromise.contextify(this, 'catch', onReject)
  }

  finally(handler: () => any): InsideOutPromise<any, any> {
    // @ts-ignore
    return this._P.prototype.finally
      ? InsideOutPromise.contextify(this, 'finally', handler)
      : this.then(handler).catch(handler)
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

  private static contextify(ref: any, method: string, ...args: any[]): InsideOutPromise<any, any> {
    return Object.assign(setProto(ref._P.prototype[method].call(ref, ...args), ref.constructor.prototype), ref)
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
