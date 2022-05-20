export function assertThis(_this: object, _class: any) {
  if (!_this || _this.constructor.prototype === _this) {
    const error = new TypeError(`Value of "this" must be of type ${_class.name}`)
    ;(error as any).code = 'ERR_INVALID_THIS'
    throw error
  }
}

export function getLastPrototype(obj) {
  let prev = obj
  while (obj.constructor !== Object) {
    prev = obj
    obj = Object.getPrototypeOf(obj)
  }
  return prev
}

export function setLastPrototypeOf(obj, prototype) {
  const _obj = getLastPrototype(obj)
  Object.setPrototypeOf(_obj, prototype)
}
