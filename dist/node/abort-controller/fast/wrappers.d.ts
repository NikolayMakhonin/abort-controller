import { IAbortControllerFast, IAbortSignalFast } from './contracts';
export declare function toAbortSignal<TAbortController extends AbortController>(abortSignalFast: IAbortSignalFast, abortController?: TAbortController): TAbortController['signal'];
export declare function toAbortSignalFast<TAbortControllerFast extends IAbortControllerFast>(abortSignal: AbortSignal, abortControllerFast: TAbortControllerFast): TAbortControllerFast['signal'];
export declare function toAbortController<TAbortController extends AbortController>(abortControllerFast: IAbortControllerFast, abortController: TAbortController): TAbortController;
export declare function toAbortControllerFast<TAbortControllerFast extends IAbortControllerFast>(abortController: AbortController, abortControllerFast: TAbortControllerFast): TAbortControllerFast;
