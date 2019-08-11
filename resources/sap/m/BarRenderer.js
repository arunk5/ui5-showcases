/*!

 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BarInPageEnabler","sap/ui/Device","sap/base/Log","sap/m/HBox"],function(e,t,a,r){"use strict";var n={};n.render=e.prototype.render;n.decorateRootElement=function(e,a){e.addClass("sapMBar");e.addClass(this.getContext(a));e.writeAccessibilityState(a,{role:a._getRootAccessibilityRole()});if(a.getTranslucent()&&t.support.touch){e.addClass("sapMBarTranslucent")}e.addClass("sapMBar-CTX")};n.shouldAddIBarContext=function(){return true};n.renderBarContent=function(e,t){var a="</div>";e.write("<div id='"+t.getId()+"-BarLeft' ");e.addClass("sapMBarLeft");e.addClass("sapMBarContainer");e.writeClasses();s("left",e,t);e.write(">");this.renderAllControls(t.getContentLeft(),e,t);e.write(a);e.write("<div id='"+t.getId()+"-BarMiddle' ");e.addClass("sapMBarMiddle");e.writeClasses();e.write(">");if(t.getEnableFlexBox()){t._oflexBox=t._oflexBox||new r(t.getId()+"-BarPH",{alignItems:"Center"}).addStyleClass("sapMBarPH").setParent(t,null,true);var n=!!t.getContentLeft().length,i=!!t.getContentMiddle().length,d=!!t.getContentRight().length;if(i&&!n&&!d){t._oflexBox.addStyleClass("sapMBarFlexBoxWidth100")}t.getContentMiddle().forEach(function(e){t._oflexBox.addItem(e)});e.renderControl(t._oflexBox)}else{e.write("<div id='"+t.getId()+"-BarPH' ");e.addClass("sapMBarPH");e.addClass("sapMBarContainer");s("middle",e,t);e.writeClasses();e.write(">");this.renderAllControls(t.getContentMiddle(),e,t);e.write(a)}e.write(a);e.write("<div id='"+t.getId()+"-BarRight'");e.addClass("sapMBarRight");e.addClass("sapMBarContainer");if(sap.ui.getCore().getConfiguration().getRTL()){e.addClass("sapMRTL")}e.writeClasses();s("right",e,t);e.write(">");this.renderAllControls(t.getContentRight(),e,t);e.write(a)};n.renderAllControls=function(t,a,r){t.forEach(function(t){e.addChildClassTo(t,r);a.renderControl(t)})};n._mContexts={Header:"sapMHeader-CTX",SubHeader:"sapMSubHeader-CTX",Footer:"sapMFooter-CTX",Default:"sapMContent-CTX"};n.getContext=function(e){var t=e.getDesign(),a=n._mContexts;return a[t]||a.Default};function s(e,t,r){var n=!!r.getContentLeft().length,s=!!r.getContentMiddle().length,i=!!r.getContentRight().length;function d(){t.addStyle("width","100%");t.writeStyles()}switch(e.toLowerCase()){case"left":if(n&&!s&&!i){d()}break;case"middle":if(s&&!n&&!i){d()}break;case"right":if(i&&!n&&!s){d()}break;default:a.error("Cannot determine which of the three content aggregations is alone")}}return n},true);