/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/Device","sap/ui/core/Control","sap/m/ToggleButton","sap/m/Button","./DynamicPageHeaderRenderer"],function(t,e,n,o,i,s){"use strict";var a=n.extend("sap.f.DynamicPageHeader",{metadata:{library:"sap.f",properties:{pinnable:{type:"boolean",group:"Appearance",defaultValue:true},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance"}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true},_pinButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_collapseButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},designtime:"sap/f/designtime/DynamicPageHeader.designtime"}});a._getResourceBundle=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.f")};a.ARIA={ARIA_CONTROLS:"aria-controls",ARIA_EXPANDED:"aria-expanded",ARIA_LABEL:"aria-label",LABEL_EXPANDED:a._getResourceBundle().getText("EXPANDED_HEADER"),LABEL_COLLAPSED:a._getResourceBundle().getText("SNAPPED_HEADER"),LABEL_PINNED:a._getResourceBundle().getText("PIN_HEADER"),LABEL_UNPINNED:a._getResourceBundle().getText("UNPIN_HEADER"),TOOLTIP_COLLAPSE_BUTTON:a._getResourceBundle().getText("COLLAPSE_HEADER_BUTTON_TOOLTIP"),STATE_TRUE:"true",STATE_FALSE:"false"};a.prototype.init=function(){this._bShowCollapseButton=true};a.prototype.onAfterRendering=function(){this._initARIAState();this._initPinButtonARIAState()};a.prototype._togglePinButton=function(t){this._getPinButton().setPressed(t)};a.prototype._setShowPinBtn=function(t){this._getPinButton().$().toggleClass("sapUiHidden",!t)};a.prototype._pinUnpinFireEvent=function(){this.fireEvent("_pinUnpinPress")};a.prototype._onCollapseButtonPress=function(){this.fireEvent("_headerVisualIndicatorPress")};a.prototype._onCollapseButtonMouseOver=function(){this.fireEvent("_visualIndicatorMouseOver")};a.prototype._onCollapseButtonMouseOut=function(){this.fireEvent("_visualIndicatorMouseOut")};a.prototype._initARIAState=function(){var t=this.$();t.attr(a.ARIA.ARIA_EXPANDED,a.ARIA.STATE_TRUE);t.attr(a.ARIA.ARIA_LABEL,a.ARIA.LABEL_EXPANDED)};a.prototype._initPinButtonARIAState=function(){var t;if(this.getPinnable()){t=this._getPinButtonJQueryRef();t.attr(a.ARIA.ARIA_CONTROLS,this.getId())}};a.prototype._updateARIAState=function(t){var e=this.$();if(t){e.attr(a.ARIA.ARIA_EXPANDED,a.ARIA.STATE_TRUE);e.attr(a.ARIA.ARIA_LABEL,a.ARIA.LABEL_EXPANDED)}else{e.attr(a.ARIA.ARIA_EXPANDED,a.ARIA.STATE_FALSE);e.attr(a.ARIA.ARIA_LABEL,a.ARIA.LABEL_COLLAPSED)}};a.prototype._updateARIAPinButtonState=function(t){var e=this._getPinButton();if(t){e.setTooltip(a.ARIA.LABEL_UNPINNED)}else{e.setTooltip(a.ARIA.LABEL_PINNED)}};a.prototype._getPinButton=function(){if(!this.getAggregation("_pinButton")){var t=new o({id:this.getId()+"-pinBtn",icon:"sap-icon://pushpin-off",tooltip:a.ARIA.LABEL_PINNED,press:this._pinUnpinFireEvent.bind(this)}).addStyleClass("sapFDynamicPageHeaderPinButton");this.setAggregation("_pinButton",t,true)}return this.getAggregation("_pinButton")};a.prototype._getCollapseButton=function(){if(!this.getAggregation("_collapseButton")){var t=new i({id:this.getId()+"-collapseBtn",icon:"sap-icon://slim-arrow-up",press:this._onCollapseButtonPress.bind(this),tooltip:a.ARIA.TOOLTIP_COLLAPSE_BUTTON}).addStyleClass("sapFDynamicPageToggleHeaderIndicator");t.onmouseover=this._onCollapseButtonMouseOver.bind(this);t.onmouseout=this._onCollapseButtonMouseOut.bind(this);this.setAggregation("_collapseButton",t,true)}return this.getAggregation("_collapseButton")};a.prototype._toggleCollapseButton=function(t){this._setShowCollapseButton(t);this._getCollapseButton().$().toggleClass("sapUiHidden",!t)};a.prototype._getShowCollapseButton=function(){return this._bShowCollapseButton};a.prototype._setShowCollapseButton=function(t){this._bShowCollapseButton=!!t};a.prototype._focusCollapseButton=function(){this._getCollapseButton().$().focus()};a.prototype._focusPinButton=function(){this._getPinButtonJQueryRef().focus()};a.prototype._getPinButtonJQueryRef=function(){return this._getPinButton().$()};a.prototype._getState=function(){var t=this.getContent(),n=t.length>0,o=this.getPinnable()&&n&&!e.system.phone,i=this._getPinButton(),s=this._getCollapseButton();s.toggleStyleClass("sapUiHidden",!this._getShowCollapseButton());return{content:t,headerHasContent:n,headerPinnable:o,hasContent:t.length>0,pinButton:i,collapseButton:s}};return a});