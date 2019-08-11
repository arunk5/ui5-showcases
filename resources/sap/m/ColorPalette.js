/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/Device","sap/ui/base/DataType","sap/ui/core/library","sap/ui/core/delegate/ItemNavigation","./Button","./Dialog","./library","./ColorPaletteRenderer","sap/ui/dom/containsOrEquals","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery"],function(t,e,o,r,i,n,s,a,l,u,h,p){"use strict";var f=r.CSSColor;var g;var C;var d=a.ButtonType;var _=o.getType("boolean");var c="sapMColorPaletteSquare";var m=5;var y=2;var B=15;var v=sap.ui.getCore().getLibraryResourceBundle("sap.m");var D=t.extend("sap.m.ColorPalette",{metadata:{library:"sap.m",properties:{colors:{type:"sap.ui.core.CSSColor[]",group:"Appearance",defaultValue:["gold","darkorange","indianred","darkmagenta","cornflowerblue","deepskyblue","darkcyan","olivedrab","darkslategray","azure","white","lightgray","darkgray","dimgray","black"]}},aggregations:{_defaultColorButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_moreColorsButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{colorSelect:{parameters:{value:{type:"sap.ui.core.CSSColor"},defaultAction:{type:"boolean"}}}}}});D.prototype.init=function(){this._oDefaultColor=null;this._bShowDefaultColorButton=false;this._bShowMoreColorsButton=false;this._oMoreColorsDialog=null;this._oItemNavigation=null};D.prototype.exit=function(){if(this._oMoreColorsDialog){this._oMoreColorsDialog.destroy();delete this._oMoreColorsDialog}if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}};D.prototype.setColors=function(t){t=this.validateProperty("colors",t);if(t.length<y||t.length>B){throw new Error("Cannot set property 'colors' - array must has minimum 2 and maximum 15 elements")}return this.setProperty("colors",t)};D.prototype.ontap=function(t){var e=p(t.target),o,r;r=e.closest("."+c);if(!r.length){return}o=r.attr("data-sap-ui-color");this._fireColorSelect(o,false,t)};D.prototype.onsaptabnext=D.prototype.onsaptabprevious=function(t){var e=this._getElementInfo(t.target);if(e.bIsMoreColorsButton){this.fireEvent("_colorNotSelected",{_originalEvent:t});return}if(e.bIsDefaultColorButton){this._fireColorSelect(this._getDefaultColor(),true,t);return}D.prototype.ontap.apply(this,arguments)};D.prototype.onsapenter=D.prototype.ontap;D.prototype.onsapspace=function(t){t.preventDefault()};D.prototype.onkeyup=function(t){if(t.which===h.SPACE){t.preventDefault();D.prototype.ontap.apply(this,arguments)}};D.prototype.onsaphome=D.prototype.onsapend=function(t){var e=this._getElementInfo(t.target);if(e.bIsDefaultColorButton||e.bIsMoreColorsButton){t.preventDefault();t.stopImmediatePropagation(true)}};D.prototype.onAfterRendering=function(){this._ensureItemNavigation()};D.prototype._createDefaultColorButton=function(){return new n(this.getId()+"-btnDefaultColor",{width:"100%",type:d.Transparent,text:v.getText("COLOR_PALETTE_DEFAULT_COLOR"),visible:this._getShowDefaultColorButton(),press:function(t){this._fireColorSelect(this._getDefaultColor(),true,t)}.bind(this)})};D.prototype._getDefaultColor=function(){return this._oDefaultColor};D.prototype._setDefaultColor=function(t){if(!f.isValid(t)){throw new Error("Cannot set internal property '_defaultColor' - invalid value: "+t)}this._oDefaultColor=t;return this};D.prototype._getShowDefaultColorButton=function(){return this._bShowDefaultColorButton};D.prototype._setShowDefaultColorButton=function(t){if(!_.isValid(t)){throw new Error("Cannot set internal property 'showDefaultColorButton' - invalid value: "+t)}this._bShowDefaultColorButton=t;if(t&&!this._getDefaultColorButton()){this.setAggregation("_defaultColorButton",this._createDefaultColorButton())}if(this._getDefaultColorButton()){this._getDefaultColorButton().setVisible(t)}return this};D.prototype._getDefaultColorButton=function(){return this.getAggregation("_defaultColorButton")};D.prototype._createMoreColorsButton=function(){return new n(this.getId()+"-btnMoreColors",{width:"100%",type:d.Transparent,text:v.getText("COLOR_PALETTE_MORE_COLORS"),visible:this._getShowMoreColorsButton(),press:this._openColorPicker.bind(this)})};D.prototype._getShowMoreColorsButton=function(){return this._bShowMoreColorsButton};D.prototype._setShowMoreColorsButton=function(t){if(!_.isValid(t)){throw new Error("Cannot set internal property 'showMoreColorsButton' - invalid value: "+t)}this._bShowMoreColorsButton=t;if(t&&!this._getMoreColorsButton()){this.setAggregation("_moreColorsButton",this._createMoreColorsButton())}if(this._getMoreColorsButton()){this._getMoreColorsButton().setVisible(t)}return this};D.prototype._getMoreColorsButton=function(){return this.getAggregation("_moreColorsButton")};D.prototype._openColorPicker=function(){this.fireEvent("_beforeOpenColorPicker");this._ensureMoreColorsDialog().open()};D.prototype._ensureMoreColorsDialog=function(){if(!this._oMoreColorsDialog){this._oMoreColorsDialog=this._createMoreColorsDialog()}return this._oMoreColorsDialog};D.prototype._createMoreColorsDialog=function(){var t=new s(this.getId()+"-moreColorsDialog",{stretch:!!e.system.phone,title:v.getText("COLOR_PALETTE_MORE_COLORS_TITLE")}).addStyleClass("CPDialog");this._ensureUnifiedLibrary();t.addContent(t._oColorPicker=new g({mode:C.HSL}));t.setBeginButton(new n({text:v.getText("COLOR_PALETTE_MORE_COLORS_CONFIRM"),press:function(e){t.close();if(t._oColorPicker.getColorString()){this._fireColorSelect(t._oColorPicker.getColorString(),false,e)}}.bind(this)}));t.setEndButton(new n({text:v.getText("COLOR_PALETTE_MORE_COLORS_CANCEL"),press:function(){t.close()}}));return t};D.prototype._ensureUnifiedLibrary=function(){var t;if(!g){sap.ui.getCore().loadLibrary("sap.ui.unified");t=sap.ui.require("sap/ui/unified/library");g=sap.ui.requireSync("sap/ui/unified/ColorPicker");C=t.ColorPickerMode}};D.prototype._focusFirstElement=function(){var t=this._getShowDefaultColorButton()?this._getDefaultColorButton().getDomRef():this._getAllSwatches()[0];t.focus()};D.prototype._fireColorSelect=function(t,e,o){this.fireColorSelect({value:t,defaultAction:e,_originalEvent:o})};D.prototype._ensureItemNavigation=function(){var t=[];if(!this._oItemNavigation){this._oItemNavigation=new I(this);this._oItemNavigation.setColumns(m);this._oItemNavigation.setCycling(false);this.addDelegate(this._oItemNavigation);this._oItemNavigation.attachEvent(i.Events.BorderReached,this._onSwatchContainerBorderReached,this)}t=t.concat(this._getAllSwatches());this._oItemNavigation.setRootDomRef(this.getDomRef("swatchCont"));this._oItemNavigation.setItemDomRefs(t)};D.prototype._onSwatchContainerBorderReached=function(t){var e,o,r=["saphome","sapend"].indexOf(t.getParameter("event").type)>-1;if(t.getParameter(I.BorderReachedDirection)===I.BorderReachedDirectionForward){if(this._getShowMoreColorsButton()){e=this._getMoreColorsButton()}else if(!r&&this._getShowDefaultColorButton()){e=this._getDefaultColorButton()}else if(!r){e=this._getAllSwatches()[0]}}else{if(this._getShowDefaultColorButton()){e=this._getDefaultColorButton()}else if(!r&&this._getShowMoreColorsButton()){e=this._getMoreColorsButton()}else if(!r&&!this._getShowDefaultColorButton()){o=this._getAllSwatches();e=o[o.length-1]}else if(!r){o=this._getAllSwatches();e=o[this._oItemNavigation._getIndexOfTheFirstItemInLastRow()]}}if(e){e.focus()}return e};D.prototype.onsapnext=function(t){var e,o=this._getElementInfo(t.target);if(!(o.bIsDefaultColorButton||o.bIsMoreColorsButton)){return}t.preventDefault();t.stopImmediatePropagation(true);if(o.bIsDefaultColorButton){e=this._getAllSwatches()[0]}else{e=this._getShowDefaultColorButton()?this._getDefaultColorButton():this._getAllSwatches()[0]}e.focus()};D.prototype.onsapprevious=function(t){var e,o=this._getElementInfo(t.target),r;if(!(o.bIsDefaultColorButton||o.bIsMoreColorsButton)){return}t.preventDefault();t.stopImmediatePropagation(true);r=this._getAllSwatches();if(o.bIsMoreColorsButton){e=t.keyCode===h.ARROW_UP?r[this._oItemNavigation._getIndexOfTheFirstItemInLastRow()]:r[r.length-1]}else{e=this._getShowMoreColorsButton()?this._getMoreColorsButton():r[this._oItemNavigation._getIndexOfTheFirstItemInLastRow()]}e.focus()};D.prototype._getAllSwatches=function(){return this.$().find("."+c).get()};D.prototype._getElementInfo=function(t){var e=this._getShowDefaultColorButton()&&u(t,this._getDefaultColorButton().getDomRef()),o=!e&&this._getShowMoreColorsButton()&&u(t,this._getMoreColorsButton().getDomRef()),r=!o&&!e&&p(t).hasClass(c);return{bIsDefaultColorButton:e,bIsMoreColorsButton:o,bIsASwatch:r}};var I=i.extend("sap.m.ItemNavigationHomeEnd",{constructor:function(){i.apply(this,arguments);this.setHomeEndColumnMode(true);this.fireEvent=function(t,e){var o;if(t===i.Events.BorderReached){o=I.BorderReachedDirectionBackward;if(["sapnext","sapend"].indexOf(e.event.type)>-1){o=I.BorderReachedDirectionForward}e[I.BorderReachedDirection]=o}i.prototype.fireEvent.apply(this,arguments)}}});I.BorderReachedDirection="direction";I.BorderReachedDirectionForward="BorderReachedDirectionForward";I.BorderReachedDirectionBackward="BorderReachedDirectionBackward";I.prototype.getColumns=function(){return this.iColumns};I.prototype.onsapprevious=function(t){var e=u(this.getRootDomRef(),t.target),o=t.keyCode===h.ARROW_UP&&this.getFocusedIndex()===0;if(!e){return}if(!o){i.prototype.onsapprevious.apply(this,arguments);return}t.preventDefault();this.fireEvent(i.Events.BorderReached,{index:0,event:t})};I.prototype.onsapnext=function(t){var e=u(this.getRootDomRef(),t.target),o,r,n;if(!e){return}if(t.keyCode!==h.ARROW_DOWN){i.prototype.onsapnext.apply(this,arguments);return}r=this.getFocusedIndex();n=this._getItemInfo(r);if(n.bIsLastItem&&n.bIsInTheLastColumn){t.preventDefault();this.fireEvent(i.Events.BorderReached,{index:r,event:t});return}if(n.bNextRowExists&&!n.bItemSameColumnNextRowExists){t.preventDefault();o=this.getItemDomRefs();o[o.length-1].focus();return}i.prototype.onsapnext.apply(this,arguments)};I.prototype.onsaphome=function(t){var e=u(this.getRootDomRef(),t.target),o;if(!e){return}o=this._getItemInfo(this.getFocusedIndex());if(!o.bIsInTheFirstColumn){i.prototype.onsaphome.apply(this,arguments);return}t.preventDefault();if(o.bIsFirstItem){this.fireEvent(i.Events.BorderReached,{index:0,event:t})}else{this.getItemDomRefs()[0].focus()}};I.prototype.onsapend=function(t){var e=u(this.getRootDomRef(),t.target),o;if(!e){return}o=this._getItemInfo(this.getFocusedIndex());if(!(o.bIsLastItem||o.bIsInTheLastColumn)){i.prototype.onsapend.apply(this,arguments);return}t.preventDefault();if(o.bIsLastItem){this.fireEvent(i.Events.BorderReached,{index:this.getItemDomRefs().length-1,event:t})}else{this.getItemDomRefs()[this.getItemDomRefs().length-1].focus()}};I.prototype._getItemInfo=function(t){var e=this.getItemDomRefs().length,o=t===e-1,r=e>this.getColumns()?this.getColumns():e,i=t%this.getColumns()===0,n=(t+1)%r===0,s=Math.floor(t/this.getColumns())+1,a,l;a=s*this.getColumns()<e;l=a&&t+this.getColumns()<e;return{bIsFirstItem:t===0,bIsLastItem:o,bIsInTheLastColumn:n,bIsInTheFirstColumn:i,bNextRowExists:a,bItemSameColumnNextRowExists:l}};I.prototype._getIndexOfTheFirstItemInLastRow=function(){return Math.floor((this.getItemDomRefs().length-1)/this.getColumns())*this.getColumns()};D.prototype._ItemNavigation=I;D.prototype._ColorsHelper={RGB_TO_NAMED_COLORS_MAP:{"#FFB200":"gold","#FF8C00":"darkorange","#CD5C5C":"indianred","#8B008B":"darkmagenta","#6495ED":"cornflowerblue","#00BFFF":"deepskyblue","#008B8B":"darkcyan","#6B8E23":"olivedrab","#2F4F4F":"darkslategray","#F0FFFF":"azure","#FFFFFF":"white","#D3D3D3":"lightgray","#A9A9A9":"darkgray","#696969":"dimgray","#000000":"black"},NAME_COLORS_TO_RGB_MAP:{gold:"#FFB200",darkorange:"#FF8C00",indianred:"#CD5C5C",darkmagenta:"#8B008B",cornflowerblue:"#6495ED",deepskyblue:"#00BFFF",darkcyan:"#008B8B",olivedrab:"#6B8E23",darkslategray:"#2F4F4F",azure:"#F0FFFF",white:"#FFFFFF",lightgray:"#D3D3D3",darkgray:"#A9A9A9",dimgray:"#696969",black:"#000000"},getNamedColor:function(t){var e="";if(!t||t.toLowerCase().indexOf("hsl")!==-1){return undefined}if(t.indexOf("#")===-1){return this.NAME_COLORS_TO_RGB_MAP[t.toLowerCase()]?t.toLowerCase():undefined}if(t.length===4){e=["#",t[1],t[1],t[2],t[2],t[3],t[3]].join("")}else{e=t}e=e.toUpperCase();return this.RGB_TO_NAMED_COLORS_MAP[e]}};return D});