/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/format/DateFormat","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/ui/model/odata/type/ODataType","sap/ui/thirdparty/jquery"],function(t,e,n,a,i,o,r){"use strict";var s=(new Date).getFullYear(),l=new Date(Date.UTC(s,11,31)),u=new Date(s,11,31,23,59,58);function f(t){return t.oConstraints&&t.oConstraints.isDateOnly}function p(t){return sap.ui.getCore().getLibraryResourceBundle().getText(f(t)?"EnterDate":"EnterDateTime",[t.formatValue(f(t)?l:u,"string")])}function h(t){var n;if(!t.oFormat){n=r.extend({strictParsing:true},t.oFormatOptions);if(f(t)){n.UTC=true;t.oFormat=e.getDateInstance(n)}else{t.oFormat=e.getDateTimeInstance(n)}}return t.oFormat}function c(e,n){var a,i;e.oConstraints=undefined;if(n){a=n.nullable;if(a===false||a==="false"){e.oConstraints={nullable:false}}else if(a!==undefined&&a!==true&&a!=="true"){t.warning("Illegal nullable: "+a,null,e.getName())}if(n.isDateOnly===true){e.oConstraints=e.oConstraints||{};e.oConstraints.isDateOnly=true}i=n.precision;if(i!==undefined){if(i===Math.floor(i)&&i>=1&&i<=12){e.oConstraints=e.oConstraints||{};e.oConstraints.precision=i}else if(i!==0){t.warning("Illegal precision: "+i,null,e.getName())}}}e._handleLocalizationChange()}var m=o.extend("sap.ui.model.odata.type.DateTimeBase",{constructor:function(t,e){o.apply(this,arguments);c(this,e);this.oFormat=null;this.oFormatOptions=t},metadata:{abstract:true}});m.prototype.formatValue=function(t,e){if(t===null||t===undefined){return null}switch(this.getPrimitiveType(e)){case"any":return t;case"string":if(!(t instanceof Date)){throw new n("Illegal "+this.getName()+" value: "+t)}return h(this).format(t);default:throw new n("Don't know how to format "+this.getName()+" to "+e)}};m.prototype.parseValue=function(t,e){var n;if(t===null||t===""){return null}switch(this.getPrimitiveType(e)){case"string":n=h(this).parse(t);if(!n){throw new a(p(this))}return n;default:throw new a("Don't know how to parse "+this.getName()+" from "+e)}};m.prototype._handleLocalizationChange=function(){this.oFormat=null};m.prototype.validateValue=function(t){if(t===null){if(this.oConstraints&&this.oConstraints.nullable===false){throw new i(p(this))}return}else if(t instanceof Date){if(t.getFullYear()===0){throw new i(p(this))}return}throw new i("Illegal "+this.getName()+" value: "+t)};return m});