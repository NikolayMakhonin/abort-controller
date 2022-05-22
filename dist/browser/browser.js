!function(t){"use strict";function e(t,e){
if(!t||t.constructor.prototype===t){
var o=new TypeError('Value of "this" must be of type '.concat(e.name))
;throw o.code="ERR_INVALID_THIS",o}}
function o(t,e){function o(){this.constructor=t}
Object.setPrototypeOf(t,e),null==e?t.prototype=Object.create(e):(o.prototype=e.prototype,
t.prototype=new o)}var r=function(t,e){
return r=Object.setPrototypeOf||{__proto__:[]
}instanceof Array&&function(t,e){t.__proto__=e
}||function(t,e){
for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])
},r(t,e)};var n,i=function(t){function e(e,o){
var r=t.call(this,e)||this;return r.name=o,r}
return function(t,e){
if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null")
;function o(){this.constructor=t}
r(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,
new o)}(e,t),e}(Error),c=function(){try{
if("undefined"!=typeof DOMException)return new DOMException,
DOMException}catch(t){}return i}()
;"undefined"!=typeof window&&o(n=function(){
return document.createDocumentFragment()
},DocumentFragment);var u=function(){try{
if("undefined"!=typeof EventTarget)return new EventTarget,
EventTarget}catch(t){}return n
}(),a=Symbol("kAborted"),p=Symbol("kReason"),f=Symbol("kOnAbort"),s=function(){
var t=new TypeError("Illegal constructor")
;throw t.code="ERR_ILLEGAL_CONSTRUCTOR",t}
;o(s,u),Object.defineProperty(s.prototype,"aborted",{
get:function(){return e(this,s),this[a]},
enumerable:!1,configurable:!0
}),Object.defineProperty(s.prototype,"reason",{
get:function(){return e(this,s),this[p]},
enumerable:!1,configurable:!0
}),Object.defineProperty(s.prototype,"throwIfAborted",{
value:function(){
if(e(this,s),this.aborted)throw this.reason},
writable:!0,enumerable:!1,configurable:!0
}),Object.defineProperty(s.prototype,"onabort",{
get:function(){return this[f]||null},
set:function(t){
this[f]!==t&&(this[f]&&this.removeEventListener("abort",this[f]),
this[f]=t,this[f]&&this.addEventListener("abort",this[f]))
},enumerable:!1,configurable:!0})
;var l=Symbol("kSignal"),b=function(){
function t(){var t
;this[l]=(t=new u,Object.setPrototypeOf(t,s.prototype),t[a]=!1,
t[p]=void 0,t[f]=null,t)}
return Object.defineProperty(t.prototype,"signal",{
get:function(){return e(this,t),this[l]},
enumerable:!1,configurable:!0
}),t.prototype.abort=function(o){
e(this,t),function(t,e){
void 0===e&&(e=new c("This operation was aborted","AbortError")),
t[a]||(t[p]=e,t[a]=!0,
t.dispatchEvent(new Event("abort")))
}(this.signal,o)},t}()
;t.AbortControllerImpl=b,Object.defineProperty(t,"__esModule",{
value:!0})}({});
