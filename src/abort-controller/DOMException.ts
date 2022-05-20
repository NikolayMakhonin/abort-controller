const _DOMException = typeof DOMException !== 'undefined'
  ? DOMException
  : class DOMException {
    readonly message: string
    readonly name: string
    constructor(message?: string, name?: string) {
      this.message = message
      this.name = name
    }
  }

export { _DOMException as DOMException }
