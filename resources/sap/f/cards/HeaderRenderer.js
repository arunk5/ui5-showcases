/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={},t=sap.ui.getCore().getLibraryResourceBundle("sap.f");e.render=function(e,r){var i=r.getStatusText();e.write("<div");e.writeControlData(r);e.writeAttribute("tabindex","0");e.addClass("sapFCardHeader");e.writeAccessibilityState(r,{role:"group",labelledby:{value:r._getHeaderAccessibility(),append:true},roledescription:{value:t.getText("ARIA_ROLEDESCRIPTION_CARD_HEADER"),append:true}});e.writeClasses();e.write(">");if(r.getIconSrc()||r.getIconInitials()){e.renderControl(r._getAvatar())}if(r.getTitle()){e.write("<div");e.addClass("sapFCardHeaderText");e.writeClasses();e.write(">");e.write("<div");e.addClass("sapFCardHeaderTextFirstLine");e.writeClasses();e.write(">");e.write("<div");e.addClass("sapFCardHeaderTitle");e.writeClasses();e.write(">");e.renderControl(r._getTitle());e.write("</div>");if(i){e.write("<span");e.addClass("sapFCardStatus");e.writeClasses();e.write(">");e.writeEscaped(i);e.write("</span>")}e.write("</div>");if(r.getSubtitle()){e.renderControl(r._getSubtitle())}e.write("</div>")}e.write("</div>")};return e},true);