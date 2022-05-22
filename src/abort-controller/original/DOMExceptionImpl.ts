import {IDOMException} from './contracts'

class DOMException extends Error {
  constructor(message?: string, name?: string) {
    super(message)
    this.name = name
  }
}

export { DOMException as DOMExceptionImpl }
