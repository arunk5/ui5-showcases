/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ListBase","./library","sap/ui/model/ClientTreeBindingAdapter","sap/ui/model/TreeBindingCompatibilityAdapter","./TreeRenderer","sap/base/Log","sap/base/assert"],function(e,t,i,n,r,o,s){"use strict";var p=e.extend("sap.m.Tree",{metadata:{library:"sap.m",events:{toggleOpenState:{parameters:{itemIndex:{type:"int"},itemContext:{type:"object"},expanded:{type:"boolean"}}}}}});p.prototype.isTreeBinding=function(e){return e=="items"};p.prototype.getBinding=function(t){t=t||"items";var r=e.prototype.getBinding.call(this,t);if(r&&t==="items"&&!r.getLength){if(r.isA("sap.ui.model.odata.v2.ODataTreeBinding")){r.applyAdapterInterface()}else if(r.isA("sap.ui.model.ClientTreeBinding")){i.apply(r)}else if(r.isA("sap.ui.model.odata.ODataTreeBinding")){n(r,this)}else{o.error("TreeBinding is not supported for the "+this)}}return r};p.prototype.updateAggregation=function(t){if(t!="items"){return e.prototype.updateAggregation.apply(this,arguments)}var i=this.getBindingInfo("items"),n=this.getBinding("items"),r=i.factory,o;function s(e,t){var n=e.getItems()||[],o,s;if(n.length>t.length){for(var p=t.length;p<n.length;p++){e.removeItem(n[p]);n[p].destroy("KeepDom")}}for(var p=0;p<t.length;p++){o=t[p];s=n[p];if(s){s.setBindingContext(o,i.model)}else{s=r(e.getId()+"-"+p,o);s.setBindingContext(o,i.model);e.addItem(s)}}}o=n.getContexts(0);if(!i.template){this.destroyItems()}s(this,o)};p.prototype.validateAggregation=function(t,i,n){var r=e.prototype.validateAggregation.apply(this,arguments);if(t==="items"&&!i.isA("sap.m.TreeItemBase")){throw new Error(i+" is not a valid items aggregation of "+this+". Items aggregation in Tree control only supports TreeItemBase-based objects, e.g. StandardTreeItem.")}return r};p.prototype.invalidate=function(){e.prototype.invalidate.apply(this,arguments);this._bInvalidated=true};p.prototype.onAfterRendering=function(){e.prototype.onAfterRendering.apply(this,arguments);this._bInvalidated=false};p.prototype._updateDeepestLevel=function(e){if(e.getLevel()+1>this.getDeepestLevel()){this._iDeepestLevel=e.getLevel()+1}};p.prototype.onItemExpanderPressed=function(e,t){var i=this.indexOfItem(e);var n=this.getBindingInfo("items");var r=e&&e.getBindingContext(n.model);if(n&&r){var o=e.getExpanded();var s;this._updateDeepestLevel(e);var p=this.getBinding("items");if(t==undefined){p.toggleIndex(i)}else if(t){p.expand(i)}else{p.collapse(i)}s=p.isExpanded(i);if(o!==s&&!e.isLeaf()){this.fireToggleOpenState({itemIndex:i,itemContext:r,expanded:s})}}};p.prototype.setGrowing=function(){o.error("Growing feature of "+this+" is not supported!");return this};p.prototype.setGrowingThreshold=function(){o.error("GrowingThreshold of "+this+" is not supported!");return this};p.prototype.setGrowingTriggerText=function(){o.error("GrowingTriggerText of "+this+" is not supported!");return this};p.prototype.setGrowingScrollToLoad=function(){o.error("GrowingScrollToLoad of "+this+" is not supported!");return this};p.prototype.setGrowingDirection=function(){o.error("GrowingDirection of "+this+" is not supported!");return this};p.prototype.expandToLevel=function(e){var t=this.getBinding("items");s(t&&t.expandToLevel,"Tree.expandToLevel is not supported with your current Binding. Please check if you are running on an ODataModel V2.");if(t&&t.expandToLevel&&t.getNumberOfExpandedLevels){if(t.getNumberOfExpandedLevels()>e){t.collapseToLevel(0)}t.expandToLevel(e)}return this};p.prototype.getNumberOfExpandedLevel=function(){return this.getBinding("items").getNumberOfExpandedLevels()};p.prototype.getDeepestLevel=function(){if(this._iDeepestLevel===undefined){this._iDeepestLevel=this.getNumberOfExpandedLevel()}return this._iDeepestLevel};p.prototype.collapseAll=function(){var e=this.getBinding("items");s(e&&e.expandToLevel,"Tree.collapseAll is not supported with your current Binding. Please check if you are running on an ODataModel V2.");if(e){e.collapseToLevel(0)}return this};p.prototype._sortHelper=function(e){var t=[];if(typeof e==="number"){t.push(e)}else if(Array.isArray(e)){t=e.sort().reverse()}return t};p.prototype._removeLeaf=function(e){var t=null,i,n=[];for(var r=0;r<e.length;r++){i=e[r];t=this.getItems()[i];if(t&&!t.isLeaf()){n.push(i)}}return n};p.prototype._preExpand=function(e){var t=this._sortHelper(e);t=this._removeLeaf(t);return t};p.prototype.expand=function(e){var t=this.getBinding("items");if(t&&t.expand){var i=this._preExpand(e),n;if(i.length>0){for(var r=0;r<i.length-1;r++){n=this.getItems()[i[r]];this._updateDeepestLevel(n);t.expand(i[r],true)}n=this.getItems()[i[i.length-1]];this._updateDeepestLevel(n);t.expand(i[i.length-1],false)}}return this};p.prototype.collapse=function(e){var t=this.getBinding("items");if(t&&t.collapse){var i=this._preExpand(e);for(var n=0;n<i.length-1;n++){t.collapse(i[n],true)}t.collapse(i[i.length-1],false)}return this};p.prototype.getAccessibilityType=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_TREE")};p.prototype.getAccessbilityPosition=function(e){var t,i,n=e.getItemNodeContext();if(n.parent){t=n.parent.children.length}if(n.positionInParent!=undefined){i=n.positionInParent+1}return{setSize:t,posInset:i}};p.prototype.onItemLongDragOver=function(e){var t=this.indexOfItem(e);this._updateDeepestLevel(e);this.getBinding("items").expand(t)};p.prototype.isGrouped=function(){return false};return p});