/*!
 * jQuery UI Droppable 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/droppable/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.mouse.js
 *	jquery.ui.draggable.js
 */
(function(e,t){function i(e,t,i){return e>t&&e<t+i}e.widget("ui.droppable",{version:"1.10.4",widgetEventPrefix:"drop",options:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var t,i=this.options,s=i.accept;this.isover=false;this.isout=true;this.accept=e.isFunction(s)?s:function(e){return e.is(s)};this.proportions=function(){if(arguments.length){t=arguments[0]}else{return t?t:t={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}}};e.ui.ddmanager.droppables[i.scope]=e.ui.ddmanager.droppables[i.scope]||[];e.ui.ddmanager.droppables[i.scope].push(this);i.addClasses&&this.element.addClass("ui-droppable")},_destroy:function(){var t=0,i=e.ui.ddmanager.droppables[this.options.scope];for(;t<i.length;t++){if(i[t]===this){i.splice(t,1)}}this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(t,i){if(t==="accept"){this.accept=e.isFunction(i)?i:function(e){return e.is(i)}}e.Widget.prototype._setOption.apply(this,arguments)},_activate:function(t){var i=e.ui.ddmanager.current;if(this.options.activeClass){this.element.addClass(this.options.activeClass)}if(i){this._trigger("activate",t,this.ui(i))}},_deactivate:function(t){var i=e.ui.ddmanager.current;if(this.options.activeClass){this.element.removeClass(this.options.activeClass)}if(i){this._trigger("deactivate",t,this.ui(i))}},_over:function(t){var i=e.ui.ddmanager.current;if(!i||(i.currentItem||i.element)[0]===this.element[0]){return}if(this.accept.call(this.element[0],i.currentItem||i.element)){if(this.options.hoverClass){this.element.addClass(this.options.hoverClass)}this._trigger("over",t,this.ui(i))}},_out:function(t){var i=e.ui.ddmanager.current;if(!i||(i.currentItem||i.element)[0]===this.element[0]){return}if(this.accept.call(this.element[0],i.currentItem||i.element)){if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)}this._trigger("out",t,this.ui(i))}},_drop:function(t,i){var s=i||e.ui.ddmanager.current,o=false;if(!s||(s.currentItem||s.element)[0]===this.element[0]){return false}this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var t=e.data(this,"ui-droppable");if(t.options.greedy&&!t.options.disabled&&t.options.scope===s.options.scope&&t.accept.call(t.element[0],s.currentItem||s.element)&&e.ui.intersect(s,e.extend(t,{offset:t.element.offset()}),t.options.tolerance)){o=true;return false}});if(o){return false}if(this.accept.call(this.element[0],s.currentItem||s.element)){if(this.options.activeClass){this.element.removeClass(this.options.activeClass)}if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)}this._trigger("drop",t,this.ui(s));return this.element}return false},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}}});e.ui.intersect=function(e,t,s){if(!t.offset){return false}var o,r,n=(e.positionAbs||e.position.absolute).left,a=(e.positionAbs||e.position.absolute).top,l=n+e.helperProportions.width,p=a+e.helperProportions.height,u=t.offset.left,c=t.offset.top,h=u+t.proportions().width,f=c+t.proportions().height;switch(s){case"fit":return u<=n&&l<=h&&c<=a&&p<=f;case"intersect":return u<n+e.helperProportions.width/2&&l-e.helperProportions.width/2<h&&c<a+e.helperProportions.height/2&&p-e.helperProportions.height/2<f;case"pointer":o=(e.positionAbs||e.position.absolute).left+(e.clickOffset||e.offset.click).left;r=(e.positionAbs||e.position.absolute).top+(e.clickOffset||e.offset.click).top;return i(r,c,t.proportions().height)&&i(o,u,t.proportions().width);case"touch":return(a>=c&&a<=f||p>=c&&p<=f||a<c&&p>f)&&(n>=u&&n<=h||l>=u&&l<=h||n<u&&l>h);default:return false}};e.ui.ddmanager={current:null,droppables:{default:[]},prepareOffsets:function(t,i){var s,o,r=e.ui.ddmanager.droppables[t.options.scope]||[],n=i?i.type:null,a=(t.currentItem||t.element).find(":data(ui-droppable)").addBack();e:for(s=0;s<r.length;s++){if(r[s].options.disabled||t&&!r[s].accept.call(r[s].element[0],t.currentItem||t.element)){continue}for(o=0;o<a.length;o++){if(a[o]===r[s].element[0]){r[s].proportions().height=0;continue e}}r[s].visible=r[s].element.css("display")!=="none";if(!r[s].visible){continue}if(n==="mousedown"){r[s]._activate.call(r[s],i)}r[s].offset=r[s].element.offset();r[s].proportions({width:r[s].element[0].offsetWidth,height:r[s].element[0].offsetHeight})}},drop:function(t,i){var s=false;e.each((e.ui.ddmanager.droppables[t.options.scope]||[]).slice(),function(){if(!this.options){return}if(!this.options.disabled&&this.visible&&e.ui.intersect(t,this,this.options.tolerance)){s=this._drop.call(this,i)||s}if(!this.options.disabled&&this.visible&&this.accept.call(this.element[0],t.currentItem||t.element)){this.isout=true;this.isover=false;this._deactivate.call(this,i)}});return s},dragStart:function(t,i){t.element.parentsUntil("body").bind("scroll.droppable",function(){if(!t.options.refreshPositions){e.ui.ddmanager.prepareOffsets(t,i)}})},drag:function(t,i){if(t.options.refreshPositions){e.ui.ddmanager.prepareOffsets(t,i)}e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(this.options.disabled||this.greedyChild||!this.visible){return}var s,o,r,n=e.ui.intersect(t,this,this.options.tolerance),a=!n&&this.isover?"isout":n&&!this.isover?"isover":null;if(!a){return}if(this.options.greedy){o=this.options.scope;r=this.element.parents(":data(ui-droppable)").filter(function(){return e.data(this,"ui-droppable").options.scope===o});if(r.length){s=e.data(r[0],"ui-droppable");s.greedyChild=a==="isover"}}if(s&&a==="isover"){s.isover=false;s.isout=true;s._out.call(s,i)}this[a]=true;this[a==="isout"?"isover":"isout"]=false;this[a==="isover"?"_over":"_out"].call(this,i);if(s&&a==="isout"){s.isout=false;s.isover=true;s._over.call(s,i)}})},dragStop:function(t,i){t.element.parentsUntil("body").unbind("scroll.droppable");if(!t.options.refreshPositions){e.ui.ddmanager.prepareOffsets(t,i)}}}})(jQuery);