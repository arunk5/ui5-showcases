/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/m/HyphenationSupport"],function(e,t){"use strict";var a=e.TextAlign;var i=e.TitleLevel;var s={apiVersion:2};s.render=function(e,s){var l=s._getTitle(),r=(l?l.getLevel():s.getLevel())||i.Auto,n=r==i.Auto,p=n?"div":r.toLowerCase(),o=t.getTextForRender(s,"main");e.openStart(p,s);e.class("sapMTitle");e.class("sapMTitleStyle"+(s.getTitleStyle()||i.Auto));e.class(s.getWrapping()?"sapMTitleWrap":"sapMTitleNoWrap");e.class("sapUiSelectable");var g=s.getWidth();if(!g){e.class("sapMTitleMaxWidth")}else{e.style("width",g)}var T=s.getTextAlign();if(T&&T!=a.Initial){e.class("sapMTitleAlign"+T)}if(s.getParent()instanceof sap.m.Toolbar){e.class("sapMTitleTB")}var c=l?l.getTooltip_AsString():s.getTooltip_AsString();if(c){e.attr("title",c)}if(n){e.attr("role","heading")}t.writeHyphenationClass(e,s);e.openEnd();e.openStart("span");e.attr("id",s.getId()+"-inner");e.openEnd();e.text(o);e.close("span");e.close(p)};return s},true);