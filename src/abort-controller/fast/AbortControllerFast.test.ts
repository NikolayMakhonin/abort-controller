/* eslint-disable no-self-assign,no-new,new-cap */
import {createAbortControllerEqualsTest} from '../test/createAbortControllerEqualsTest'
import {AbortControllerFast} from './AbortControllerFast'

describe('abort-controller > AbortController', function () {
  createAbortControllerEqualsTest({
    _this             : this,
    behavior          : true,
    equalsConstructors: true,
    equalsInstances   : true,
    AbortSignal1      : null,
    AbortController1  : (() => new AbortControllerFast()) as any,
    AbortSignal2      : null,
    AbortController2  : AbortController,
  })
})
