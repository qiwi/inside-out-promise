import {
  TInsideOutPromise,
  TPromiseExecutor,
  IPromise,
  IPromiseFactory,
} from './interface'

export const factory: IPromiseFactory = (executor?: TPromiseExecutor): InsideOutPromise<any, any> => {
  return new InsideOutPromise(executor)
}

Object.defineProperty(factory, 'Promise', {
  get() { return InsideOutPromise.Promise },
  set(P) { InsideOutPromise.Promise = P }
})

export class InsideOutPromise<TValue, TReason> implements TInsideOutPromise<TValue, TReason> {
  promise: IPromise
  resolve: (value: TValue) => IPromise
  reject: (reason: TReason) => IPromise

  constructor(executor?: TPromiseExecutor<TValue>) {
    let _resolve: Function
    let _reject: Function
    let done: boolean = false

    const finalize = (handler: Function) => (data?: any): IPromise  => {
      if (!done) {
        done = true
        handler(data)
      }

      return this.promise
    }

    this.resolve = finalize((data?: any) => _resolve(data))
    this.reject = finalize((err?: any) => _reject(err))
    this.promise = new InsideOutPromise.Promise((resolve, reject) => {
      _resolve = resolve
      _reject = reject

      executor && executor(resolve, reject)
    })
  }
  then(onSuccess?: (value: TValue) => any, onReject?: (reason: TReason) => any): IPromise {
    return this.promise.then(onSuccess, onReject)
  }
  catch(onReject: (reason: TReason) => any): IPromise {
    return this.promise.catch(onReject)
  }

  static Promise = Promise
}
