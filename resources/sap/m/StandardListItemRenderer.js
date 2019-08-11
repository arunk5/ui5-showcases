/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/Renderer","sap/ui/core/IconPool","sap/ui/Device","./library","./ListItemBaseRenderer"],function(e,t,i,r,s,n){"use strict";var a=e.TextDirection;var d=t.extend(n);d.renderLIAttributes=function(e,t){var r=t.getIcon(),s=t.getTitle();e.addClass("sapMSLI");if(r&&!i.isIconURI(r)){e.addClass("sapMSLIThumbnail")}if(!t.getIconInset()){e.addClass("sapMSLINoIconInset")}if(s&&t.getDescription()){e.addClass("sapMSLIWithDescription")}if(s&&!t.getAdaptTitleSize()){e.addClass("sapMSLINoTitleAdapt")}if(s&&t.getWrapping()){e.addClass("sapMSLIWrapping")}};d.renderLIContent=function(e,t){var i=t.getInfo(),r=t.getTitle(),s=t.getDescription(),n=t.getAdaptTitleSize(),a=!r&&i;if(t.getIcon()){e.renderControl(t._getImage())}e.write("<div");e.addClass("sapMSLIDiv");if(!s&&n&&i||a){e.addClass("sapMSLIInfoMiddle")}e.writeClasses();e.write(">");this.renderTitleWrapper(e,t);if(r&&s){this.renderDescription(e,t)}if(a&&!t.getWrapping()){this.renderInfo(e,t)}e.write("</div>")};d.renderTitleWrapper=function(e,t){var i=t.getTitleTextDirection(),r=t.getTitle(),s=t.getDescription(),n=t.getInfo(),d=t.getWrapping(),p=!r&&n;e.write("<div");if(!p&&s){e.addClass("sapMSLITitle")}else{e.addClass("sapMSLITitleOnly")}e.writeClasses();if(i!==a.Inherit){e.writeAttribute("dir",i.toLowerCase())}e.write(">");if(d){this.renderWrapping(e,t,"title");if(r&&n&&!s){this.renderInfo(e,t)}}else{this.renderTitle(e,t)}e.write("</div>");if(n&&!s&&!d&&!p){this.renderInfo(e,t)}};d.renderTitle=function(e,t){e.writeEscaped(t.getTitle())};d.renderDescription=function(e,t){var i=t.getWrapping(),r=t.getDescription(),s=t.getInfo();e.write("<div");e.addClass("sapMSLIDescription");if(s){e.addClass("sapMSLIDescriptionAndInfo")}e.writeClasses();e.write(">");if(s){e.write("<div");e.addClass("sapMSLIDescriptionText");e.writeClasses();e.write(">");if(i){this.renderWrapping(e,t,"description");this.renderInfo(e,t)}else{e.writeEscaped(r)}e.write("</div>");if(!i){this.renderInfo(e,t)}}else if(i){this.renderWrapping(e,t,"description")}else{e.writeEscaped(r)}e.write("</div>")};d.renderInfo=function(e,t){var i=t.getInfoTextDirection();e.write("<div");e.writeAttribute("id",t.getId()+"-info");if(i!==a.Inherit){e.writeAttribute("dir",i.toLowerCase())}e.addClass("sapMSLIInfo");e.addClass("sapMSLIInfo"+t.getInfoState());e.writeClasses();e.write(">");e.writeEscaped(t.getInfo());e.write("</div>")};d.renderExpandCollapse=function(e,t,i){var r=t.getId(),s=i==="title"?true:false,n=s?t._bTitleTextExpanded:t._bDescriptionTextExpanded,a=sap.ui.getCore().getLibraryResourceBundle("sap.m");e.write("<span");e.writeAttribute("id",r+"-"+i+"ThreeDots");e.write(">");if(!n){e.write(" ... ")}else{e.write(" ")}e.write("</span>");e.write("<span");e.writeAttribute("id",s?r+"-titleButton":r+"-descriptionButton");e.addClass("sapMSLIExpandCollapse");e.writeClasses();e.writeAttribute("tabindex","0");e.writeAttribute("role","button");e.writeAttribute("aria-live","polite");e.write(">");if(!n){e.writeEscaped(a.getText("TEXT_SHOW_MORE"))}else{e.writeEscaped(a.getText("TEXT_SHOW_LESS"))}e.write("</span>")};d.renderWrapping=function(e,t,i){var s=t.getId(),n=i==="title"?true:false,a=n?t.getTitle():t.getDescription(),d=n?t._bTitleTextExpanded:t._bDescriptionTextExpanded,p=r.system.phone?100:300;e.write("<span");e.writeAttribute("id",s+"-"+i+"Text");e.writeAttribute("aria-live","polite");e.write(">");if(!d){var o=t._getCollapsedText(a);e.writeEscaped(o)}else if(n){this.renderTitle(e,t)}else{e.writeEscaped(t.getDescription())}e.write("</span>");if(a.length>p){this.renderExpandCollapse(e,t,i)}};return d},true);