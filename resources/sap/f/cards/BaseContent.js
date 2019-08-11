/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/model/json/JSONModel","sap/base/Log","sap/ui/base/ManagedObjectObserver","sap/ui/core/Core"],function(t,e,i,a,r){"use strict";var n=t.extend("sap.f.cards.BaseContent",{metadata:{aggregations:{_content:{multiple:false,visibility:"hidden"}},events:{press:{}}},renderer:function(t,e){var i="sapFCard";var a=e.getMetadata().getLibraryName();var r=e.getMetadata().getName();var s=r.slice(a.length+1,r.length);var o=n.getMinHeight(s,e.getConfiguration());var h=e.getParent();i+=s;t.write("<div");t.writeElementData(e);t.addClass(i);t.addClass("sapFCardBaseContent");t.writeClasses();if(h&&h.isA("sap.f.ICard")&&h.getHeight()==="auto"){t.addStyle("min-height",o)}t.writeStyles();t.write(">");t.renderControl(e.getAggregation("_content"));t.write("</div>")}});n.prototype.init=function(){this._aReadyPromises=[];this._bReady=false;this._mObservers={};this._awaitEvent("_dataReady");this._awaitEvent("_actionContentReady");Promise.all(this._aReadyPromises).then(function(){this._bReady=true;this.fireEvent("_ready")}.bind(this));this.setBusyIndicatorDelay(0)};n.prototype.ontap=function(t){if(!t.isMarked()){this.firePress({})}};n.prototype.exit=function(){this._oServiceManager=null;this._oDataProviderFactory=null;if(this._oDataProvider){this._oDataProvider.destroy();this._oDataProvider=null}};n.prototype._awaitEvent=function(t){this._aReadyPromises.push(new Promise(function(e){this.attachEventOnce(t,function(){e()})}.bind(this)))};n.prototype.destroy=function(){this.setAggregation("_content",null);this.setModel(null);this._aReadyPromises=null;if(this._mObservers){Object.keys(this._mObservers).forEach(function(t){this._mObservers[t].disconnect();delete this._mObservers[t]},this)}return t.prototype.destroy.apply(this,arguments)};n.prototype.setConfiguration=function(t){this._oConfiguration=t;if(!t){return this}var e=this.getInnerList();if(e&&t.maxItems){e.setGrowing(true);e.setGrowingThreshold(t.maxItems);e.addStyleClass("sapFCardMaxItems")}this._setData(t.data);return this};n.prototype.getConfiguration=function(){return this._oConfiguration};n.prototype.getInnerList=function(){return null};n.prototype._setData=function(t){var i="/";if(t&&t.path){i=t.path}this.bindObject(i);if(this._oDataProvider){this._oDataProvider.destroy()}this._oDataProvider=this._oDataProviderFactory.create(t,this._oServiceManager);if(this._oDataProvider){this.setBusy(true);this.setModel(new e);this._oDataProvider.attachDataChanged(function(t){this._updateModel(t.getParameter("data"));this.setBusy(false)}.bind(this));this._oDataProvider.attachError(function(t){this._handleError(t.getParameter("message"));this.setBusy(false)}.bind(this));this._oDataProvider.triggerDataUpdate().then(function(){this.fireEvent("_dataReady")}.bind(this))}else{this.fireEvent("_dataReady")}};function s(t,e,i){var r=this.getBindingContext(),n=this.getModel("parameters"),s=e.getAggregation(t);if(r){i.path=r.getPath();e.bindAggregation(t,i);if(n&&s){n.setProperty("/visibleItems",s.length)}if(!this._mObservers[t]){this._mObservers[t]=new a(function(i){if(i.name===t&&(i.mutation==="insert"||i.mutation==="remove")){var a=e.getAggregation(t);var r=a?a.length:0;if(n){n.setProperty("/visibleItems",r)}}});this._mObservers[t].observe(e,{aggregations:[t]})}}}n.prototype._bindAggregation=function(t,e,i){var a=t&&typeof t==="string";var r=i&&typeof i==="object";if(!a||!e||!r){return}if(this.getBindingContext()){s.apply(this,arguments)}else{e.attachModelContextChange(s.bind(this,t,e,i))}};n.prototype.isReady=function(){return this._bReady};n.prototype._updateModel=function(t){this.getModel().setData(t)};n.prototype._handleError=function(t){this.fireEvent("_error",{logMessage:t})};n.prototype.setServiceManager=function(t){this._oServiceManager=t;return this};n.prototype.setDataProviderFactory=function(t){this._oDataProviderFactory=t;return this};n.create=function(t,e,i,a){return new Promise(function(n,s){var o=function(t){var r=new t;r.setServiceManager(i);r.setDataProviderFactory(a);r.setConfiguration(e);n(r)};try{switch(t.toLowerCase()){case"list":sap.ui.require(["sap/f/cards/ListContent"],o);break;case"table":sap.ui.require(["sap/f/cards/TableContent"],o);break;case"object":sap.ui.require(["sap/f/cards/ObjectContent"],o);break;case"analytical":r.loadLibrary("sap.viz",{async:true}).then(function(){sap.ui.require(["sap/f/cards/AnalyticalContent"],o)}).catch(function(){s("Analytical content type is not available with this distribution.")});break;case"timeline":r.loadLibrary("sap.suite.ui.commons",{async:true}).then(function(){sap.ui.require(["sap/f/cards/TimelineContent"],o)}).catch(function(){s("Timeline content type is not available with this distribution.")});break;case"component":sap.ui.require(["sap/f/cards/ComponentContent"],o);break;default:s(t.toUpperCase()+" content type is not supported.")}}catch(t){s(t)}})};n.getMinHeight=function(t,e){var i=5,a;if(jQuery.isEmptyObject(e)){return"0rem"}switch(t){case"ListContent":a=n._getMinListHeight(e);break;case"TableContent":a=n._getMinTableHeight(e);break;case"TimelineContent":a=n._getMinTimelineHeight(e);break;case"AnalyticalContent":a=14;break;case"ObjectContent":a=0;break;default:a=0}return(a!==0?a:i)+"rem"};n._getMinListHeight=function(t){var e=t.maxItems||0,i=t.item,a=3;if(!i){return 0}if(i.icon||i.description){a=4}return e*a};n._getMinTableHeight=function(t){var e=t.maxItems||0,i=3,a=3;return e*i+a};n._getMinTimelineHeight=function(t){var e=t.maxItems||0,i=6;return e*i};return n});