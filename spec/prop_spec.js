import prop    from '../src/prop.js'
import install from 'jasmine-es6'
install();

describe('prop', () => {
  let props = { a: 1, b: { c: "2", d: "3", e: [4, 5] }, f: [ 6, { g: 7 } ] }
  let obj   = {}
  let subject

  beforeEach(() => subject = prop.def(obj, props))

  describe('.def', () => {
    it('returns first arg', () => {
      expect(prop.def(obj, {})).toBe(obj)
    })

    it('defines __props__ as not enumerable, not configurable and writable', () => {
      let descriptor = Object.getOwnPropertyDescriptor(subject, '__props__')

      expect(descriptor.enumerable).toBeFalsy()
      expect(descriptor.configurable).toBeFalsy()
      expect(descriptor.writable).toBeTruthy()
    })

    it('assign to __props__ a copy of second arg', () => {
      expect(subject.__props__).toEqual(props)
      expect(subject.__props__).not.toBe(props)
    })

    it('adds to first arg all second arg propreties with get for respective __prop__ value', () => {
      expect(obj).toEqual(props)
    })

    it('the first arg is not equal to second arg', () => {
      expect(obj).not.toBe(props)
    })

    it('adds set descriptor', () => {
      obj.a      = 2
      obj.b.e[1] = 10
      obj.f[1].g = 14

      expect(obj).toEqual({ a: 2, b: { c: "2", d: "3", e: [4, 10] }, f: [ 6, { g: 14 } ] })
    })
  })
})
