/* eslint-disable no-self-assign,no-new,new-cap */
import {AbortControllerImpl} from './AbortControllerImpl'
import {AbortSignalImpl} from './AbortSignalImpl'
import {isLatestNodeVersion} from '../test/helpers'
import {createAbortControllerEqualsTest} from '../test/createAbortControllerEqualsTest'

describe('abort-controller > AbortController', function () {
  createAbortControllerEqualsTest({
    _this             : this,
    behavior          : true,
    equalsConstructors: true,
    equalsInstances   : true,
    AbortSignal1      : AbortSignalImpl,
    AbortController1  : AbortControllerImpl,
    AbortSignal2      : isLatestNodeVersion ? AbortSignal : AbortSignalImpl,
    AbortController2  : isLatestNodeVersion ? AbortController : AbortControllerImpl,
  })
})
