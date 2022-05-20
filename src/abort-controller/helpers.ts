export function assertThis(_this: object, _class: any) {
  if (!_this || _this.constructor.prototype === _this) {
    const error = new TypeError(`Value of "this" must be of type ${_class.name}`)
    ;(error as any).code = 'ERR_INVALID_THIS'
    throw error
  }
}
