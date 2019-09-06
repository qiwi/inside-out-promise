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
  // describe('proto', () => {})
  // describe('static', () => {})
})
