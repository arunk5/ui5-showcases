/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/core/library","sap/ui/core/IconPool","sap/m/library","sap/ui/core/InvisibleText","sap/base/security/encodeXML"],function(e,t,i,a,s,r){"use strict";var n=a.ButtonType;var d=t.TextDirection;var l={};l.render=function(t,a){var s=a.getType();var o=a.getEnabled();var p=a.getWidth();var b=a._getTooltip();var u=a._getText();var I=a.getTextDirection();var f=e.browser.internet_explorer||e.browser.edge;var w=I===d.Inherit&&!f;var B=i.getIconURI("nav-back");t.write("<button");t.writeControlData(a);t.addClass("sapMBtnBase");if(!a._isUnstyled()){t.addClass("sapMBtn");if((s===n.Back||s===n.Up)&&a.getIcon()&&!u){t.addClass("sapMBtnBack")}}var g={};var A=l.getButtonTypeAriaLabelId(s);if(A){g["describedby"]={value:A,append:true}}if(a._determineSelfReferencePresence()){g["labelledby"]={value:a.getId()+"-content",append:true}}g["disabled"]=null;if(this.renderAccessibilityAttributes){this.renderAccessibilityAttributes(t,a,g)}t.writeAccessibilityState(a,g);if(!o){t.writeAttribute("disabled","disabled");if(!a._isUnstyled()){t.addClass("sapMBtnDisabled")}}else{switch(s){case n.Accept:case n.Reject:case n.Emphasized:t.addClass("sapMBtnInverted");break;default:break}}if(b){t.writeAttributeEscaped("title",b)}t.writeClasses();if(p!=""||p.toLowerCase()==="auto"){t.addStyle("width",p);t.writeStyles()}c(a,t);t.write(">");t.write("<span");t.writeAttribute("id",a.getId()+"-inner");if(!a._isUnstyled()){t.addClass("sapMBtnInner")}if(a._isHoverable()){t.addClass("sapMBtnHoverable")}if(o){t.addClass("sapMFocusable");if(f){t.addClass("sapMIE")}}if(!a._isUnstyled()){if(u){t.addClass("sapMBtnText")}if(s===n.Back||s===n.Up){t.addClass("sapMBtnBack")}if(a.getIcon()){if(a.getIconFirst()){t.addClass("sapMBtnIconFirst")}else{t.addClass("sapMBtnIconLast")}}}if(this.renderButtonAttributes){this.renderButtonAttributes(t,a)}if(!a._isUnstyled()&&s!==""){t.addClass("sapMBtn"+r(s))}t.writeClasses();c(a,t);t.write(">");if(s===n.Back||s===n.Up){this.writeInternalIconPoolHtml(t,a,B)}if(a.getIcon()){this.writeImgHtml(t,a)}if(u){t.write("<span ");t.addClass("sapMBtnContent");if(I!==d.Inherit){t.writeAttribute("dir",I.toLowerCase())}t.writeClasses();t.writeAttribute("id",a.getId()+"-content");t.write(">");if(w){t.write("<bdi");t.writeAttribute("id",a.getId()+"-BDI-content");t.write(">")}t.writeEscaped(u);if(w){t.write("</bdi>")}t.write("</span>")}if(f&&o){t.write('<span class="sapMBtnFocusDiv"></span>')}t.write("</span>");t.write("</button>")};l.writeImgHtml=function(e,t){e.renderControl(t._getImage(t.getId()+"-img",t.getIcon(),t.getActiveIcon(),t.getIconDensityAware()))};l.writeInternalIconPoolHtml=function(e,t,i){e.renderControl(t._getInternalIconBtn(t.getId()+"-iconBtn",i))};function c(e,t){if(e._bExcludeFromTabChain){t.writeAttribute("tabindex",-1)}}var o={Accept:"BUTTON_ARIA_TYPE_ACCEPT",Reject:"BUTTON_ARIA_TYPE_REJECT",Emphasized:"BUTTON_ARIA_TYPE_EMPHASIZED"};l.getButtonTypeAriaLabelId=function(e){return s.getStaticId("sap.m",o[e])};return l},true);