import { calcPerformance } from 'rdtsc';

// import {AbortControllerImpl} from './AbortControllerImpl'
// import {isLatestNodeVersion} from '../test/helpers'
// import {AbortControllerClass} from '../test/contracts'
// import {IAbortController} from './contracts'
describe('abort-controller > AbortController', function () {
    this.timeout(600000);
    // const AbortController1 = AbortControllerImpl
    // const AbortController2 = isLatestNodeVersion ? AbortControllerClass : AbortControllerImpl
    const onAbort1 = o => o;
    const onAbort2 = o => o;
    const onAbort3 = o => o;
    // let abortController1: IAbortController
    // let abortController2: IAbortController
    let set;
    it('constructor', function () {
        const result = calcPerformance(10000, () => {
        }, () => {
            set = new Set();
        }, () => {
            set.add(onAbort1);
            set.add(onAbort2);
            set.add(onAbort3);
            set.forEach(o => o('abort'));
            set.delete(onAbort1);
            set.delete(onAbort2);
            set.delete(onAbort3);
        });
        console.log(result);
    });
});
