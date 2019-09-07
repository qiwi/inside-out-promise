import {
  TInsideOutPromise,
  TPromiseExecutor,
  IPromise,
  IPromiseFactory,
  TPromiseState,
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
  state: TPromiseState = TPromiseState.PENDING

  constructor(executor?: TPromiseExecutor<TValue>) {
    let _resolve: Function
    let _reject: Function

    const finalize = (handler: Function, state: TPromiseState) => (data?: any): IPromise  => {
      if (this.isPending()) {
        this.state = state
        handler(data)
      }

      return this.promise
    }

    this.resolve = finalize((data?: any) => _resolve(data), TPromiseState.FULFILLED)
    this.reject = finalize((err?: any) => _reject(err), TPromiseState.REJECTED)
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

  isPending(): boolean {
    return this.state === TPromiseState.PENDING
  }

  isFulfilled(): boolean {
    return this.state === TPromiseState.FULFILLED
  }

  isRejected(): boolean {
    return this.state === TPromiseState.REJECTED
  }

  static Promise = Promise
}
