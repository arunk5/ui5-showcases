/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/library","sap/ui/base/ManagedObject","sap/m/Table","sap/f/cards/BaseContent","sap/m/Column","sap/m/ColumnListItem","sap/m/Text","sap/m/Link","sap/m/ProgressIndicator","sap/m/ObjectIdentifier","sap/m/ObjectStatus","sap/f/Avatar","sap/f/cards/ActionEnablement","sap/ui/core/VerticalAlign","sap/m/ListSeparators","sap/m/ListType","sap/f/cards/BindingResolver"],function(t,e,i,r,n,a,s,o,l,u,p,c,f,d,h,g,m){"use strict";var v=t.AvatarSize;var w=r.extend("sap.f.cards.TableContent",{renderer:{}});w.prototype.exit=function(){r.prototype.exit.apply(this,arguments);if(this._oItemTemplate){this._oItemTemplate.destroy();this._oItemTemplate=null}};w.prototype._getTable=function(){if(this._bIsBeingDestroyed){return null}var t=this.getAggregation("_content");if(!t){t=new i({id:this.getId()+"-Table",showSeparators:h.None});this.setAggregation("_content",t)}return t};w.prototype.setConfiguration=function(t){r.prototype.setConfiguration.apply(this,arguments);if(!t){return this}if(t.rows&&t.columns){this._setStaticColumns(t.rows,t.columns);return this}if(t.row&&t.row.columns){this._setColumns(t.row)}return this};w.prototype._setColumns=function(t){var e=[],i=this._getTable(),r=t.columns;r.forEach(function(t){this._getTable().addColumn(new n({header:new s({text:t.title}),width:t.width}));e.push(this._createCell(t))}.bind(this));this._oItemTemplate=new a({cells:e,vAlign:d.Middle});this._attachActions(t,this._oItemTemplate);var o={template:this._oItemTemplate};this._bindAggregation("items",i,o)};w.prototype._setStaticColumns=function(t,e){var i=this._getTable();e.forEach(function(t){i.addColumn(new n({header:new s({text:t.title}),width:t.width}))});t.forEach(function(t){var e=new a({vAlign:d.Middle});if(t.cells&&Array.isArray(t.cells)){for(var r=0;r<t.cells.length;r++){e.addCell(this._createCell(t.cells[r]))}}if(t.actions&&Array.isArray(t.actions)){var n=t.actions[0];if(n.type===g.Navigation){e.setType(g.Navigation)}if(n.url){e.attachPress(function(){window.open(n.url,n.target||"_blank")})}}i.addItem(e)}.bind(this));this.fireEvent("_actionContentReady")};w.prototype._createCell=function(t){if(t.url){return new o({text:t.value,href:t.url,target:t.target||"_blank"})}if(t.identifier){var i=new u({title:t.value});if(t.identifier.url){var r=e.bindingParser(t.identifier.url);if(r){r.formatter=function(t){if(typeof t==="string"){return true}return false};i.bindProperty("titleActive",r)}else{i.setTitleActive(!!t.identifier.url)}i.attachTitlePress(function(e){var i=e.getSource(),r=i.getBindingContext(),n=i.getModel(),a,s,o;if(r){a=r.getPath()}s=m.resolveValue(t.identifier.url,n,a);o=m.resolveValue(t.identifier.target,n,a);if(s){window.open(s,o||"_blank")}})}return i}if(t.state){return new p({text:t.value,state:t.state})}if(t.value){return new s({text:t.value})}if(t.icon){return new c({src:t.icon.src,displayShape:t.icon.shape,displaySize:v.XS})}if(t.progressIndicator){return new l({percentValue:t.progressIndicator.percent,displayValue:t.progressIndicator.text,state:t.progressIndicator.state})}};w.prototype.getInnerList=function(){return this._getTable()};f.enrich(w);return w});