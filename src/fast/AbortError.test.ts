import {AbortError} from './AbortError'

describe('AbortError', function () {
  class Class1 { }
  class Class2 extends Class1 { }

  it('instanceof simple class', function () {
    const obj = new Class2()
    assert.ok(obj instanceof Class2)
    assert.ok(obj instanceof Class1)
  })

  it('instanceof AbortError', function () {
    const obj = new AbortError()
    assert.ok(obj instanceof AbortError)
    assert.ok(obj instanceof Error)
  })
})
