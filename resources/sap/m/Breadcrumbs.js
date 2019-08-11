/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/m/Text","sap/m/Link","sap/m/Select","sap/ui/core/Item","sap/ui/core/delegate/ItemNavigation","sap/ui/core/ResizeHandler","sap/ui/core/IconPool","sap/ui/Device","sap/m/library","./BreadcrumbsRenderer"],function(t,e,i,r,o,n,s,a,l,h,g){"use strict";var c=h.SelectType;var u=t.extend("sap.m.Breadcrumbs",{metadata:{library:"sap.m",interfaces:["sap.m.IBreadcrumbs"],designtime:"sap/m/designtime/Breadcrumbs.designtime",properties:{currentLocationText:{type:"string",group:"Behavior",defaultValue:null}},aggregations:{links:{type:"sap.m.Link",multiple:true,singularName:"link"},_currentLocation:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_select:{type:"sap.m.Select",multiple:false,visibility:"hidden"}},defaultAggregation:"links"}});u.prototype.onBeforeRendering=function(){this.bRenderingPhase=true;if(this._sResizeListenerId){s.deregister(this._sResizeListenerId);this._sResizeListenerId=null}if(this._bControlsInfoCached){this._updateSelect(true)}};u.prototype.onAfterRendering=function(){if(!this._sResizeListenerId){this._sResizeListenerId=s.register(this,this._handleScreenResize.bind(this))}if(!this._bControlsInfoCached){this._updateSelect(true);return}this._configureKeyboardHandling();this.bRenderingPhase=false};u.prototype.onThemeChanged=function(){this._resetControl()};u.prototype.exit=function(){this._resetControl();this._destroyItemNavigation()};u.PAGEUP_AND_PAGEDOWN_JUMP_SIZE=5;u.prototype._getAugmentedId=function(t){return this.getId()+"-"+t};u.prototype._getSelect=function(){if(!this.getAggregation("_select")){this.setAggregation("_select",this._decorateSelect(new r({id:this._getAugmentedId("select"),change:this._selectChangeHandler.bind(this),forceSelection:false,autoAdjustWidth:true,icon:a.getIconURI("slim-arrow-down"),type:c.IconOnly,tooltip:g._getResourceBundleText("BREADCRUMB_SELECT_TOOLTIP")})))}return this.getAggregation("_select")};u.prototype._getCurrentLocation=function(){if(!this.getAggregation("_currentLocation")){this.setAggregation("_currentLocation",new e({id:this._getAugmentedId("currentText"),text:this.getCurrentLocationText(),wrapping:false}).addStyleClass("sapMBreadcrumbsCurrentLocation"))}return this.getAggregation("_currentLocation")};function p(t,e){var i=Array.prototype.slice.apply(e);i.unshift(t);return i}u.prototype.insertLink=function(t,e){var i=this.insertAggregation.apply(this,p("links",arguments));this._registerControlListener(t);this._resetControl();return i};u.prototype.addLink=function(t){var e=this.addAggregation.apply(this,p("links",arguments));this._registerControlListener(t);this._resetControl();return e};u.prototype.removeLink=function(t){var e=this.removeAggregation.apply(this,p("links",arguments));this._deregisterControlListener(e);this._resetControl();return e};u.prototype.removeAllLinks=function(){var t=this.getAggregation("links",[]);var e=this.removeAllAggregation.apply(this,p("links",arguments));t.forEach(this._deregisterControlListener,this);this._resetControl();return e};u.prototype.destroyLinks=function(){var t=this.getAggregation("links",[]);var e=this.destroyAggregation.apply(this,p("links",arguments));t.forEach(this._deregisterControlListener,this);this._resetControl();return e};u.prototype._decorateSelect=function(t){t.getPicker().attachAfterOpen(this._removeItemNavigation,this).attachBeforeClose(this._restoreItemNavigation,this);t._onBeforeOpenDialog=this._onSelectBeforeOpenDialog.bind(this);t._onBeforeOpenPopover=this._onSelectBeforeOpenPopover.bind(this);t.onsapescape=this._onSelectEscPress.bind(this);return t};u.prototype._removeItemNavigation=function(){this.removeDelegate(this._getItemNavigation())};u.prototype._onSelectBeforeOpenDialog=function(){var t=this._getSelect();if(this.getCurrentLocationText()&&l.system.phone){t.setSelectedIndex(0)}else{t.setSelectedItem(null)}r.prototype._onBeforeOpenDialog.call(t);this._removeItemNavigation()};u.prototype._onSelectBeforeOpenPopover=function(){this._getSelect().setSelectedItem(null);this._removeItemNavigation()};u.prototype._restoreItemNavigation=function(){this.addDelegate(this._getItemNavigation())};u.prototype._onSelectEscPress=function(){this._getSelect().close()};u.prototype._createSelectItem=function(t){return new o({key:t.getId(),text:t.getText()})};u.prototype._selectChangeHandler=function(t){var e,r,o,n=t.getParameter("selectedItem");if(!n){return}if(!this._getSelect().isOpen()){return}e=sap.ui.getCore().byId(n.getKey());if(!(e instanceof i)){return}r=e.getHref();o=e.getTarget();e.firePress();if(r){if(o){window.open(r,o)}else{window.location.href=r}}};u.prototype._getItemsForMobile=function(){var t=this.getLinks();if(this.getCurrentLocationText()){t.push(this._getCurrentLocation())}return t};u.prototype._updateSelect=function(t){var e=this._getSelect(),i,r=this._getControlDistribution();if(!this._bControlDistributionCached||t){e.destroyItems();i=l.system.phone?this._getItemsForMobile():r.aControlsForSelect;i.map(this._createSelectItem).reverse().forEach(e.insertItem,e);this._bControlDistributionCached=true;this.invalidate(this)}e.setVisible(!!r.aControlsForSelect.length);if(!this._sResizeListenerId&&!this.bRenderingPhase){this._sResizeListenerId=s.register(this,this._handleScreenResize.bind(this))}};u.prototype._getControlsForBreadcrumbTrail=function(){var t;if(this._bControlDistributionCached&&this._oDistributedControls){return this._oDistributedControls.aControlsForBreadcrumbTrail}t=this.getLinks().filter(function(t){return t.getVisible()});if(this.getCurrentLocationText()){return t.concat([this._getCurrentLocation()])}return t};u.prototype._getControlInfo=function(t){return{id:t.getId(),control:t,width:t.$().parent().outerWidth(true),bCanOverflow:t instanceof i}};u.prototype._getControlDistribution=function(t){t=t||this._iContainerSize;this._iContainerSize=t;this._oDistributedControls=this._determineControlDistribution(t);return this._oDistributedControls};u.prototype._getSelectWidth=function(){return this._getSelect().getVisible()&&this._iSelectWidth||0};u.prototype._determineControlDistribution=function(t){var e,i,r=this._getControlsInfo().aControlInfo,o=this._getSelectWidth(),n=[],s=[],a=o;for(e=r.length-1;e>=0;e--){i=r[e];a+=i.width;if(r.length-1===e){s.push(i.control);continue}if(e===0){a-=o}if(a>t&&i.bCanOverflow){n.unshift(i.control)}else{s.unshift(i.control)}}return{aControlsForBreadcrumbTrail:s,aControlsForSelect:n}};u.prototype._getControlsInfo=function(){if(!this._bControlsInfoCached){this._iSelectWidth=this._getSelect().$().parent().outerWidth(true)||0;this._aControlInfo=this._getControlsForBreadcrumbTrail().map(this._getControlInfo);this._iContainerSize=this.$().outerWidth(true);this._bControlsInfoCached=true}return{aControlInfo:this._aControlInfo,iSelectWidth:this._iSelectWidth,iContentSize:this._iContainerSize}};u.prototype._handleScreenResize=function(t){var e=this._oDistributedControls.aControlsForBreadcrumbTrail.length,i=this._getControlDistribution(t.size.width),r=i.aControlsForBreadcrumbTrail.length;if(e!==r){this._updateSelect(true)}return this};u.prototype._getItemsToNavigate=function(){var t=this._getControlsForBreadcrumbTrail().slice(),e=this._getSelect();if(e.getVisible()){t.unshift(e)}return t};u.prototype._getItemNavigation=function(){if(!this._itemNavigation){this._itemNavigation=new n}return this._itemNavigation};u.prototype._destroyItemNavigation=function(){if(this._itemNavigation){this.removeEventDelegate(this._itemNavigation);this._itemNavigation.destroy();this._itemNavigation=null}};u.prototype._configureKeyboardHandling=function(){var t=this._getItemNavigation(),e=-1,i=this._getItemsToNavigate(),r=[];if(i.length===0){return}i.forEach(function(t,e){if(e===0){t.$().attr("tabindex","0")}t.$().attr("tabindex","-1");r.push(t.getDomRef())});this.addDelegate(t);t.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"],saphome:["alt"],sapend:["alt"]});t.setCycling(false);t.setPageSize(u.PAGEUP_AND_PAGEDOWN_JUMP_SIZE);t.setRootDomRef(this.getDomRef());t.setItemDomRefs(r);t.setSelectedIndex(e);return this};u.prototype._registerControlListener=function(t){if(t){t.attachEvent("_change",this._resetControl,this)}};u.prototype._deregisterControlListener=function(t){if(t){t.detachEvent("_change",this._resetControl,this)}};u.prototype.setCurrentLocationText=function(t){var e=this._getCurrentLocation(),i=this.setProperty("currentLocationText",t,true);if(e.getText()!==t){e.setText(t);this._resetControl()}return i};u.prototype._resetControl=function(){this._aControlInfo=null;this._iContainerSize=null;this._bControlsInfoCached=null;this._bControlDistributionCached=null;this._oDistributedControls=null;if(this._sResizeListenerId){s.deregister(this._sResizeListenerId);this._sResizeListenerId=null}this.removeDelegate(this._getItemNavigation());this.invalidate(this);return this};return u});