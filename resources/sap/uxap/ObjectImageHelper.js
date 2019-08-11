/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/core/Icon","sap/ui/core/IconPool","sap/m/Image"],function(e,a,t,r){"use strict";var s=function(){};s.createObjectImage=function(t){var s,c=t.getObjectImageURI();if(c.indexOf("sap-icon://")===0){s=new a;s.addStyleClass("sapUxAPObjectPageHeaderObjectImageIcon")}else{s=new r({densityAware:t.getObjectImageDensityAware(),alt:e.escapeSettingsValue(t.getObjectImageAlt()),decorative:false,mode:"Background",backgroundSize:"contain",backgroundPosition:"center"});s.addStyleClass("sapUxAPObjectPageHeaderObjectImage")}s.setSrc(c);if(t.getObjectImageAlt()){s.setTooltip(t.getObjectImageAlt())}return s};s.createPlaceholder=function(){return t.createControlByURI({src:t.getIconURI("picture"),visible:true})};s._renderImageAndPlaceholder=function(e,t){var r=t.oHeader,c=t.oObjectImage,d=t.oPlaceholder,i=t.bIsObjectIconAlwaysVisible,n=t.bAddSubContainer,l=t.sBaseClass,o=!(r.getObjectImageShape()||r.getShowPlaceholder()),g=c instanceof a;if(r.getObjectImageURI()||r.getShowPlaceholder()){e.write("<span ");e.addClass(l);e.addClass("sapUxAPObjectPageHeaderObjectImage-"+r.getObjectImageShape());if(i){e.addClass("sapUxAPObjectPageHeaderObjectImageForce")}e.writeClasses();e.write(">");if(n){e.write("<span class='sapUxAPObjectPageHeaderObjectImageContainerSub'>")}if(g){e.write("<div");e.addClass("sapUxAPObjectPageHeaderObjectImage");e.addClass("sapUxAPObjectPageHeaderPlaceholder");e.writeClasses();e.write(">")}e.renderControl(c);s._renderPlaceholder(e,d,o);if(g){e.write("</div>")}if(n){e.write("</span>")}e.write("</span>")}};s._renderPlaceholder=function(e,a,t){e.write("<div");e.addClass("sapUxAPObjectPageHeaderPlaceholder");e.addClass("sapUxAPObjectPageHeaderObjectImage");if(!t){e.addClass("sapUxAPHidePlaceholder")}e.writeClasses();e.write(">");e.renderControl(a);e.write("</div>")};return s},false);