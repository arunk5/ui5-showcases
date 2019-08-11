/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/CalendarType","sap/ui/core/format/DateFormat","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/ui/model/odata/type/ODataType","sap/ui/thirdparty/jquery"],function(t,e,i,o,n,a,r,s){"use strict";function l(t){return sap.ui.getCore().getLibraryResourceBundle().getText("EnterTime",[t.formatValue("23:59:58","string")])}function u(t){var e;if(!t.oUiFormat){e=s.extend({strictParsing:true},t.oFormatOptions);e.UTC=true;t.oUiFormat=i.getTimeInstance(e)}return t.oUiFormat}function f(e,i){var o,n;e.oConstraints=undefined;if(i){o=i.nullable;n=i.precision;if(o===false){e.oConstraints={nullable:false}}else if(o!==undefined&&o!==true){t.warning("Illegal nullable: "+o,null,e.getName())}if(n===Math.floor(n)&&n>0&&n<=12){e.oConstraints=e.oConstraints||{};e.oConstraints.precision=n}else if(n!==undefined&&n!==0){t.warning("Illegal precision: "+n,null,e.getName())}}}var p=r.extend("sap.ui.model.odata.type.TimeOfDay",{constructor:function(t,e){r.apply(this,arguments);this.oModelFormat=undefined;this.rTimeOfDay=undefined;this.oUiFormat=undefined;f(this,e);this.oFormatOptions=t}});p.prototype._handleLocalizationChange=function(){this.oUiFormat=null};p.prototype._resetModelFormatter=function(){this.oModelFormat=undefined};p.prototype.formatValue=function(t,e){var i,n;if(t===undefined||t===null){return null}switch(this.getPrimitiveType(e)){case"any":return t;case"string":n=t.indexOf(".");if(n>=0){t=t.slice(0,n+4)}i=this.getModelFormat().parse(t);if(i){return u(this).format(i)}throw new o("Illegal "+this.getName()+" value: "+t);default:throw new o("Don't know how to format "+this.getName()+" to "+e)}};p.prototype.getModelFormat=function(){var t="HH:mm:ss",o;if(!this.oModelFormat){o=this.oConstraints&&this.oConstraints.precision;if(o){t+="."+"".padEnd(o,"S")}this.oModelFormat=i.getTimeInstance({calendarType:e.Gregorian,pattern:t,strictParsing:true,UTC:true})}return this.oModelFormat};p.prototype.getName=function(){return"sap.ui.model.odata.type.TimeOfDay"};p.prototype.parseValue=function(t,e){var i;if(t===""||t===null){return null}if(this.getPrimitiveType(e)!=="string"){throw new n("Don't know how to parse "+this.getName()+" from "+e)}i=u(this).parse(t);if(!i){throw new n(l(this))}return this.getModelFormat().format(i)};p.prototype.validateValue=function(t){var e;if(t===null){if(this.oConstraints&&this.oConstraints.nullable===false){throw new a(l(this))}return}if(!this.rTimeOfDay){e=this.oConstraints&&this.oConstraints.precision;this.rTimeOfDay=new RegExp("^(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d"+(e?"(\\.\\d{1,"+e+"})?":"")+")?$")}if(!this.rTimeOfDay.test(t)){throw new a("Illegal sap.ui.model.odata.type.TimeOfDay value: "+t)}};return p});