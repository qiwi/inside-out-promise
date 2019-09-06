import {
  TInsideOutPromise,
  TPromiseExecutor,
  IPromise,
} from './interface'

export const factory = () => {}

export class InsideOutPromise<TValue, TReason> implements TInsideOutPromise<TValue, TReason> {
  promise: IPromise
  resolve: (value: TValue) => IPromise
  reject: (reason: TReason) => IPromise

  constructor(executor?: TPromiseExecutor<TValue>) {
    let _resolve: Function
    let _reject: Function
    let done: boolean = false

    const finalize = (handler: Function) => (data?: any) => {
      if (!done) {
        done = true
        return handler(data)
      }
    }

    this.resolve = finalize((data?: any) => _resolve(data))
    this.reject = finalize((err?: any) => _reject(err))
    this.promise = new Promise((resolve, reject) => {
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
}
