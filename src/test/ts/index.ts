import { factory, InsideOutPromise } from '../../main/ts'

describe('factory', () => {
  it('is a function', () => {
    expect(factory).toEqual(expect.any(Function))
  })
})

describe('InsideOutPromise', () => {
  describe('constructor', () => {
    it('returns proper instance', () => {
      const p = new InsideOutPromise()

      expect(p).toBeInstanceOf(InsideOutPromise)
      expect(p.promise).toBeInstanceOf(Promise)
    })

    it('invokes executor if passed', () => {
      const fn = jest.fn()
      new InsideOutPromise(fn)

      expect(fn).toHaveBeenNthCalledWith(1, expect.any(Function), expect.any(Function))
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

      expect(n).toBe(p.promise)
      expect(resolved).toBe(data)
    })

    it('#reject rejects the promise and returns its ref as a result', async done => {
      const reason = new Error('bar')
      const p = new InsideOutPromise()
      const n = p.reject(reason)
      try {
        await p.promise
      } catch (err) {
        expect(err).toBe(reason)
        expect(n).toBe(p.promise)

        done()
      }
    })
  })
  // describe('static', () => {})
})
