/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./library","sap/m/Button","./ObjectImageHelper","./ObjectPageHeaderContentRenderer"],function(e,t,a,r,n){"use strict";var o=t.ObjectPageHeaderDesign;var i=e.extend("sap.uxap.ObjectPageHeaderContent",{metadata:{library:"sap.uxap",interfaces:["sap.uxap.IHeaderContent"],properties:{contentDesign:{type:"sap.uxap.ObjectPageHeaderDesign",group:"Misc",defaultValue:o.Light}},aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},_editHeaderButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_objectImage:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_placeholder:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}}}});i.prototype.onBeforeRendering=function(){var e=this.getParent(),a=this.getAggregation("_editHeaderButton");if(a){return}if(e&&e instanceof t.ObjectPageLayout&&e.getShowEditHeaderButton()){a=this._getInternalBtnAggregation("_editHeaderButton","EDIT_HEADER","-editHeaderBtn","Transparent");a.attachPress(this._handleEditHeaderButtonPress,this)}};i.prototype.exit=function(){var e=this.getAggregation("_editHeaderButton");if(e){e.detachPress(this._handleEditHeaderButtonPress,this)}};i.prototype._handleEditHeaderButtonPress=function(e){this.getParent().fireEditHeaderButtonPress()};i.prototype._getInternalBtnAggregation=function(e,t,r,n){if(!this.getAggregation(e)){var o=new a({text:sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText(t),type:n,id:this.getId()+r});this.setAggregation(e,o)}return this.getAggregation(e)};i.prototype._getObjectImage=function(){if(!this.getAggregation("_objectImage")){var e=this.getParent(),t=e&&e.getHeaderTitle&&e.getHeaderTitle(),a=t&&r.createObjectImage(t);if(a){this.setAggregation("_objectImage",a,true)}}return this.getAggregation("_objectImage")};i.prototype._destroyObjectImage=function(e){var t=this.getAggregation("_objectImage");if(t){t.destroy();this.getAggregation("_objectImage",null,e)}};i.prototype._getPlaceholder=function(){if(!this.getAggregation("_placeholder")){var e=this.getParent(),t=e&&e.getHeaderTitle&&e.getHeaderTitle(),a=t.getShowPlaceholder();var n=a&&r.createPlaceholder();if(n){this.setAggregation("_placeholder",n,true)}}return this.getAggregation("_placeholder")};i.prototype._getLayoutDataForControl=function(e){var a=e.getLayoutData();if(!a){return}else if(a instanceof t.ObjectPageHeaderLayoutData){return a}else if(a.getMetadata().getName()=="sap.ui.core.VariantLayoutData"){var r=a.getMultipleLayoutData();for(var n=0;n<r.length;n++){var o=r[n];if(o instanceof t.ObjectPageHeaderLayoutData){return o}}}};i.createInstance=function(e,t,a,r,n){return new i({content:e,visible:t,contentDesign:a,id:n})};i.prototype.supportsPinUnpin=function(){return false};i.prototype.supportsChildPageDesign=function(){return true};i.prototype.supportsAlwaysExpanded=function(){return true};i.prototype._toggleCollapseButton=function(e){};i.prototype._setShowCollapseButton=function(e){};i.prototype._focusCollapseButton=function(){};i.prototype._focusPinButton=function(){};return i});