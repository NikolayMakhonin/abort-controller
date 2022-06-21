!function(t){"use strict";var o=function(t,r){
return o=Object.setPrototypeOf||{__proto__:[]
}instanceof Array&&function(t,o){t.__proto__=o
}||function(t,o){
for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r])
},o(t,r)};var r=function(t){function r(o,n){
var i=t.call(this,o)||this
;return Object.setPrototypeOf(i,r.prototype),i.reason=n,
i.name="AbortError",i._internal=!1,i}
return function(t,r){
if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null")
;function n(){this.constructor=t}
o(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,
new n)}(r,t),r}(Error)
;var n=function(){},i=function(){function t(){
this.aborted=!1,this.reason=void 0,
this._callbacks=void 0}
return t.prototype.subscribe=function(t){
var o,r=this
;if(null===(o=this._callbacks)||void 0===o?void 0:o.has(t))throw new Error("Already subscribed: "+t)
;return this.aborted?(t.call(this,this.reason),
n):(this._callbacks||(this._callbacks=new Set),
this._callbacks.add(t),function(){var o
;null===(o=r._callbacks)||void 0===o||o.delete(t)
})},t.prototype.abort=function(t){var o,r=this
;this.aborted=!0,this.reason=t,null===(o=this._callbacks)||void 0===o||o.forEach((function(t){
t.call(r,r.reason)})),this._callbacks=void 0
},t.prototype.throwIfAborted=function(){
if(this.aborted)throw this.reason},t
}(),e=function(){function t(){this.signal=new i}
return t.prototype.abort=function(t){
this.signal.aborted||(void 0===t&&((t=new r("Aborted with no reason",t))._internal=!0),
this.signal.abort(t))},t}()
;t.AbortControllerFast=e,t.AbortError=r,t.toAbortController=function(t,o){
return t.signal.subscribe((function(t){
t instanceof r&&t._internal&&(t=t.reason),
o.abort(t)})),o
},t.toAbortControllerFast=function(t,o){
return t.signal.addEventListener("abort",(function(){
o.abort(this.reason)})),o
},t.toAbortSignal=function(t,o){
return t.subscribe((function(t){o.abort(t)
})),o.signal},t.toAbortSignalFast=function(t,o){
return t.addEventListener("abort",(function(t){
o.abort(t)})),o.signal
},Object.defineProperty(t,"__esModule",{value:!0})
}({});
