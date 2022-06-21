import { __awaiter } from 'tslib';
import { p as processVersion, i as isLatestNodeVersion, t as test, g as getError } from './helpers.mjs';
import { createTestVariants } from '@flemist/test-variants';
import { A as AbortError } from './AbortError.mjs';

function createAbortControllerEqualsTest({ _this, behavior, equalsConstructors, equalsInstances, AbortSignal1, AbortController1, AbortSignal2, AbortController2, }) {
    _this.timeout(300000);
    before(() => {
        console.log('process.version = ' + processVersion);
        console.log('isLatestNodeVersion = ' + isLatestNodeVersion);
        if (AbortController1) {
            test({
                repeat: 2,
                message: 'AbortController',
                actual: AbortController1,
                expected: AbortController1,
                func: (o) => new o(),
            });
        }
        if (AbortController2) {
            test({
                repeat: 2,
                message: 'AbortController',
                actual: AbortController2,
                expected: AbortController2,
                func: (o) => new o(),
            });
        }
    });
    if (behavior) {
        describe('behavior', function () {
            const testVariants = createTestVariants(({ unsubscribe, subscribe, reason, }) => {
                const onAbortArgs = [];
                function onAbort(...args) {
                    onAbortArgs.push([this, ...args]);
                }
                const abortController = new AbortController1();
                function checkBeforeAbort() {
                    assert.ok(abortController.signal);
                    assert.strictEqual(abortController.signal.aborted, false);
                    assert.strictEqual(abortController.signal.reason, void 0);
                    assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), void 0);
                }
                function checkAfterAbort() {
                    assert.strictEqual(abortController.signal.aborted, true);
                    if (typeof reason !== 'undefined') {
                        assert.strictEqual(abortController.signal.reason, reason);
                    }
                    else {
                        assert.ok(abortController.signal.reason instanceof Error);
                    }
                    assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), abortController.signal.reason);
                }
                checkBeforeAbort();
                if (unsubscribe) {
                    abortController.signal.removeEventListener('abort', onAbort);
                    abortController.signal.addEventListener('abort', onAbort);
                    abortController.signal.removeEventListener('abort', onAbort);
                }
                if (subscribe) {
                    abortController.signal.addEventListener('abort', onAbort);
                }
                if (typeof reason === 'undefined') {
                    abortController.abort();
                }
                else {
                    abortController.abort(reason);
                }
                checkAfterAbort();
                if (subscribe) {
                    assert.strictEqual(onAbortArgs.length, 1);
                    assert.strictEqual(onAbortArgs[0].length, 2);
                    assert.strictEqual(onAbortArgs[0][0], abortController.signal);
                    assert.ok(onAbortArgs[0][1] instanceof Event);
                    onAbortArgs.length = 0;
                }
                else {
                    assert.deepStrictEqual(onAbortArgs, []);
                }
                abortController.signal.addEventListener('abort', onAbort);
                checkAfterAbort();
                assert.deepStrictEqual(onAbortArgs, []);
                abortController.signal.addEventListener('abort', onAbort);
                checkAfterAbort();
                assert.deepStrictEqual(onAbortArgs, []);
                abortController.abort();
                checkAfterAbort();
                assert.deepStrictEqual(onAbortArgs, []);
                abortController.abort('abort');
                checkAfterAbort();
                assert.deepStrictEqual(onAbortArgs, []);
                abortController.signal.removeEventListener('abort', onAbort);
                checkAfterAbort();
                assert.deepStrictEqual(onAbortArgs, []);
            });
            it('variants', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield testVariants({
                        unsubscribe: [false, true],
                        subscribe: [false, true],
                        reason: [void 0, null, false, '', 'str', new Error(), new AbortError(), Symbol('')],
                    })();
                });
            });
        });
    }
    if (equalsConstructors) {
        describe('equalsConstructors', function () {
            it('AbortSignal', function () {
                test({
                    repeat: 2,
                    message: 'AbortSignal',
                    actual: AbortSignal1,
                    expected: AbortSignal2,
                    func: o => o,
                });
                test({
                    repeat: 2,
                    message: 'new AbortSignal',
                    actual: AbortSignal1,
                    expected: AbortSignal2,
                    func: (o) => getError(() => {
                        new o();
                    }),
                });
            });
            it('AbortController', function () {
                test({
                    repeat: 2,
                    message: 'AbortController',
                    actual: AbortController1,
                    expected: AbortController2,
                    func: (o) => o,
                });
                test({
                    repeat: 2,
                    message: 'AbortController',
                    actual: AbortController1,
                    expected: AbortController2,
                    func: (o) => getError(() => {
                        new o();
                    }),
                });
            });
        });
    }
    if (equalsInstances) {
        describe('equalsInstances', function () {
            it('AbortController', function () {
                test({
                    repeat: 2,
                    message: 'AbortController',
                    actual: AbortController1,
                    expected: AbortController2,
                    func: (o) => new o(),
                });
            });
            const testVariants = createTestVariants(({ subscribe1, unsubscribe1, abort1, throwIfAborted1, subscribe2, unsubscribe2, abort2, throwIfAborted2, reason, }) => {
                test({
                    repeat: 2,
                    message: 'AbortController',
                    actual: AbortController1,
                    expected: AbortController2,
                    func: (o) => {
                        const onAbortArgs = [];
                        const errors = [];
                        function onAbort(...args) {
                            onAbortArgs.push([this, ...args]);
                        }
                        const abortController = new o();
                        function subscribe() {
                            abortController.signal.addEventListener('abort', onAbort);
                        }
                        function unsubscribe() {
                            abortController.signal.removeEventListener('abort', onAbort);
                        }
                        function abort() {
                            if (typeof reason === 'undefined') {
                                abortController.abort();
                            }
                            else {
                                abortController.abort(reason);
                            }
                        }
                        function throwIfAborted() {
                            errors.push(getError(() => abortController.signal.throwIfAborted()));
                        }
                        if (subscribe1) {
                            subscribe();
                        }
                        if (unsubscribe1) {
                            unsubscribe();
                        }
                        if (abort1) {
                            abort();
                        }
                        if (throwIfAborted1) {
                            throwIfAborted();
                        }
                        if (subscribe2) {
                            subscribe();
                        }
                        if (unsubscribe2) {
                            unsubscribe();
                        }
                        if (abort2) {
                            abort();
                        }
                        if (throwIfAborted2) {
                            throwIfAborted();
                        }
                        return {
                            abortController,
                            onAbortArgs,
                            errors,
                        };
                    },
                });
            });
            it('variants', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield testVariants({
                        subscribe1: [false, true],
                        unsubscribe1: [false, true],
                        abort1: [false, true],
                        throwIfAborted1: [false, true],
                        subscribe2: [false, true],
                        unsubscribe2: [false, true],
                        abort2: [false, true],
                        throwIfAborted2: [false, true],
                        reason: [void 0, null, false, '', 'str', new Error(), new AbortError(), Symbol('')],
                    })();
                });
            });
            it('AbortSignal subscribe', function () {
                test({
                    repeat: 2,
                    message: 'AbortController',
                    actual: AbortController1,
                    expected: AbortController2,
                    func: (o) => {
                        const abortController = new o();
                        const onAbortArgs = [];
                        function onAbort(...args) {
                            onAbortArgs.push([this, ...args]);
                        }
                        abortController.signal.addEventListener('abort', onAbort);
                        return {
                            abortController,
                            onAbortArgs,
                        };
                    },
                });
            });
            it('AbortSignal subscribe abort undefined', function () {
                test({
                    repeat: 2,
                    message: 'AbortController',
                    actual: AbortController1,
                    expected: AbortController2,
                    func: (o) => {
                        const abortController = new o();
                        const onAbortArgs = [];
                        function onAbort(...args) {
                            onAbortArgs.push([this, ...args]);
                        }
                        abortController.signal.addEventListener('abort', onAbort);
                        abortController.abort();
                        abortController.abort();
                        return {
                            abortController,
                            onAbortArgs,
                        };
                    },
                });
            });
            it('AbortSignal subscribe abort reason', function () {
                test({
                    repeat: 2,
                    message: 'AbortController',
                    actual: AbortController1,
                    expected: AbortController2,
                    func: (o) => {
                        const abortController = new o();
                        const onAbortArgs = [];
                        function onAbort(...args) {
                            onAbortArgs.push([this, ...args]);
                        }
                        abortController.signal.addEventListener('abort', onAbort);
                        abortController.abort('abort');
                        return {
                            abortController,
                            onAbortArgs,
                        };
                    },
                });
            });
            it('AbortSignal subscribe abort multiple', function () {
                test({
                    repeat: 2,
                    message: 'AbortController',
                    actual: AbortController1,
                    expected: AbortController2,
                    func: (o) => {
                        const abortController = new o();
                        const onAbortArgs = [];
                        function onAbort(...args) {
                            onAbortArgs.push([this, ...args]);
                        }
                        abortController.signal.addEventListener('abort', onAbort);
                        abortController.abort();
                        abortController.abort('abort');
                        return {
                            abortController,
                            onAbortArgs,
                        };
                    },
                });
            });
            it('AbortSignal unsubscribe', function () {
                test({
                    repeat: 2,
                    message: 'AbortController',
                    actual: AbortController1,
                    expected: AbortController2,
                    func: (o) => {
                        const abortController = new o();
                        const onAbortArgs = [];
                        function onAbort(...args) {
                            onAbortArgs.push([this, ...args]);
                        }
                        abortController.signal.addEventListener('abort', onAbort);
                        abortController.signal.removeEventListener('abort', onAbort);
                        return {
                            abortController,
                            onAbortArgs,
                        };
                    },
                });
            });
            it('AbortSignal unsubscribe abort', function () {
                test({
                    repeat: 2,
                    message: 'AbortController',
                    actual: AbortController1,
                    expected: AbortController2,
                    func: (o) => {
                        const abortController = new o();
                        const onAbortArgs = [];
                        function onAbort(...args) {
                            onAbortArgs.push([this, ...args]);
                        }
                        abortController.signal.addEventListener('abort', onAbort);
                        abortController.signal.removeEventListener('abort', onAbort);
                        abortController.abort();
                        return {
                            abortController,
                            onAbortArgs,
                        };
                    },
                });
            });
            it('AbortSignal unsubscribe abort multiple', function () {
                test({
                    repeat: 2,
                    message: 'AbortController',
                    actual: AbortController1,
                    expected: AbortController2,
                    func: (o) => {
                        const abortController = new o();
                        const onAbortArgs = [];
                        function onAbort(...args) {
                            onAbortArgs.push([this, ...args]);
                        }
                        abortController.signal.addEventListener('abort', onAbort);
                        abortController.signal.removeEventListener('abort', onAbort);
                        abortController.abort();
                        abortController.abort('abort');
                        return {
                            abortController,
                            onAbortArgs,
                        };
                    },
                });
            });
            it('AbortSignal throwIfAborted undefined', function () {
                test({
                    repeat: 2,
                    message: 'AbortController',
                    actual: AbortController1,
                    expected: AbortController2,
                    func: (o) => {
                        const abortController = new o();
                        const onAbortArgs = [];
                        function onAbort(...args) {
                            onAbortArgs.push([this, ...args]);
                        }
                        abortController.signal.addEventListener('abort', onAbort);
                        const error1 = getError(() => abortController.signal.throwIfAborted());
                        abortController.abort();
                        const error2 = getError(() => abortController.signal.throwIfAborted());
                        return {
                            abortController,
                            onAbortArgs,
                            error1,
                            error2,
                        };
                    },
                });
            });
            it('AbortSignal throwIfAborted reason', function () {
                test({
                    repeat: 2,
                    message: 'AbortController',
                    actual: AbortController1,
                    expected: AbortController2,
                    func: (o) => {
                        const abortController = new o();
                        const onAbortArgs = [];
                        function onAbort(...args) {
                            onAbortArgs.push([this, ...args]);
                        }
                        abortController.signal.addEventListener('abort', onAbort);
                        const error1 = getError(() => abortController.signal.throwIfAborted());
                        abortController.abort('abort');
                        const error2 = getError(() => abortController.signal.throwIfAborted());
                        return {
                            abortController,
                            onAbortArgs,
                            error1,
                            error2,
                        };
                    },
                });
            });
        });
    }
}

export { createAbortControllerEqualsTest as c };
