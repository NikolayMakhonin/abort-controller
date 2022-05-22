/* eslint-disable no-self-assign,guard-for-in */

export const processVersion = typeof process !== 'undefined' ? process.version : void 0
export const isLatestNodeVersion = /v?18\./.test(processVersion)

export const ERROR_UNDEFINED = Symbol('undefined')
export function getError(func: () => void) {
  let error
  try {
    func()
  } catch (err) {
    error = err
    if (typeof error === 'undefined') {
      error = ERROR_UNDEFINED
    }
  }
  return error
}

function concatMessages(...messages: string[]) {
  return messages.filter(o => o).join('; ')
}

const prevObjectsGlobalActual = new Set()
const prevObjectsGlobalExpected = new Set()

type AssertValue = {
  value: any
  prevObjects: Set<any>
}

type AssertValuePrevCurrent = {
  prev: AssertValue
  current: AssertValue
}

type AssertValues = {
  actual: AssertValuePrevCurrent,
  expected: AssertValuePrevCurrent,
}

function assertValuesClone(values: AssertValues): AssertValues {
  return {
    actual: {
      prev: {
        value      : values.actual.prev.value,
        prevObjects: values.actual.prev.prevObjects,
      },
      current: {
        value      : values.actual.current.value,
        prevObjects: values.actual.current.prevObjects,
      },
    },
    expected: {
      prev: {
        value      : values.expected.prev.value,
        prevObjects: values.expected.prev.prevObjects,
      },
      current: {
        value      : values.expected.current.value,
        prevObjects: values.expected.current.prevObjects,
      },
    },
  }
}

function createAssertValues(actualPrev, actualCurrent, expectedPrev, expectedCurrent) {
  return {
    actual: {
      prev: {
        value      : actualPrev,
        prevObjects: new Set(),
      },
      current: {
        value      : actualCurrent,
        prevObjects: new Set(),
      },
    },
    expected: {
      prev: {
        value      : expectedPrev,
        prevObjects: new Set(),
      },
      current: {
        value      : expectedCurrent,
        prevObjects: new Set(),
      },
    },
  }
}

function isPrimitive(value) {
  return value == null
    || typeof value === 'string'
    || typeof value === 'number'
    || typeof value === 'boolean'
    || typeof value === 'bigint'
}

function normalizeValue(value) {
  if (typeof value === 'string') {
    if (value.startsWith('Cannot assign to read only property')) {
      return value.match(/Cannot assign to read only property '.*' of function/)?.[0] || value
    }
  } else if (value instanceof Error) {
    if (
      value.constructor.prototype === value
      || value.message.startsWith('TypeError: Value of "this" must be of DOMException')
    ) {
      return void 0
    }
  }
  return value
}

function assertEqualsPrimitives(actual: AssertValue, expected: AssertValue, message: string) {
  if (isPrimitive(actual.value) || isPrimitive(expected.value)) {
    if (actual.value !== expected.value) {
      console.error(message)
      assert.strictEqual(actual.value, expected.value)
    }
    assert.strictEqual(actual.prevObjects.has(actual.value), false, message)
    assert.strictEqual(expected.prevObjects.has(expected.value), false, message)
    assert.strictEqual(prevObjectsGlobalActual.has(actual.value), false, message)
    assert.strictEqual(prevObjectsGlobalExpected.has(expected.value), false, message)
    return true
  }
  return false
}

function assertEqualsValues(values: AssertValues, message: string) {
  values = assertValuesClone(values)
  values.actual.prev.value = normalizeValue(values.actual.prev.value)
  values.actual.current.value = normalizeValue(values.actual.current.value)
  values.expected.prev.value = normalizeValue(values.expected.prev.value)
  values.expected.current.value = normalizeValue(values.expected.current.value)

  if (
    assertEqualsPrimitives(values.actual.prev, values.expected.prev, message)
    && assertEqualsPrimitives(values.actual.current, values.expected.current, message)
  ) {
    return
  }

  assertEqualsTypeOf(values, message)

  assert.strictEqual(
    values.actual.prev.value === values.actual.current.value,
    values.expected.prev.value === values.expected.current.value,
    message,
  )

  assert.strictEqual(
    values.actual.prev.prevObjects.has(values.actual.prev.value),
    values.expected.prev.prevObjects.has(values.expected.prev.value),
    message,
  )

  assert.strictEqual(
    values.actual.current.prevObjects.has(values.actual.current.value),
    values.expected.current.prevObjects.has(values.expected.current.value),
    message,
  )

  assert.strictEqual(
    values.actual.prev.prevObjects.has(values.actual.prev.value)
    === values.actual.current.prevObjects.has(values.actual.current.value),
    values.expected.prev.prevObjects.has(values.expected.prev.value)
    === values.expected.current.prevObjects.has(values.expected.current.value),
    message,
  )

  if (values.expected.current.prevObjects.has(values.expected.current.value)) {
    return
  }
  if (!isPrimitive(values.actual.prev.value)) {
    values.actual.prev.prevObjects.add(values.actual.prev.value)
  }
  if (!isPrimitive(values.actual.current.value)) {
    values.actual.current.prevObjects.add(values.actual.current.value)
  }
  if (!isPrimitive(values.expected.prev.value)) {
    values.expected.prev.prevObjects.add(values.expected.prev.value)
  }
  if (!isPrimitive(values.expected.current.value)) {
    values.expected.current.prevObjects.add(values.expected.current.value)
  }

  assertEqualsProperties(values, message)
}

function assertEqualsTypeOf(values: AssertValues, message: string) {
  message = concatMessages(message, 'typeof')
  const clone = assertValuesClone(values)
  clone.actual.prev.value = typeof clone.actual.prev.value
  clone.actual.current.value = typeof clone.actual.current.value
  clone.expected.prev.value = typeof clone.expected.prev.value
  clone.expected.current.value = typeof clone.expected.current.value
  assertEqualsValues(clone, message)
}

function assertEqualsProperty(values: AssertValues, key, message: string) {
  message = concatMessages(message, 'key=' + key)

  const messageIn = concatMessages(message, 'in')
  let clone = assertValuesClone(values)
  clone.actual.prev.value = clone.actual.prev.value && key in clone.actual.prev.value
  clone.actual.current.value = clone.actual.current.value && key in clone.actual.current.value
  clone.expected.prev.value = clone.expected.prev.value && key in clone.expected.prev.value
  clone.expected.current.value = clone.expected.current.value && key in clone.expected.current.value
  assertEqualsValues(clone, messageIn)

  const messageGetError = concatMessages(message, 'get error')
  clone = assertValuesClone(values)
  clone.actual.prev.value = clone.actual.prev.value && key in clone.actual.prev.value
    ? getError(() => {
      return clone.actual.prev.value[key]
    })
    : void 0
  clone.actual.current.value = clone.actual.current.value && key in clone.actual.current.value
    ? getError(() => {
      return clone.actual.current.value[key]
    })
    : void 0
  clone.expected.prev.value = clone.expected.prev.value && key in clone.expected.prev.value
    ? getError(() => {
      return clone.expected.prev.value[key]
    })
    : void 0
  clone.expected.current.value = clone.expected.current.value && key in clone.expected.current.value
    ? getError(() => {
      return clone.expected.current.value[key]
    })
    : void 0
  assertEqualsValues(clone, messageGetError)

  if (typeof clone.expected.current.value !== 'undefined') {
    return
  }

  const messageGet = concatMessages(message, 'get')
  clone = assertValuesClone(values)
  clone.actual.prev.value = clone.actual.prev.value?.[key]
  clone.actual.current.value = clone.actual.current.value?.[key]
  clone.expected.prev.value = clone.expected.prev.value?.[key]
  clone.expected.current.value = clone.expected.current.value?.[key]
  assertEqualsValues(clone, messageGet)

  const messageSet = concatMessages(message, 'set error')
  clone = assertValuesClone(values)
  clone.actual.prev.value = clone.actual.prev.value && key in clone.actual.prev.value
    ? getError(() => {
      clone.actual.prev.value[key] = clone.actual.prev.value[key]
    })
    : void 0
  clone.actual.current.value = clone.actual.current.value && key in clone.actual.current.value
    ? getError(() => {
      clone.actual.current.value[key] = clone.actual.current.value[key]
    })
    : void 0
  clone.expected.prev.value = clone.expected.prev.value && key in clone.expected.prev.value
    ? getError(() => {
      clone.expected.prev.value[key] = clone.expected.prev.value[key]
    })
    : void 0
  clone.expected.current.value = clone.expected.current.value && key in clone.expected.current.value
    ? getError(() => {
      clone.expected.current.value[key] = clone.expected.current.value[key]
    })
    : void 0
  assertEqualsValues(clone, messageSet)
}

function filterKey(object, key: string) {
  if (object instanceof Event) {
    return key !== 'isTrusted'
      && key !== 'timeStamp'
  }
  if (object instanceof Error) {
    return key !== 'stack'
      && !/_ERR$/.test(key)
  }

  if (typeof Node !== 'undefined' && object instanceof Node) {
    return key === 'aborted'
      || key === 'reason'
      || key === 'onabort'
  }

  return true
}

function getAdditionalKeys(value): string[] {
  const keys: string[] = ['constructor'] //, 'prototype']
  if (typeof value === 'function') {
    keys.push('name')
  }
  const className = value?.constructor?.name
  if (value instanceof Error || /Error/.test(className)) {
    keys.push('message')
    keys.push('code')
  }
  if (className === 'AbortController') {
    keys.push('signal')
    keys.push('abort')
  } else if (className === 'AbortSignal') {
    keys.push('aborted')
    keys.push('reason')
    keys.push('throwIfAborted')
    keys.push('onabort')
    keys.push('addEventListener')
    keys.push('removeEventListener')
    keys.push('dispatchEvent')
  }

  return keys
}

function assertEqualsProperties(values: AssertValues, message: string) {
  const keys = new Set<string>()
  getAdditionalKeys(values.expected.current.value).forEach(key => {
    keys.add(key)
  })
  getAdditionalKeys(values.actual.current.value).forEach(key => {
    keys.add(key)
  })
  for (const key in values.expected.current.value) {
    keys.add(key)
  }
  for (const key in values.actual.current.value) {
    keys.add(key)
  }
  Array.from(keys).filter(key => filterKey(values.expected.current.value, key))
    .forEach(key => {
      assertEqualsProperty(values, key, message)
    })

  const clone = assertValuesClone(values)
  clone.actual.prev.value = clone.actual.prev.value && Object.keys(clone.actual.prev.value)
  clone.actual.current.value = clone.actual.current.value && Object.keys(clone.actual.current.value)
  clone.expected.prev.value = clone.expected.prev.value && Object.keys(clone.expected.prev.value)
  clone.expected.current.value = clone.expected.current.value && Object.keys(clone.expected.current.value)
  assertEqualsValues(values, concatMessages(message, 'keys'))
}

function createAssertEquals() {
  let actualPrev
  let expectedPrev
  return function assertEquals(actual, expected, message: string) {
    const values = createAssertValues(actualPrev, actual, expectedPrev, expected)
    assertEqualsValues(values, message)
    actualPrev = actual
    expectedPrev = expected
  }
}

export function test<TState>({
  repeat,
  message,
  actual,
  expected,
  func,
}: {
  repeat: number,
  message,
  actual: TState,
  expected: TState,
  func: (state: TState) => any
}) {
  const assertEquals = createAssertEquals()
  for (let i = 0; i < repeat; i++) {
    const actualValue = func(actual)
    const expectedValue = func(expected)
    assertEquals(actualValue, expectedValue, concatMessages(message, i + ''))
  }
}
