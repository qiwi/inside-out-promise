import {factory, InsideOutPromise, TPromiseState} from '../../../target/es5'
import Bluebird from 'bluebird'

describe('factory', () => {
  afterAll(() => factory.Promise = Promise)

  it('returns proper instance', () => {
    const p = factory()

    expect(factory).toEqual(expect.any(Function))
    expect(p).toBeInstanceOf(InsideOutPromise)
    expect(p).toBeInstanceOf(Promise)
  })

  it('handles options argument', () => {
    expect(factory.Promise).toBe(Promise)
    const opts = {
      executor: jest.fn(),
    }
    const p = factory(opts)

    expect(p.promise).toBeInstanceOf(InsideOutPromise)
    expect(opts.executor).toHaveBeenNthCalledWith(1, expect.any(Function), expect.any(Function))
  })

  it('allows override default Promise impl', () => {
    expect(factory.Promise).toBe(Promise)

    factory.Promise = Bluebird
    const p = factory()

    expect(p.promise).toBeInstanceOf(Bluebird)
    expect(p).toBeInstanceOf(Bluebird)
    expect(InsideOutPromise.Promise).toBe(Bluebird)
  })
})

describe('InsideOutPromise', () => {
  describe('constructor', () => {
    it('returns proper instance', () => {
      const p = new InsideOutPromise()

      expect(p).toBeInstanceOf(InsideOutPromise)
      expect(p).toBeInstanceOf(Promise)
      expect(p.promise).toBeInstanceOf(Promise)
    })

    it('invokes executor if passed', () => {
      const fn = jest.fn()
      const p = new InsideOutPromise(fn)

      expect(fn).toHaveBeenNthCalledWith(1, expect.any(Function), expect.any(Function))
      expect(p).toBeInstanceOf(InsideOutPromise)
    })
  })
  describe('proto', () => {
    it('#then returns a new promise', () => {
      const p = new InsideOutPromise()
      const n = p.then()

      expect(n).toBeInstanceOf(Promise)
      expect(n).not.toBe(p.promise)
    })

    it('#catch returns a new promise', () => {
      const p = new InsideOutPromise()
      const n = p.catch(console.error)

      expect(n).toBeInstanceOf(Promise)
      expect(n).not.toBe(p.promise)
    })

    it('#resolve resolves the promise and returns its ref as a result', async () => {
      const data = 'foo'
      const p = new InsideOutPromise()
      const n = p.resolve(data)
      const resolved = await p.promise

      expect(p.state).toBe(TPromiseState.FULFILLED)
      expect(p.status).toBe(TPromiseState.FULFILLED)
      expect(p.result).toBe(data)
      expect(p.value).toBe(data)
      expect(p.isPending()).toBeFalsy()
      expect(p.isRejected()).toBeFalsy()
      expect(p.isFulfilled()).toBeTruthy()
      expect(p.isResolved()).toBeTruthy()
      expect(n).toBe(p.promise)
      expect(resolved).toBe(data)
    })
  })
})
