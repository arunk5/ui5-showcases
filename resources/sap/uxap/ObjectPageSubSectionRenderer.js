/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(function(){"use strict";var e={};e.render=function(e,t){var i,r,a,s,d,l,n=sap.ui.getCore().getConfiguration().getAccessibility();if(!t.getVisible()||!t._getInternalVisible()){return}i=t.getActions()||[];s=i.length>0;r=t._getInternalTitleVisible()&&t.getTitle().trim()!=="";a=r||s;l=t._hasVisibleActions();e.write("<div ");e.writeAttribute("role","region");e.writeControlData(t);if(t._getHeight()){e.writeAttribute("style","height:"+t._getHeight()+";")}if(t._bBlockHasMore){e.addClass("sapUxAPObjectPageSubSectionWithSeeMore")}e.addClass("sapUxAPObjectPageSubSection");e.addClass("ui-helper-clearfix");e.writeClasses();if(n){if(r){e.writeAttributeEscaped("aria-labelledby",t.getId()+"-headerTitle")}else{e.writeAttribute("aria-label",sap.uxap.ObjectPageSubSection._getLibraryResourceBundle().getText("SUBSECTION_CONTROL_NAME"))}}e.write(">");if(a){e.write("<div");e.addClass("sapUxAPObjectPageSubSectionHeader");if(!r&&!l){e.addClass("sapUiHidden")}d=t._getUseTitleOnTheLeft();if(d){e.addClass("titleOnLeftLayout")}e.writeAttributeEscaped("id",t.getId()+"-header");e.writeClasses();e.write(">");e.write("<div");if(r){e.writeAttribute("role","heading");e.writeAttribute("aria-level",t._getARIALevel())}e.addClass("sapUxAPObjectPageSubSectionHeaderTitle");if(t.getTitleUppercase()){e.addClass("sapUxAPObjectPageSubSectionHeaderTitleUppercase")}e.writeAttributeEscaped("id",t.getId()+"-headerTitle");e.writeClasses();e.writeAttribute("data-sap-ui-customfastnavgroup",true);e.write(">");if(r){e.writeEscaped(t.getTitle())}e.write("</div>");if(s){e.write("<div");e.addClass("sapUxAPObjectPageSubSectionHeaderActions");e.writeClasses();e.writeAttribute("data-sap-ui-customfastnavgroup",true);e.write(">");i.forEach(e.renderControl,e);e.write("</div>")}e.write("</div>")}e.write("<div");e.addClass("ui-helper-clearfix");e.addClass("sapUxAPBlockContainer");e.writeClasses();if(t._isHidden){e.addStyle("display","none")}e.writeStyles();e.write(">");e.renderControl(t._getGrid());e.write("</div>");e.write("<div");e.addClass("sapUxAPSubSectionSeeMoreContainer");e.writeClasses();if(t._isHidden){e.addStyle("display","none")}e.writeStyles();e.write(">");e.renderControl(t._getSeeMoreButton());e.write("</div>");e.write("</div>")};return e},true);