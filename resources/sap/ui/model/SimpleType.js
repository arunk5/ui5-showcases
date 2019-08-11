/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/DataType","./Type","./FormatException","./ParseException","./ValidateException"],function(t,e){"use strict";var o={format:function(t){return t},parse:function(t){return t}};var n=e.extend("sap.ui.model.SimpleType",{constructor:function(t,o){e.apply(this,arguments);this.setFormatOptions(t||{});this.setConstraints(o||{});this.sName="SimpleType"},metadata:{abstract:true,publicMethods:["setConstraints","setFormatOptions","formatValue","parseValue","validateValue"]}});n.prototype.getModelFormat=function(){if(this.oInputFormat){return this.oInputFormat}return o};n.prototype.setConstraints=function(t){this.oConstraints=t};n.prototype.setFormatOptions=function(t){this.oFormatOptions=t};n.prototype.getPrimitiveType=function(e){switch(e){case"any":case"boolean":case"int":case"float":case"string":case"object":return e;default:var o=t.getType(e);return o&&o.getPrimitiveType().getName()}};n.prototype.combineMessages=function(t){if(t.length===1){return t[0]}else{return t.join(". ")+"."}};return n});