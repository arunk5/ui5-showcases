/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./InputBase","./Text","sap/ui/core/ResizeHandler","./library","sap/ui/core/library","sap/ui/events/KeyCodes","sap/ui/Device","sap/base/security/encodeXML","./TextAreaRenderer","sap/ui/thirdparty/jquery"],function(e,t,i,o,r,s,a,n,h,g){"use strict";var p=r.Wrapping;var u=e.extend("sap.m.TextArea",{metadata:{library:"sap.m",designtime:"sap/m/designtime/TextArea.designtime",properties:{rows:{type:"int",group:"Appearance",defaultValue:2},cols:{type:"int",group:"Appearance",defaultValue:20},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},maxLength:{type:"int",group:"Behavior",defaultValue:0},showExceededText:{type:"boolean",group:"Behavior",defaultValue:false},wrapping:{type:"sap.ui.core.Wrapping",group:"Behavior",defaultValue:p.None},valueLiveUpdate:{type:"boolean",group:"Behavior",defaultValue:false},growing:{type:"boolean",group:"Behavior",defaultValue:false},growingMaxLines:{type:"int",group:"Behavior",defaultValue:0}},aggregations:{_counter:{type:"sap.m.Text",multiple:false,visibility:"hidden"}},events:{liveChange:{parameters:{value:{type:"string"}}}},dnd:{draggable:false,droppable:true}}});u.prototype.init=function(){var i;e.prototype.init.call(this);this.sResizeListenerId=null;this._bPasteIsTriggered=false;i=new t(this.getId()+"-counter",{}).addStyleClass("sapMTextAreaCounter").setVisible(false);this.setAggregation("_counter",i)};u.prototype.setShowExceededText=function(e){var t=this.getAggregation("_counter"),i;if(e){if(this.getAriaLabelledBy().indexOf(t.getId())<0){this.addAriaLabelledBy(t.getId())}}else{t=this.getAggregation("_counter");t&&this.removeAriaLabelledBy(t.getId());i=this.getValue();if(this.getMaxLength()){i=i.substring(0,this.getMaxLength());this.setValue(i)}}t.setVisible(e);this.setProperty("showExceededText",e);this._updateMaxLengthAttribute();return this};u.prototype.exit=function(){e.prototype.exit.call(this);g(window).off("resize.sapMTextAreaGrowing");this._detachResizeHandler()};u.prototype.onBeforeRendering=function(){e.prototype.onBeforeRendering.call(this);var t=this.getAggregation("_counter");if((this.getMaxLength()<=0||!this.getShowExceededText())&&t.getVisible()){t.setVisible(false)}this._detachResizeHandler()};u.prototype.onAfterRendering=function(){e.prototype.onAfterRendering.call(this);if(this.getGrowing()){this._sResizeListenerId=i.register(this,this._resizeHandler.bind(this));if(this.getGrowingMaxLines()>0){this._setGrowingMaxHeight()}this._adjustHeight()}this._updateMaxLengthAttribute();if(!a.support.touch){return}var t=this.$("inner");if(this._behaviour.INSIDE_SCROLLABLE_WITHOUT_FOCUS){t.on("touchstart",g.proxy(this._onTouchStart,this));t.on("touchmove",g.proxy(this._onTouchMove,this))}else if(this._behaviour.PAGE_NON_SCROLLABLE_AFTER_FOCUS){t.on("touchmove",function(e){if(t.is(":focus")){e.stopPropagation()}})}};u.prototype._setGrowingMaxHeight=function(){var e=this.getDomRef("hidden"),t=sap.ui.getCore(),i=t.getLoadedLibraries(),o,r,s;if(!i||!i["sap.m"]){t.attachThemeChanged(this._setGrowingMaxHeight.bind(this));return}t.detachThemeChanged(this._setGrowingMaxHeight);s=window.getComputedStyle(e);o=this._getLineHeight();r=o*this.getGrowingMaxLines()+parseFloat(s.getPropertyValue("padding-top"))+parseFloat(s.getPropertyValue("border-top-width"))+parseFloat(s.getPropertyValue("border-bottom-width"));if(a.browser.firefox){r+=parseFloat(s.getPropertyValue("padding-bottom"))}e.style.maxHeight=r+"px"};u.prototype._getLineHeight=function(){var e=this.getFocusDomRef(),t;if(!e){return}t=window.getComputedStyle(e);return isNaN(parseFloat(t.getPropertyValue("line-height")))?1.4*parseFloat(t.getPropertyValue("font-size")):parseFloat(t.getPropertyValue("line-height"))};u.prototype._resizeHandler=function(e){this._adjustHeight()};u.prototype._detachResizeHandler=function(){if(this._sResizeListenerId){i.deregister(this._sResizeListenerId);this._sResizeListenerId=null}};u.prototype.onsapenter=function(e){e.setMarked()};u.prototype.onValueRevertedByEscape=function(e){if(this.getValueLiveUpdate()){this.setProperty("value",e,true);e=this.getValue()}this.fireLiveChange({value:e,newValue:e})};u.prototype.getValue=function(){var e=this.getFocusDomRef();return e?e.value:this.getProperty("value")};u.prototype.setValue=function(t){e.prototype.setValue.call(this,t);this._handleShowExceededText();if(this.getGrowing()){this._adjustHeight()}return this};u.prototype.onsapnext=function(e){e.setMarked()};u.prototype.onsapprevious=function(e){e.setMarked()};u.prototype.oninput=function(t){e.prototype.oninput.call(this,t);if(this._bPasteIsTriggered){this._bPasteIsTriggered=false;this._selectExceededText()}if(t.isMarked("invalid")){return}var i=this.getFocusDomRef(),o=i.value,r=this.getMaxLength();if(this.getShowExceededText()===false&&this._getInputValue().length<this.getMaxLength()){if(r>0&&o.length>r){o=o.substring(0,r);i.value=o}}if(this.getValueLiveUpdate()){this.setProperty("value",o,true);o=this.getValue()}this._handleShowExceededText();if(this.getGrowing()){this._adjustHeight()}this.fireLiveChange({value:o,newValue:o})};u.prototype.onpaste=function(e){if(this.getShowExceededText()){this._bPasteIsTriggered=true}};u.prototype.setGrowing=function(e){this.setProperty("growing",e);if(this.getGrowing()){g(window).on("resize.sapMTextAreaGrowing",this._updateOverflow.bind(this))}else{g(window).off("resize.sapMTextAreaGrowing")}return this};u.prototype._adjustHeight=function(){var e=this.getFocusDomRef(),t=this.getDomRef("hidden"),i,o;if(!e||!t){return}i=t.style["min-height"];o=this.getRows()*this._getLineHeight()+"px";if(!i||o!==i){t.style["min-height"]=o}t.innerHTML=n(e.value)+"&nbsp;";this._updateOverflow()};u.prototype._updateOverflow=function(){var e=this.getFocusDomRef(),t=this.getDomRef("hidden"),i;if(e){i=parseFloat(window.getComputedStyle(t)["max-height"]);e.style.overflowY=t.scrollHeight>i?"auto":""}};u.prototype._getInputValue=function(e){e=e===undefined?this.$("inner").val()||"":e.toString();if(this.getMaxLength()>0&&!this.getShowExceededText()){e=e.substring(0,this.getMaxLength())}return e.replace(/\r\n/g,"\n")};u.prototype._selectExceededText=function(){var e=this.getValue().length;if(e>this.getMaxLength()){this.selectText(this.getMaxLength(),e)}};u.prototype._updateMaxLengthAttribute=function(){var e=this.getFocusDomRef();if(!e){return}if(this.getShowExceededText()){e.removeAttribute("maxlength");this._handleShowExceededText()}else{this.getMaxLength()&&e.setAttribute("maxlength",this.getMaxLength())}};u.prototype._handleShowExceededText=function(){var e=this.getAggregation("_counter"),t=this.getMaxLength(),i;if(!this.getDomRef()||!this.getShowExceededText()||!t){return}i=this._getCounterValue();e.setText(i)};u.prototype._maxLengthIsExceeded=function(e){var t=false;if(this.getMaxLength()>0&&this.getShowExceededText()&&this.getValue().length>this.getMaxLength()){t=true}return t};u.prototype._getCounterValue=function(){var e=sap.ui.getCore().getLibraryResourceBundle("sap.m"),t=this.getMaxLength()-this.getValue().length,i=t<0?true:false,o="TEXTAREA_CHARACTER"+(Math.abs(t)===1?"":"S")+"_"+(i?"EXCEEDED":"LEFT");return e.getText(o,[Math.abs(t)])};u.prototype._behaviour=function(e){return{INSIDE_SCROLLABLE_WITHOUT_FOCUS:e.os.ios||e.os.blackberry||e.browser.chrome,PAGE_NON_SCROLLABLE_AFTER_FOCUS:e.os.android&&e.os.version>=4.1}}(a);u.prototype._onTouchStart=function(e){var t=e.touches[0];this._iStartY=t.pageY;this._iStartX=t.pageX;this._bHorizontalScroll=undefined;e.setMarked("swipestartHandled")};u.prototype._onTouchMove=function(e){var t=this.getFocusDomRef(),i=e.touches[0].pageY,o=t.scrollTop,r=o<=0,s=o+t.clientHeight>=t.scrollHeight,a=this._iStartY>i,n=this._iStartY<i,h=r&&n||s&&a;if(this._bHorizontalScroll===undefined){this._bHorizontalScroll=Math.abs(this._iStartY-i)<Math.abs(this._iStartX-e.touches[0].pageX)}if(this._bHorizontalScroll||!h){e.setMarked()}};var l=a.os.windows_phone&&/MSAppHost/i.test(navigator.appVersion);u.prototype.onfocusin=function(t){var i,o=this.$();e.prototype.onfocusin.apply(this,arguments);function r(){g(window).scrollTop(0);i.scrollTop(o.offset().top-i.offset().top+i.scrollTop())}if(l&&o.height()+o.offset().top>260){for(i=o.parent();i[0];i=i.parent()){if(i.css("overflow-y")=="auto"){i.children().last().css("padding-bottom",g(window).height()+"px");window.setTimeout(r,100);return}}}};u.prototype.onkeyup=function(e){if(e.keyCode===s.ENTER){e.setMarked("enterKeyConsumedAsContent")}};return u});