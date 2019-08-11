/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t={};t.render=function(t,e){t.write("<div");t.writeControlData(e);t.addClass("sapFGridContainer");if(e.getSnapToRow()){t.addClass("sapFGridContainerSnapToRow")}if(e.getAllowDenseFill()){t.addClass("sapFGridContainerDenseFill")}t.writeClasses();if(e.getWidth()){t.addStyle("width",e.getWidth())}this.addGridStyles(t,e);t.writeStyles();var i=e.getTooltip_AsString();if(i){t.writeAttributeEscaped("title",i)}t.write(">");e.getItems().forEach(function(i){this.renderItem(t,i,e)}.bind(this));t.write("</div>")};t.addGridStyles=function(t,e){var i=e._getActiveGridStyles();for(var r in i){t.addStyle(r,i[r])}};t.renderItem=function(t,e,i){t.write("<div");t.addClass("sapFGridContainerItemWrapper");var r=e.getLayoutData();if(r){var a=r.getColumns(),d=i.getActiveLayoutSettings().getColumns();if(a&&d){a=Math.min(a,d)}if(a){t.addStyle("grid-column","span "+a)}if(i.getInlineBlockLayout()){t.addStyle("grid-row","span 1")}else if(r.getRows()||r.getMinRows()){t.addStyle("grid-row","span "+r.getActualRows())}if(!r.hasAutoHeight()){t.addClass("sapFGridContainerItemFixedRows")}}t.writeClasses();t.writeStyles();t.write(">");t.renderControl(e);t.write("</div>")};return t},true);