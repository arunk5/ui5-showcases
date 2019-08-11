/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/base/ManagedObjectObserver","sap/ui/core/ResizeHandler","sap/ui/core/delegate/ItemNavigation","sap/f/GridContainerRenderer","sap/ui/Device","sap/ui/layout/cssgrid/VirtualGrid","sap/f/GridContainerSettings"],function(e,t,i,s,n,r,a,o){"use strict";var l=16;function u(){return!r.browser.msie&&!(r.browser.edge&&r.browser.version<l)}function g(e){var t=e.getLayoutData();return t?t.getColumns():1}function p(e){var t=e.getLayoutData();return t?t.getActualRows():1}function h(e){var t=e.getLayoutData();return t?t.hasAutoHeight():true}var d=e.extend("sap.f.GridContainer",{metadata:{library:"sap.f",interfaces:["sap.f.dnd.IGridDroppable"],properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:""},containerQuery:{type:"boolean",group:"Behavior",defaultValue:false},snapToRow:{type:"boolean",group:"Appearance",defaultValue:false},allowDenseFill:{type:"boolean",group:"Appearance",defaultValue:false},inlineBlockLayout:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.core.Control",multiple:true,singularName:"item",dnd:true},layout:{type:"sap.f.GridContainerSettings",multiple:false},layoutS:{type:"sap.f.GridContainerSettings",multiple:false},layoutM:{type:"sap.f.GridContainerSettings",multiple:false},layoutL:{type:"sap.f.GridContainerSettings",multiple:false},layoutXL:{type:"sap.f.GridContainerSettings",multiple:false},_defaultLayout:{type:"sap.f.GridContainerSettings",multiple:false,visibility:"hidden"}},events:{layoutChange:{parameters:{layout:{type:"string"}}}},dnd:{draggable:false,droppable:true}}});d.prototype.getActiveLayoutSettings=function(){return this.getAggregation(this._sActiveLayout)||this.getAggregation("layout")||this.getAggregation("_defaultLayout")};d.prototype._onBeforeItemRendering=function(){var e=this.getParent(),t=e._resizeListeners[this.getId()];if(t){i.deregister(t)}delete e._resizeListeners[this.getId()]};d.prototype._onAfterItemRendering=function(){var e=this.getParent();e._resizeListeners[this.getId()]=i.register(this,e._resizeItemHandler);e._setItemNavigationItems();if(!u()){e._scheduleIEPolyfill();return}e._applyItemAutoRows(this)};d.prototype._onItemChange=function(e){if(e.name!=="items"||!e.child){return}if(e.mutation==="insert"){e.child.addEventDelegate(this._itemDelegate,e.child)}else if(e.mutation==="remove"){e.child.removeEventDelegate(this._itemDelegate,e.child)}};d.prototype._deregisterResizeListeners=function(){var e,t;for(e in this._resizeListeners){t=this._resizeListeners[e];i.deregister(t)}delete this._resizeListeners};d.prototype._setItemNavigationItems=function(){if(!this._isRenderingFinished){return}};d.prototype._detectActiveLayout=function(){var e=this.getContainerQuery()&&this.getDomRef()?this.$().outerWidth():window.innerWidth,t=r.media.getCurrentRange("StdExt",e),i=t?d.mSizeLayouts[t.name]:"layout",s=this.getActiveLayoutSettings(),n=false;if(this._sActiveLayout!==i){this._sActiveLayout=i;n=s!==this.getActiveLayoutSettings()}return n};d.prototype._getActiveGridStyles=function(){var e=this.getActiveLayoutSettings(),t=e.getColumns()||"auto-fill",i={"grid-template-columns":"repeat("+t+", "+e.getColumnSize()+")","grid-gap":e.getGap()};if(this.getInlineBlockLayout()){i["grid-auto-rows"]="min-content"}else{i["grid-auto-rows"]=e.getRowSize()}return i};d.prototype.init=function(){this.setAggregation("_defaultLayout",new o);this._resizeListeners={};this._itemDelegate={onBeforeRendering:this._onBeforeItemRendering,onAfterRendering:this._onAfterItemRendering};this._itemsObserver=new t(this._onItemChange.bind(this));this._itemsObserver.observe(this,{aggregations:["items"]});this._resizeHandler=this._resize.bind(this);this._resizeItemHandler=this._resizeItem.bind(this);this._itemNavigation=(new s).setCycling(false);this._itemNavigation.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"]});this.addDelegate(this._itemNavigation)};d.prototype.onBeforeRendering=function(){this._detectActiveLayout();var e=this._resizeListeners[this.getId()];if(e){i.deregister(e)}this._isRenderingFinished=false};d.prototype.onAfterRendering=function(){this._resizeListeners[this.getId()]=i.register(this.getDomRef(),this._resizeHandler);this._isRenderingFinished=true;this._setItemNavigationItems();this._applyLayout(true)};d.prototype.exit=function(){this._deregisterResizeListeners();if(this._itemsObserver){this._itemsObserver.disconnect();delete this._itemsObserver}if(this._itemNavigation){this.removeDelegate(this._itemNavigation);this._itemNavigation.destroy();delete this._itemNavigation}};d.prototype._resize=function(){var e=this._detectActiveLayout();this._applyLayout(e);if(e){this.fireLayoutChange({layout:this._sActiveLayout})}};d.prototype._resizeItem=function(e){if(!u()){this._scheduleIEPolyfill();return}this._applyItemAutoRows(e.control)};d.prototype._applyLayout=function(e){if(!this._isRenderingFinished){return}if(!u()){this._scheduleIEPolyfill(e);return}if(e){this.$().css(this._getActiveGridStyles());this.getItems().forEach(this._applyItemAutoRows.bind(this))}this._enforceMaxColumns()};d.prototype._applyItemAutoRows=function(e){if(!this._isRenderingFinished){return}if(this.getInlineBlockLayout()){return}if(h(e)){var t=e.$(),i=this.getActiveLayoutSettings(),s=i.calculateRowsForItem(t.height());if(!s){return}t.parent().css({"grid-row":"span "+Math.max(s,p(e))})}};d.prototype._enforceMaxColumns=function(){var e=this.getActiveLayoutSettings(),t=e.getComputedColumnsCount(this.$().innerWidth());if(!t){return}this.getItems().forEach(function(e){e.$().parent().css("grid-column","span "+Math.min(g(e),t))})};d.prototype._scheduleIEPolyfill=function(e){if(this._iPolyfillCallId){clearTimeout(this._iPolyfillCallId)}if(e){this._applyIEPolyfillLayout();return}this._iPolyfillCallId=setTimeout(this._applyIEPolyfillLayout.bind(this),0)};d.prototype._applyIEPolyfillLayout=function(){if(!this._isRenderingFinished){return}var e=this.$(),t=this.getActiveLayoutSettings(),i=t.getColumnSizeInPx(),s=t.getRowSizeInPx(),n=t.getGapInPx(),r=t.getComputedColumnsCount(e.innerWidth()),o=parseInt(e.css("padding-top").replace("px","")),l=parseInt(e.css("padding-left").replace("px","")),u=this.getItems();if(!u.length){return}var d=new a;d.init({numberOfCols:Math.max(1,r),cellWidth:i,cellHeight:s,unitOfMeasure:"px",gapSize:n,topOffset:o?o:0,leftOffset:l?l:0,allowDenseFill:this.getAllowDenseFill()});var f,y,c,m,_;for(f=0;f<u.length;f++){y=u[f];m=g(y);if(h(y)){_=t.calculateRowsForItem(y.$().height())}else{_=p(y)}d.fitElement(f+"",m,_)}d.calculatePositions();for(f=0;f<u.length;f++){y=u[f];c=d.getItems()[f];y.$().parent().css({position:"absolute",top:c.top,left:c.left,width:c.width,height:c.height})}e.css("height",d.getHeight()+"px")};d.mSizeLayouts={Phone:"layoutS",Tablet:"layoutM",Desktop:"layoutL",LargeDesktop:"layoutXL"};return d});