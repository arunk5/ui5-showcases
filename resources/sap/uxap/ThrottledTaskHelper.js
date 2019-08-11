/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/Object"],function(i,t){"use strict";var s=t.extend("ThrottledTask",{constructor:function(i,t,s){this._fnTask=i;this._iDelay=t;this._oContext=s;this._oPromise=null;this._fnResolvePromise=null;this._fnRejectPromise=null;this._iTimer=null;this._oTaskOptions=null},reSchedule:function(i,t){var s=this._getPromise();if(this._iTimer){clearTimeout(this._iTimer);this._iTimer=null}this._oTaskOptions=this._mergeOptions(this._oTaskOptions||{},t);if(i){var e=this._fnTask.call(this._oContext,this._oTaskOptions);this._completePromise(e);return s}this._iTimer=setTimeout(function(){if(this._oPromise){var i=this._fnTask.call(this._oContext,this._oTaskOptions);this._completePromise(i)}}.bind(this),this._iDelay);return s},_getPromise:function(){if(!this._oPromise){this._oPromise=new window.Promise(function(i,t){this._fnResolvePromise=i;this._fnRejectPromise=t}.bind(this))}return this._oPromise},_completePromise:function(i){var t=i?this._fnResolvePromise:this._fnRejectPromise;t();this._oPromise=null;this._fnResolvePromise=null;this._fnRejectPromise=null;this._oTaskOptions=null},_mergeOptions:function(t,s){var e=i.extend({},t,s);i.each(e,function(i){e[i]=t[i]||s[i]});return e}});return s});