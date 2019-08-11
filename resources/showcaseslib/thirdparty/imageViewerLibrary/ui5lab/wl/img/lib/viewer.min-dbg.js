!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Viewer=t()}(this,function(){"use strict";var e={inline:!1,button:!0,navbar:!0,title:!0,toolbar:!0,tooltip:!0,movable:!0,zoomable:!0,rotatable:!0,scalable:!0,transition:!0,fullscreen:!0,keyboard:!0,interval:5e3,minWidth:200,minHeight:100,zoomRatio:.1,minZoomRatio:.01,maxZoomRatio:100,zIndex:2015,zIndexInline:0,url:"src",ready:null,show:null,shown:null,hide:null,hidden:null,view:null,viewed:null},t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=/([a-z\d])([A-Z])/g,n=/\s+/,a=/^(width|height|left|top|marginLeft|marginTop)$/,r=/^\s+(.*)\s+$/,o=Object.prototype,l=o.toString,s=o.hasOwnProperty,c=Array.prototype.slice;function u(e){return l.call(e).slice(8,-1).toLowerCase()}function d(e){return"string"==typeof e}function v(e){return"number"==typeof e&&!isNaN(e)}function h(e){return void 0===e}function f(e){return"object"===(void 0===e?"undefined":t(e))&&null!==e}function m(e){if(!f(e))return!1;try{var t=e.constructor,i=t.prototype;return t&&i&&s.call(i,"isPrototypeOf")}catch(e){return!1}}function w(e){return"function"===u(e)}function g(e,t){var i=-1;return t.indexOf?t.indexOf(e):(t.forEach(function(t,n){t===e&&(i=n)}),i)}function p(e){return d(e)&&(e=e.trim?e.trim():e.replace(r,"1")),e}function b(e,t){if(e&&w(t)){var i=void 0;if(a=e,(Array.isArray?Array.isArray(a):"array"===u(a))||v(e.length)){var n=e.length;for(i=0;i<n&&!1!==t.call(e,e[i],i,e);i+=1);}else f(e)&&Object.keys(e).forEach(function(i){t.call(e,e[i],i,e)})}var a;return e}function y(e){for(var t=arguments.length,i=Array(t>1?t-1:0),n=1;n<t;n++)i[n-1]=arguments[n];if(f(e)&&i.length>0){if(Object.assign)return Object.assign.apply(Object,[e].concat(i));i.forEach(function(t){f(t)&&Object.keys(t).forEach(function(i){e[i]=t[i]})})}return e}function x(e,t){for(var i=arguments.length,n=Array(i>2?i-2:0),a=2;a<i;a++)n[a-2]=arguments[a];return function(){for(var i=arguments.length,a=Array(i),r=0;r<i;r++)a[r]=arguments[r];return e.apply(t,n.concat(a))}}function k(e,t){var i=e.style;b(t,function(e,t){a.test(t)&&v(e)&&(e+="px"),i[t]=e})}function z(e,t){return e.classList?e.classList.contains(t):e.className.indexOf(t)>-1}function D(e,t){if(t)if(v(e.length))b(e,function(e){D(e,t)});else if(e.classList)e.classList.add(t);else{var i=p(e.className);i?i.indexOf(t)<0&&(e.className=i+" "+t):e.className=t}}function E(e,t){t&&(v(e.length)?b(e,function(e){E(e,t)}):e.classList?e.classList.remove(t):e.className.indexOf(t)>=0&&(e.className=e.className.replace(t,"")))}function I(e,t,i){t&&(v(e.length)?b(e,function(e){I(e,t,i)}):i?D(e,t):E(e,t))}function T(e){return e.replace(i,"$1-$2").toLowerCase()}function L(e,t){return f(e[t])?e[t]:e.dataset?e.dataset[t]:e.getAttribute("data-"+T(t))}function C(e,t,i){f(i)?e[t]=i:e.dataset?e.dataset[t]=i:e.setAttribute("data-"+T(t),i)}function Y(e,t,i){var a=p(t).split(n);a.length>1?b(a,function(t){Y(e,t,i)}):e.removeEventListener?e.removeEventListener(t,i,!1):e.detachEvent&&e.detachEvent("on"+t,i)}function N(e,t,i,a){var r=p(t).split(n),o=i;r.length>1?b(r,function(t){N(e,t,i)}):(a&&(i=function(){for(var n=arguments.length,a=Array(n),r=0;r<n;r++)a[r]=arguments[r];return Y(e,t,i),o.apply(e,a)}),e.addEventListener?e.addEventListener(t,i,!1):e.attachEvent&&e.attachEvent("on"+t,i))}function X(e,t,i){if(e.dispatchEvent){var n=void 0;return w(Event)&&w(CustomEvent)?n=h(i)?new Event(t,{bubbles:!0,cancelable:!0}):new CustomEvent(t,{detail:i,bubbles:!0,cancelable:!0}):h(i)?(n=document.createEvent("Event")).initEvent(t,!0,!0):(n=document.createEvent("CustomEvent")).initCustomEvent(t,!0,!0,i),e.dispatchEvent(n)}return!e.fireEvent||e.fireEvent("on"+t)}function M(e){var t=e||window.event;if(t.target||(t.target=t.srcElement||document),!v(t.pageX)&&v(t.clientX)){var i=e.target.ownerDocument||document,n=i.documentElement,a=i.body;t.pageX=t.clientX+((n&&n.scrollLeft||a&&a.scrollLeft||0)-(n&&n.clientLeft||a&&a.clientLeft||0)),t.pageY=t.clientY+((n&&n.scrollTop||a&&a.scrollTop||0)-(n&&n.clientTop||a&&a.clientTop||0))}return t}function A(e,t){return e.getElementsByTagName(t)}function S(e,t){return e.getElementsByClassName?e.getElementsByClassName(t):e.querySelectorAll("."+t)}function F(e,t){t.length?b(t,function(t){F(e,t)}):e.appendChild(t)}function R(e){e.parentNode&&e.parentNode.removeChild(e)}function W(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function O(e,t){h(e.textContent)?e.innerText=t:e.textContent=t}function q(e){return e.offsetWidth}function j(e,t){if(e.naturalWidth)t(e.naturalWidth,e.naturalHeight);else{var i=document.createElement("img");i.onload=function(){t(this.width,this.height)},i.src=e.src}}function H(e){switch(e){case 2:return"viewer-hide-xs-down";case 3:return"viewer-hide-sm-down";case 4:return"viewer-hide-md-down"}return""}function P(e,t){var i={endX:e.pageX,endY:e.pageY};return t?i:y({startX:e.pageX,startY:e.pageY},i)}var V={render:function(){this.initContainer(),this.initViewer(),this.initList(),this.renderViewer()},initContainer:function(){this.containerData={width:window.innerWidth,height:window.innerHeight}},initViewer:function(){var e=this,t=e.options,i=e.parent,n=void 0;t.inline&&(n={width:Math.max(i.offsetWidth,t.minWidth),height:Math.max(i.offsetHeight,t.minHeight)},e.parentData=n),!e.fulled&&n||(n=e.containerData),e.viewerData=y({},n)},renderViewer:function(){this.options.inline&&!this.fulled&&k(this.viewer,this.viewerData)},initList:function(){var e=this,t=e.options,i=e.element,n=e.list,a=[];b(e.images,function(e,i){var n,r=e.src,o=e.alt||(d(n=r)?n.replace(/^.*\//,"").replace(/[?&#].*$/,""):""),l=t.url;r&&(d(l)?l=e.getAttribute(l):w(l)&&(l=l.call(e,e)),a.push('<li><img src="'+r+'" role="button" data-action="view" data-index="'+i+'" data-original-url="'+(l||r)+'" alt="'+o+'"></li>'))}),n.innerHTML=a.join(""),b(A(n,"img"),function(t){C(t,"filled",!0),N(t,"load",x(e.loadImage,e),!0)}),e.items=A(n,"li"),t.transition&&N(i,"viewed",function(){D(n,"viewer-transition")},!0)},renderList:function(e){var t=this,i=e||t.index,n=t.items[i].offsetWidth||30,a=n+1;k(t.list,{width:a*t.length,marginLeft:(t.viewerData.width-n)/2-a*i})},resetList:function(){W(this.list),E(this.list,"viewer-transition"),k({marginLeft:0})},initImage:function(e){var t=this,i=t.options,n=t.image,a=t.viewerData,r=t.footer.offsetHeight,o=a.width,l=Math.max(a.height-r,r),s=t.imageData||{};j(n,function(n,a){var r=n/a,c=o,u=l;l*r>o?u=o/r:c=l*r;var d={naturalWidth:n,naturalHeight:a,aspectRatio:r,ratio:(c=Math.min(.9*c,n))/n,width:c,height:u=Math.min(.9*u,a),left:(o-c)/2,top:(l-u)/2},v=y({},d);i.rotatable&&(d.rotate=s.rotate||0,v.rotate=0),i.scalable&&(d.scaleX=s.scaleX||1,d.scaleY=s.scaleY||1,v.scaleX=1,v.scaleY=1),t.imageData=d,t.initialImageData=v,w(e)&&e()})},renderImage:function(e){var t,i,n,a,r,o=this.image,l=this.imageData,s=(i=[],n=(t=l).rotate,a=t.scaleX,r=t.scaleY,v(n)&&0!==n&&i.push("rotate("+n+"deg)"),v(a)&&1!==a&&i.push("scaleX("+a+")"),v(r)&&1!==r&&i.push("scaleY("+r+")"),i.length?i.join(" "):"none");k(o,{width:l.width,height:l.height,marginLeft:l.left,marginTop:l.top,WebkitTransform:s,msTransform:s,transform:s}),w(e)&&(this.transitioning?N(o,"transitionend",e,!0):e())},resetImage:function(){this.image&&(R(this.image),this.image=null)}},B="undefined"!=typeof window?window.PointerEvent:null,K=B?"pointerdown":"touchstart mousedown",Z=B?"pointermove":"mousemove touchmove",$=B?"pointerup pointercancel":"touchend touchcancel mouseup",U="wheel mousewheel DOMMouseScroll",_="keydown",G="dragstart",J={bind:function(){var e=this,t=e.options,i=e.element,n=e.viewer;w(t.view)&&N(i,"view",t.view),w(t.viewed)&&N(i,"viewed",t.viewed),N(n,"click",e.onClick=x(e.click,e)),N(n,U,e.onWheel=x(e.wheel,e)),N(n,G,e.onDragstart=x(e.dragstart,e)),N(e.canvas,K,e.onPointerdown=x(e.pointerdown,e)),N(document,Z,e.onPointermove=x(e.pointermove,e)),N(document,$,e.onPointerup=x(e.pointerup,e)),N(document,_,e.onKeydown=x(e.keydown,e)),N(window,"resize",e.onResize=x(e.resize,e))},unbind:function(){var e=this,t=e.options,i=e.element,n=e.viewer;w(t.view)&&Y(i,"view",t.view),w(t.viewed)&&Y(i,"viewed",t.viewed),Y(n,"click",e.onClick),Y(n,U,e.onWheel),Y(n,G,e.onDragstart),Y(e.canvas,K,e.onPointerdown),Y(document,Z,e.onPointermove),Y(document,$,e.onPointerup),Y(document,_,e.onKeydown),Y(window,"resize",e.onResize)}},Q={start:function(e){var t=M(e).target;"img"===t.tagName.toLowerCase()&&(this.target=t,this.show())},click:function(e){var t=this,i=M(e).target,n=L(i,"action"),a=t.imageData;switch(n){case"mix":t.played?t.stop():t.options.inline?t.fulled?t.exit():t.full():t.hide();break;case"view":t.view(L(i,"index"));break;case"zoom-in":t.zoom(.1,!0);break;case"zoom-out":t.zoom(-.1,!0);break;case"one-to-one":t.toggle();break;case"reset":t.reset();break;case"prev":t.prev();break;case"play":t.play();break;case"next":t.next();break;case"rotate-left":t.rotate(-90);break;case"rotate-right":t.rotate(90);break;case"flip-horizontal":t.scaleX(-a.scaleX||-1);break;case"flip-vertical":t.scaleY(-a.scaleY||-1);break;default:t.played&&t.stop()}},load:function(){var e=this,t=e.options,i=e.image,n=e.index,a=e.viewerData;e.timeout&&(clearTimeout(e.timeout),e.timeout=!1),E(i,"viewer-invisible"),i.style.cssText="width:0;height:0;margin-left:"+a.width/2+"px;margin-top:"+a.height/2+"px;max-width:none!important;visibility:visible;",e.initImage(function(){I(i,"viewer-transition",t.transition),I(i,"viewer-move",t.movable),e.renderImage(function(){e.viewed=!0,X(e.element,"viewed",{originalImage:e.images[n],index:n,image:i})})})},loadImage:function(e){var t=M(e).target,i=t.parentNode,n=i.offsetWidth||30,a=i.offsetHeight||50,r=!!L(t,"filled");j(t,function(e,i){var o=e/i,l=n,s=a;a*o>n?r?l=a*o:s=n/o:r?s=n/o:l=a*o,k(t,{width:l,height:s,marginLeft:(n-l)/2,marginTop:(a-s)/2})})},resize:function(){var e=this;e.initContainer(),e.initViewer(),e.renderViewer(),e.renderList(),e.viewed&&e.initImage(function(){e.renderImage()}),e.played&&b(A(e.player,"img"),function(t){N(t,"load",x(e.loadImage,e),!0),X(t,"load")})},wheel:function(e){var t=this,i=M(e);if(t.viewed&&(i.preventDefault(),!t.wheeling)){t.wheeling=!0,setTimeout(function(){t.wheeling=!1},50);var n=Number(t.options.zoomRatio)||.1,a=1;i.deltaY?a=i.deltaY>0?1:-1:i.wheelDelta?a=-i.wheelDelta/120:i.detail&&(a=i.detail>0?1:-1),t.zoom(-a*n,!0,i)}},keydown:function(e){var t=this,i=M(e),n=t.options,a=i.keyCode||i.which||i.charCode;if(t.fulled&&n.keyboard)switch(a){case 27:t.played?t.stop():n.inline?t.fulled&&t.exit():t.hide();break;case 32:t.played&&t.stop();break;case 37:t.prev();break;case 38:i.preventDefault(),t.zoom(n.zoomRatio,!0);break;case 39:t.next();break;case 40:i.preventDefault(),t.zoom(-n.zoomRatio,!0);break;case 48:case 49:(i.ctrlKey||i.shiftKey)&&(i.preventDefault(),t.toggle())}},dragstart:function(e){"img"===e.target.tagName.toLowerCase()&&e.preventDefault()},pointerdown:function(e){var t=this,i=t.options,n=t.pointers,a=M(e);if(t.viewed&&!t.transitioning){a.changedTouches?b(a.changedTouches,function(e){n[e.identifier]=P(e)}):n[a.pointerId||0]=P(a);var r=!!i.movable&&"move";Object.keys(n).length>1?r="zoom":"touch"!==a.pointerType&&"touchmove"!==a.type||!t.isSwitchable()||(r="switch"),t.action=r}},pointermove:function(e){var t=this,i=t.options,n=t.pointers,a=M(e),r=t.action,o=t.image;t.viewed&&r&&(a.preventDefault(),a.changedTouches?b(a.changedTouches,function(e){y(n[e.identifier],P(e,!0))}):y(n[a.pointerId||0],P(a,!0)),"move"===r&&i.transition&&z(o,"viewer-transition")&&E(o,"viewer-transition"),t.change(a))},pointerup:function(e){var t=this,i=t.pointers,n=M(e),a=t.action;t.viewed&&(n.changedTouches?b(n.changedTouches,function(e){delete i[e.identifier]}):delete i[n.pointerId||0],a&&("move"===a&&t.options.transition&&D(t.image,"viewer-transition"),t.action=!1))}},ee={show:function(){var e=this,t=e.options,i=e.element;if(t.inline||e.transitioning)return e;if(e.ready||e.build(),w(t.show)&&N(i,"show",t.show,!0),!1===X(i,"show"))return e;e.open();var n=e.viewer;return E(n,"viewer-hide"),N(i,"shown",function(){var t,i;e.view(e.target?g(e.target,(t=e.images,i=i>=0?i:0,Array.from?Array.from(t).slice(i):c.call(t,i))):e.index),e.target=!1},!0),t.transition?(e.transitioning=!0,D(n,"viewer-transition"),q(n),N(n,"transitionend",x(e.shown,e),!0),D(n,"viewer-in")):(D(n,"viewer-in"),e.shown()),e},hide:function(){var e=this,t=e.options,i=e.element,n=e.viewer;return t.inline||e.transitioning||!e.visible?e:(w(t.hide)&&N(i,"hide",t.hide,!0),!1===X(i,"hide")?e:(e.viewed&&t.transition?(e.transitioning=!0,N(e.image,"transitionend",function(){N(n,"transitionend",x(e.hidden,e),!0),E(n,"viewer-in")},!0),e.zoomTo(0,!1,!1,!0)):(E(n,"viewer-in"),e.hidden()),e))},view:function(e){var t=this,i=t.element,n=t.title,a=t.canvas;if(e=Number(e)||0,!t.ready||!t.visible||t.played||e<0||e>=t.length||t.viewed&&e===t.index)return t;var r=t.items[e],o=A(r,"img")[0],l=L(o,"originalUrl"),s=o.getAttribute("alt"),c=document.createElement("img");return c.src=l,c.alt=s,!1===X(i,"view",{originalImage:t.images[e],index:e,image:c})?t:(t.image=c,E(t.items[t.index],"viewer-active"),D(r,"viewer-active"),t.viewed=!1,t.index=e,t.imageData=null,D(c,"viewer-invisible"),W(a),F(a,c),t.renderList(),W(n),N(i,"viewed",function(){var e=t.imageData;O(n,s+" ("+e.naturalWidth+" × "+e.naturalHeight+")")},!0),c.complete?t.load():(N(c,"load",x(t.load,t),!0),t.timeout&&clearTimeout(t.timeout),t.timeout=setTimeout(function(){E(c,"viewer-invisible"),t.timeout=!1},1e3)),t)},prev:function(){return this.view(Math.max(this.index-1,0)),this},next:function(){return this.view(Math.min(this.index+1,this.length-1)),this},move:function(e,t){var i=this.imageData;return this.moveTo(h(e)?e:i.left+Number(e),h(t)?t:i.top+Number(t)),this},moveTo:function(e,t){var i=this,n=i.imageData;if(h(t)&&(t=e),e=Number(e),t=Number(t),i.viewed&&!i.played&&i.options.movable){var a=!1;v(e)&&(n.left=e,a=!0),v(t)&&(n.top=t,a=!0),a&&i.renderImage()}return i},zoom:function(e,t,i){var n=this.imageData;return e=(e=Number(e))<0?1/(1-e):1+e,this.zoomTo(n.width*e/n.naturalWidth,t,i),this},zoomTo:function(e,t,i,n){var a,r,o,l,s,c,u=this,d=u.options,h=u.pointers,f=u.imageData;if(v(e=Math.max(0,e))&&u.viewed&&!u.played&&(n||d.zoomable)){if(!n){var m=Math.max(.01,d.minZoomRatio),w=Math.min(100,d.maxZoomRatio);e=Math.min(Math.max(e,m),w)}e>.95&&e<1.05&&(e=1);var g=f.naturalWidth*e,p=f.naturalHeight*e;if(i){var y=(l=u.viewer,s=document.documentElement,{left:(c=l.getBoundingClientRect()).left+((window.scrollX||s&&s.scrollLeft||0)-(s&&s.clientLeft||0)),top:c.top+((window.scrollY||s&&s.scrollTop||0)-(s&&s.clientTop||0))}),x=h&&Object.keys(h).length?(a=0,r=0,o=0,b(h,function(e){a+=e.startX,r+=e.startY,o+=1}),{pageX:a/=o,pageY:r/=o}):{pageX:i.pageX,pageY:i.pageY};f.left-=(g-f.width)*((x.pageX-y.left-f.left)/f.width),f.top-=(p-f.height)*((x.pageY-y.top-f.top)/f.height)}else f.left-=(g-f.width)/2,f.top-=(p-f.height)/2;f.width=g,f.height=p,f.ratio=e,u.renderImage(),t&&u.tooltip()}return u},rotate:function(e){return this.rotateTo((this.imageData.rotate||0)+Number(e)),this},rotateTo:function(e){var t=this,i=t.imageData;return v(e=Number(e))&&t.viewed&&!t.played&&t.options.rotatable&&(i.rotate=e,t.renderImage()),t},scale:function(e,t){var i=this,n=i.imageData;if(h(t)&&(t=e),e=Number(e),t=Number(t),i.viewed&&!i.played&&i.options.scalable){var a=!1;v(e)&&(n.scaleX=e,a=!0),v(t)&&(n.scaleY=t,a=!0),a&&i.renderImage()}return i},scaleX:function(e){return this.scale(e,this.imageData.scaleY),this},scaleY:function(e){return this.scale(this.imageData.scaleX,e),this},play:function(){var e=this,t=e.options,i=e.player,n=x(e.loadImage,e),a=[],r=0,o=0;if(!e.visible||e.played)return e;if(t.fullscreen&&e.requestFullscreen(),e.played=!0,D(i,"viewer-show"),b(e.items,function(e,l){var s=A(e,"img")[0],c=document.createElement("img");c.src=L(s,"originalUrl"),c.alt=s.getAttribute("alt"),r+=1,D(c,"viewer-fade"),I(c,"viewer-transition",t.transition),z(e,"viewer-active")&&(D(c,"viewer-in"),o=l),a.push(c),N(c,"load",n,!0),F(i,c)}),v(t.interval)&&t.interval>0){r>1&&function i(){e.playing=setTimeout(function(){E(a[o],"viewer-in"),D(a[o=(o+=1)<r?o:0],"viewer-in"),i()},t.interval)}()}return e},stop:function(){var e=this,t=e.player;return e.played?(e.options.fullscreen&&e.exitFullscreen(),e.played=!1,clearTimeout(e.playing),E(t,"viewer-show"),W(t),e):e},full:function(){var e=this,t=e.options,i=e.viewer,n=e.image,a=e.list;return!e.visible||e.played||e.fulled||!t.inline?e:(e.fulled=!0,e.open(),D(e.button,"viewer-fullscreen-exit"),t.transition&&(E(n,"viewer-transition"),E(a,"viewer-transition")),D(i,"viewer-fixed"),i.setAttribute("style",""),k(i,{zIndex:t.zIndex}),e.initContainer(),e.viewerData=y({},e.containerData),e.renderList(),e.initImage(function(){e.renderImage(function(){t.transition&&setTimeout(function(){D(n,"viewer-transition"),D(a,"viewer-transition")},0)})}),e)},exit:function(){var e=this,t=e.options,i=e.viewer,n=e.image,a=e.list;return e.fulled?(e.fulled=!1,e.close(),E(e.button,"viewer-fullscreen-exit"),t.transition&&(E(n,"viewer-transition"),E(a,"viewer-transition")),E(i,"viewer-fixed"),k(i,{zIndex:t.zIndexInline}),e.viewerData=y({},e.parentData),e.renderViewer(),e.renderList(),e.initImage(function(){e.renderImage(function(){t.transition&&setTimeout(function(){D(n,"viewer-transition"),D(a,"viewer-transition")},0)})}),e):e},tooltip:function(){var e=this,t=e.options,i=e.tooltipBox,n=e.imageData;return e.viewed&&!e.played&&t.tooltip?(O(i,Math.round(100*n.ratio)+"%"),e.tooltiping?clearTimeout(e.tooltiping):t.transition?(e.fading&&X(i,"transitionend"),D(i,"viewer-show"),D(i,"viewer-fade"),D(i,"viewer-transition"),q(i),D(i,"viewer-in")):D(i,"viewer-show"),e.tooltiping=setTimeout(function(){t.transition?(N(i,"transitionend",function(){E(i,"viewer-show"),E(i,"viewer-fade"),E(i,"viewer-transition"),e.fading=!1},!0),E(i,"viewer-in"),e.fading=!0):E(i,"viewer-show"),e.tooltiping=!1},1e3),e):e},toggle:function(){var e=this;return 1===e.imageData.ratio?e.zoomTo(e.initialImageData.ratio,!0):e.zoomTo(1,!0),e},reset:function(){var e=this;return e.viewed&&!e.played&&(e.imageData=y({},e.initialImageData),e.renderImage()),e},update:function(){var e=this,t=[];if(e.isImg&&!e.element.parentNode)return e.destroy();if(e.length=e.images.length,e.ready&&(b(e.items,function(i,n){var a=A(i,"img")[0],r=e.images[n];r?r.src!==a.src&&t.push(n):t.push(n)}),k(e.list,{width:"auto"}),e.initList(),e.visible))if(e.length){if(e.viewed){var i=g(e.index,t);i>=0?(e.viewed=!1,e.view(Math.max(e.index-(i+1),0))):D(e.items[e.index],"viewer-active")}}else e.image=null,e.viewed=!1,e.index=0,e.imageData=null,W(e.canvas),W(e.title);return e},destroy:function(){var e=this,t=e.element;return e.options.inline?e.unbind():(e.visible&&e.unbind(),Y(t,"click",e.onStart)),e.unbuild(),function(e,t){if(f(e[t]))delete e[t];else if(e.dataset)try{delete e.dataset[t]}catch(i){e.dataset[t]=null}else e.removeAttribute("data-"+T(t))}(t,"viewer"),e}},te={open:function(){var e=this.body;D(e,"viewer-open"),e.style.paddingRight=this.scrollbarWidth+"px"},close:function(){var e=this.body;E(e,"viewer-open"),e.style.paddingRight=0},shown:function(){var e=this,t=e.options,i=e.element;e.transitioning=!1,e.fulled=!0,e.visible=!0,e.render(),e.bind(),w(t.shown)&&N(i,"shown",t.shown,!0),X(i,"shown")},hidden:function(){var e=this,t=e.options,i=e.element;e.transitioning=!1,e.viewed=!1,e.fulled=!1,e.visible=!1,e.unbind(),e.close(),D(e.viewer,"viewer-hide"),e.resetList(),e.resetImage(),w(t.hidden)&&N(i,"hidden",t.hidden,!0),X(i,"hidden")},requestFullscreen:function(){var e=document.documentElement;!this.fulled||document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement||(e.requestFullscreen?e.requestFullscreen():e.msRequestFullscreen?e.msRequestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen&&e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT))},exitFullscreen:function(){this.fulled&&(document.exitFullscreen?document.exitFullscreen():document.msExitFullscreen?document.msExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen())},change:function(e){var t,i,n,a=this,r=a.pointers,o=r[Object.keys(r)[0]],l=o.endX-o.startX,s=o.endY-o.startY;switch(a.action){case"move":a.move(l,s);break;case"zoom":a.zoom((i=y({},t=r),n=[],b(t,function(e,t){delete i[t],b(i,function(t){var i=Math.abs(e.startX-t.startX),a=Math.abs(e.startY-t.startY),r=Math.abs(e.endX-t.endX),o=Math.abs(e.endY-t.endY),l=Math.sqrt(i*i+a*a),s=(Math.sqrt(r*r+o*o)-l)/l;n.push(s)})}),n.sort(function(e,t){return Math.abs(e)<Math.abs(t)}),n[0]),!1,e);break;case"switch":a.action="switched",Math.abs(l)>Math.abs(s)&&(l>1?a.prev():l<-1&&a.next())}b(r,function(e){e.startX=e.endX,e.startY=e.endY})},isSwitchable:function(){var e=this.imageData,t=this.viewerData;return this.length>1&&e.left>=0&&e.top>=0&&e.width<=t.width&&e.height<=t.height}},ie=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}();var ne=void 0!==document.createElement("viewer").style.transition,ae=void 0,re=function(){function t(i,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=this;a.element=i,a.options=y({},e,m(n)&&n),a.isImg=!1,a.ready=!1,a.visible=!1,a.viewed=!1,a.fulled=!1,a.played=!1,a.wheeling=!1,a.playing=!1,a.fading=!1,a.tooltiping=!1,a.transitioning=!1,a.action=!1,a.target=!1,a.timeout=!1,a.index=0,a.length=0,a.pointers={},a.init()}return ie(t,[{key:"init",value:function(){var e=this,t=e.options,i=e.element;if(!L(i,"viewer")){C(i,"viewer",e);var n="img"===i.tagName.toLowerCase(),a=n?[i]:A(i,"img"),r=a.length;if(r)if(w(t.ready)&&N(i,"ready",t.ready,!0),ne||(t.transition=!1),e.isImg=n,e.length=r,e.count=0,e.images=a,e.body=document.body,e.scrollbarWidth=window.innerWidth-document.body.clientWidth,t.inline){var o=x(e.progress,e);N(i,"ready",function(){e.view()},!0),b(a,function(e){e.complete?o():N(e,"load",o,!0)})}else N(i,"click",e.onStart=x(e.start,e))}}},{key:"progress",value:function(){this.count+=1,this.count===this.length&&this.build()}},{key:"build",value:function(){var e=this,t=e.options,i=e.element;if(!e.ready){var n=i.parentNode,a=document.createElement("div");a.innerHTML='<div class="viewer-container"><div class="viewer-canvas"></div><div class="viewer-footer"><div class="viewer-title"></div><ul class="viewer-toolbar"><li role="button" class="viewer-zoom-in" data-action="zoom-in"></li><li role="button" class="viewer-zoom-out" data-action="zoom-out"></li><li role="button" class="viewer-rotate-left" data-action="rotate-left"></li><li role="button" class="viewer-rotate-right" data-action="rotate-right"></li><li role="button" class="viewer-flip-horizontal" data-action="flip-horizontal"></li><li role="button" class="viewer-flip-vertical" data-action="flip-vertical"></li></ul><div class="viewer-navbar"><ul class="viewer-list"></ul></div></div><div class="viewer-tooltip"></div><div role="button" class="viewer-button" data-action="mix"></div><div class="viewer-player"></div></div>';var r,o=S(a,"viewer-container")[0],l=S(o,"viewer-title")[0],s=S(o,"viewer-toolbar")[0],c=S(o,"viewer-navbar")[0],u=S(o,"viewer-button")[0];if(e.parent=n,e.viewer=o,e.title=l,e.toolbar=s,e.navbar=c,e.button=u,e.canvas=S(o,"viewer-canvas")[0],e.footer=S(o,"viewer-footer")[0],e.tooltipBox=S(o,"viewer-tooltip")[0],e.player=S(o,"viewer-player")[0],e.list=S(o,"viewer-list")[0],D(l,t.title?H(t.title):"viewer-hide"),D(s,t.toolbar?H(t.toolbar):"viewer-hide"),D(c,t.navbar?H(t.navbar):"viewer-hide"),I(u,"viewer-hide",!t.button),I(s.querySelectorAll('li[class*="zoom"]'),"viewer-invisible",!t.zoomable),I(s.querySelectorAll('li[class*="flip"]'),"viewer-invisible",!t.scalable),!t.rotatable){var d=s.querySelectorAll('li[class*="rotate"]');D(d,"viewer-invisible"),F(s,d)}t.inline?(D(u,"viewer-fullscreen"),k(o,{zIndex:t.zIndexInline}),"static"===(r=n,window.getComputedStyle?window.getComputedStyle(r,null):r.currentStyle).position&&k(n,{position:"relative"}),n.insertBefore(o,i.nextSibling)):(D(u,"viewer-close"),D(o,"viewer-fixed"),D(o,"viewer-fade"),D(o,"viewer-hide"),k(o,{zIndex:t.zIndex}),document.body.appendChild(o)),t.inline&&(e.render(),e.bind(),e.visible=!0),e.ready=!0,X(i,"ready")}}},{key:"unbuild",value:function(){this.ready&&(this.ready=!1,R(this.viewer))}}],[{key:"noConflict",value:function(){return window.Viewer=ae,t}},{key:"setDefaults",value:function(t){y(e,m(t)&&t)}}]),t}();return y(re.prototype,V),y(re.prototype,J),y(re.prototype,Q),y(re.prototype,ee),y(re.prototype,te),"undefined"!=typeof window&&(ae=window.Viewer,window.Viewer=re),re});