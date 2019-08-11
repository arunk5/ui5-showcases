/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Core","sap/ui/core/Control","sap/ui/Device","sap/ui/core/ResizeHandler","sap/ui/core/library","sap/ui/core/HTML","sap/m/ScrollContainer","sap/ui/core/theming/Parameters","sap/ui/dom/units/Rem","./CarouselRenderer","./CarouselLayout","sap/ui/events/KeyCodes","sap/base/Log","sap/ui/events/F6Navigation","sap/ui/thirdparty/jquery","sap/ui/thirdparty/mobify-carousel","sap/ui/core/IconPool"],function(e,t,i,s,o,a,r,n,h,u,l,p,f,g,c,d){"use strict";var _=a.BusyIndicatorSize;var y=e.ImageHelper;var m=e.CarouselArrowsPlacement;var C=e.PlacementType;var P=i.extend("sap.m.Carousel",{metadata:{library:"sap.m",designtime:"sap/m/designtime/Carousel.designtime",properties:{height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},loop:{type:"boolean",group:"Misc",defaultValue:false},showPageIndicator:{type:"boolean",group:"Appearance",defaultValue:true},pageIndicatorPlacement:{type:"sap.m.PlacementType",group:"Appearance",defaultValue:C.Bottom},showBusyIndicator:{type:"boolean",group:"Appearance",defaultValue:true,deprecated:true},arrowsPlacement:{type:"sap.m.CarouselArrowsPlacement",group:"Appearance",defaultValue:m.Content}},defaultAggregation:"pages",aggregations:{pages:{type:"sap.ui.core.Control",multiple:true,singularName:"page"},customLayout:{type:"sap.m.CarouselLayout",multiple:false}},associations:{activePage:{type:"sap.ui.core.Control",multiple:false}},events:{loadPage:{deprecated:true,parameters:{pageId:{type:"string"}}},unloadPage:{deprecated:true,parameters:{pageId:{type:"string"}}},pageChanged:{parameters:{oldActivePageId:{type:"string"},newActivePageId:{type:"string"},activePages:{type:"array"}}},beforePageChanged:{parameters:{activePages:{type:"array"}}}}}});P._INNER_SELECTOR=".sapMCrslInner";P._PAGE_INDICATOR_SELECTOR=".sapMCrslBulleted";P._PAGE_INDICATOR_ARROWS_SELECTOR=".sapMCrslIndicatorArrow";P._CONTROLS=".sapMCrslControls";P._ITEM_SELECTOR=".sapMCrslItem";P._LEFTMOST_CLASS="sapMCrslLeftmost";P._RIGHTMOST_CLASS="sapMCrslRightmost";P._LATERAL_CLASSES="sapMCrslLeftmost sapMCrslRightmost";P._MODIFIERNUMBERFORKEYBOARDHANDLING=10;P._BULLETS_TO_NUMBERS_THRESHOLD=9;P._PREVIOUS_CLASS_ARROW="sapMCrslPrev";P._NEXT_CLASS_ARROW="sapMCrslNext";P.prototype.init=function(){this._aScrollContainers=[];this._fnAdjustAfterResize=d.proxy(function(){var e=this.$().find(P._INNER_SELECTOR);this._oMobifyCarousel.resize(e);this._setWidthOfPages(this._getNumberOfItemsToShow())},this);this._aOrderOfFocusedElements=[];this._aAllActivePages=[];this._aAllActivePagesIndexes=[];this._onBeforePageChangedRef=this._onBeforePageChanged.bind(this);this._onAfterPageChangedRef=this._onAfterPageChanged.bind(this);this.data("sap-ui-fastnavgroup","true",true);this._oRb=t.getLibraryResourceBundle("sap.m")};P.prototype.exit=function(){if(this._oMobifyCarousel){this._oMobifyCarousel.destroy();delete this._oMobifyCarousel}if(this._oArrowLeft){this._oArrowLeft.destroy();delete this._oArrowLeft}if(this._oArrowRight){this._oArrowRight.destroy();delete this._oArrowRight}if(this._sResizeListenerId){o.deregister(this._sResizeListenerId);this._sResizeListenerId=null}this.$().off("afterSlide");this._cleanUpScrollContainer();this._fnAdjustAfterResize=null;this._aScrollContainers=null;this._$InnerDiv=null;this._aOrderOfFocusedElements=null;this._aAllActivePages=null;this._aAllActivePagesIndexes=null};P.prototype._cleanUpScrollContainer=function(){var e;while(this._aScrollContainers&&this._aScrollContainers.length>0){e=this._aScrollContainers.pop();e.destroyContent();if(e&&typeof e.destroy==="function"){e.destroy()}}};P.prototype.ontouchstart=function(e){if(this._oMobifyCarousel){this._oMobifyCarousel.touchstart(e)}};P.prototype.ontouchmove=function(e){if(this._oMobifyCarousel){this._oMobifyCarousel.touchmove(e)}};P.prototype.ontouchend=function(e){if(this._oMobifyCarousel){this._oMobifyCarousel.touchend(e)}};P.prototype.onBeforeRendering=function(){var e=this.getActivePage();if(!e&&this.getPages().length>0){this.setAssociation("activePage",this.getPages()[0].getId(),true)}if(this._sResizeListenerId){o.deregister(this._sResizeListenerId);this._sResizeListenerId=null}return this};P.prototype._getNumberOfItemsToShow=function(){var e=this.getPages().length,t=this.getCustomLayout(),i=1;if(t&&t.isA("sap.m.CarouselLayout")){i=Math.max(t.getVisiblePagesCount(),1)}if(i>1&&e<i){return e}return i};P.prototype.onAfterRendering=function(){var e=this._getNumberOfItemsToShow();if(this._oMobifyCarousel){this._oMobifyCarousel.unbind()}this.$().carousel(undefined,{numberOfItemsToShow:e});this._oMobifyCarousel=this.getDomRef()._carousel;this._oMobifyCarousel.setLoop(this.getLoop());this._oMobifyCarousel.setRTL(t.getConfiguration().getRTL());if(e>1){this._setWidthOfPages(e)}var i=this.getActivePage();if(i){this._updateActivePages(i);var s=this._getPageNumber(i);if(isNaN(s)||s==0){if(this.getPages().length>0){this.setAssociation("activePage",this.getPages()[0].getId(),true);this._adjustHUDVisibility(1)}}else{if(t.isThemeApplied()){this._moveToPage(s+1)}else{t.attachThemeChanged(this._handleThemeLoad,this)}if(this.getParent()&&this.getParent().isA("sap.zen.commons.layout.PositionContainer")){if(this._isCarouselUsedWithCommonsLayout===undefined){setTimeout(this["invalidate"].bind(this),0);this._isCarouselUsedWithCommonsLayout=true}}}}this.$().on("beforeSlide",this._onBeforePageChangedRef);this.$().on("afterSlide",this._onAfterPageChangedRef);this._$InnerDiv=this.$().find(P._INNER_SELECTOR)[0];this._sResizeListenerId=o.register(this._$InnerDiv,this._fnAdjustAfterResize);this.$().find(".sapMCrslItemTableCell").focus(function(e){e.preventDefault();d(e.target).parents(".sapMCrsl").focus();return false});var a="sap.m.IconTabBar";var r=this.getParent();while(r){if(r.getMetadata().getName()==a){var n=this;r.attachExpand(function(e){var t=e.getParameter("expand");if(t&&s>0){n._moveToPage(s+1)}});break}r=r.getParent()}};P.prototype._onBeforePageChanged=function(e,t,i){if(e.target!==this.getDomRef()){return}var s=this.getPages()[i-1].getId();this._updateActivePages(s);this.fireBeforePageChanged({activePages:this._aAllActivePagesIndexes})};P.prototype._onAfterPageChanged=function(e,t,i){if(e.target!==this.getDomRef()){return}if(i>0){this._changePage(t,i)}};P.prototype._setWidthOfPages=function(e){var t=this._calculatePagesWidth(e);this.$().find(".sapMCrslItem").each(function(e,i){i.style.width=t+"%"})};P.prototype._calculatePagesWidth=function(e){var t=this.$().width(),i=u.toPx(h.get("_sap_m_Carousel_PagesMarginRight")),s=(t-i*(e-1))/e,o=s/t*100;return o};P.prototype._handleThemeLoad=function(){var e=this.getActivePage();if(e){var i=this._getPageNumber(e);if(i>0){this._moveToPage(i+1)}}t.detachThemeChanged(this._handleThemeLoad,this)};P.prototype._moveToPage=function(e){this._oMobifyCarousel.changeAnimation("sapMCrslNoTransition");this._oMobifyCarousel.move(e);this._changePage(undefined,e)};P.prototype._changePage=function(e,t){this._adjustHUDVisibility(t);var i=this.getActivePage();if(e){i=this.getPages()[e-1].getId()}var o=this.getPages()[t-1].getId();this.setAssociation("activePage",o,true);var a=this._getPageIndicatorText(t);g.debug("sap.m.Carousel: firing pageChanged event: old page: "+i+", new page: "+o);if(!s.system.desktop){d(document.activeElement).blur()}this.firePageChanged({oldActivePageId:i,newActivePageId:o,activePages:this._aAllActivePagesIndexes});this.$("slide-number").text(a)};P.prototype._getPageIndicatorText=function(e){return this._oRb.getText("CAROUSEL_PAGE_INDICATOR_TEXT",[e,this.getPages().length-this._getNumberOfItemsToShow()+1])};P.prototype._adjustHUDVisibility=function(e){var t=this._getNumberOfItemsToShow();if(s.system.desktop&&!this.getLoop()&&this.getPages().length>1){var i=this.$("hud");i.removeClass(P._LATERAL_CLASSES);if(e===1){i.addClass(P._LEFTMOST_CLASS);this._focusCarouselContainer(i,P._PREVIOUS_CLASS_ARROW)}if(e+t-1===this.getPages().length){i.addClass(P._RIGHTMOST_CLASS);this._focusCarouselContainer(i,P._NEXT_CLASS_ARROW)}}};P.prototype._focusCarouselContainer=function(e,t){if(e.find("."+t)[0]===document.activeElement){this.focus()}};P.prototype.setActivePage=function(e){var t=null;if(typeof e=="string"){t=e}else if(e instanceof i){t=e.getId()}if(t){if(t===this.getActivePage()){return this}var s=this._getPageNumber(t);if(!isNaN(s)){if(this._oMobifyCarousel){this._oMobifyCarousel.move(s+1)}}}this.setAssociation("activePage",t,true);return this};P.prototype.setHeight=function(e){this.setProperty("height",e,true);this.$().css("height",e);return this};P.prototype.setWidth=function(e){this.setProperty("width",e,true);this.$().css("width",e);return this};P.prototype.setLoop=function(e){this.setProperty("loop",e,true);if(this._oMobifyCarousel){this._oMobifyCarousel.setLoop(e)}return this};P.prototype._getNavigationArrow=function(e){var t={src:"sap-icon://slim-arrow-"+e,useIconTooltip:false};if(e==="left"){if(!this._oArrowLeft){this._oArrowLeft=y.getImageControl(this.getId()+"-arrowScrollLeft",this._oArrowLeft,this,t)}return this._oArrowLeft}else if(e==="right"){if(!this._oArrowRight){this._oArrowRight=y.getImageControl(this.getId()+"-arrowScrollRight",this._oArrowRight,this,t)}return this._oArrowRight}};P.prototype._createScrollContainer=function(e){var i;var o=s.system.desktop&&this.getArrowsPlacement()===m.PageIndicator;if(o){i="sapMCrslImg"}else{i="sapMCrslImgNoArrows"}var a=e.isA("sap.m.Image")?"sapMCrslItemTableCell "+i:"sapMCrslItemTableCell",h=new r({content:"<div class='sapMCrslItemTable'>"+"<div class='"+a+"'></div>"+"</div>",afterRendering:function(i){var s=t.createRenderManager();e.addStyleClass("sapMCrsPage");s.render(e,this.getDomRef().firstChild);s.destroy();e=null}});var u=new n({horizontal:false,vertical:false,content:[h],width:"100%",height:"100%"});u.setParent(this,null,true);this._aScrollContainers.push(u);return u};P.prototype.previous=function(){if(this._oMobifyCarousel){this._oMobifyCarousel.prev()}else{g.warning("Unable to execute sap.m.Carousel.previous: carousel must be rendered first.")}return this};P.prototype.next=function(){if(this._oMobifyCarousel){this._oMobifyCarousel.next()}else{g.warning("Unable to execute sap.m.Carousel.next: carousel must be rendered first.")}return this};P.prototype._getPageNumber=function(e){var t,i;for(t=0;t<this.getPages().length;t++){if(this.getPages()[t].getId()==e){i=t;break}}return i};P.prototype.onsaptabprevious=function(e){this._bDirection=false;this._fnOnTabPress(e)};P.prototype.onsaptabnext=function(e){this._bDirection=true;this._fnOnTabPress(e)};P.prototype.onfocusin=function(e){this.saveLastFocusReference(e);this._bDirection=undefined};P.prototype.onsapskipforward=function(e){e.preventDefault();this._handleGroupNavigation(e,false)};P.prototype.onsapskipback=function(e){e.preventDefault();this._handleGroupNavigation(e,true)};P.prototype.onkeydown=function(e){if(e.keyCode==f.F7){this._handleF7Key(e);return}if(e.target!=this.getDomRef()){return}switch(e.keyCode){case 189:case f.NUMPAD_MINUS:this._fnSkipToIndex(e,-1);break;case f.PLUS:case f.NUMPAD_PLUS:this._fnSkipToIndex(e,1);break}};P.prototype.onsapescape=function(e){var t;if(e.target===this.$()[0]&&this._lastActivePageNumber){t=this._lastActivePageNumber+1;this._oMobifyCarousel.move(t);this._changePage(undefined,t)}};P.prototype.onsapright=function(e){this._fnSkipToIndex(e,1)};P.prototype.onsapup=function(e){this._fnSkipToIndex(e,-1)};P.prototype.onsapleft=function(e){this._fnSkipToIndex(e,-1)};P.prototype.onsapdown=function(e){this._fnSkipToIndex(e,1)};P.prototype.onsaphome=function(e){this._fnSkipToIndex(e,0)};P.prototype.onsapend=function(e){this._fnSkipToIndex(e,this.getPages().length)};P.prototype.onsaprightmodifiers=function(e){if(e.ctrlKey){this._fnSkipToIndex(e,P._MODIFIERNUMBERFORKEYBOARDHANDLING)}};P.prototype.onsapupmodifiers=function(e){if(e.ctrlKey){this._fnSkipToIndex(e,P._MODIFIERNUMBERFORKEYBOARDHANDLING)}};P.prototype.onsappageup=function(e){this._fnSkipToIndex(e,P._MODIFIERNUMBERFORKEYBOARDHANDLING)};P.prototype.onsapleftmodifiers=function(e){if(e.ctrlKey){this._fnSkipToIndex(e,-P._MODIFIERNUMBERFORKEYBOARDHANDLING)}};P.prototype.onsapdownmodifiers=function(e){if(e.ctrlKey){this._fnSkipToIndex(e,-P._MODIFIERNUMBERFORKEYBOARDHANDLING)}};P.prototype.onsappagedown=function(e){this._fnSkipToIndex(e,-P._MODIFIERNUMBERFORKEYBOARDHANDLING)};P.prototype._fnOnTabPress=function(e){if(e.target===this.$()[0]){this._lastActivePageNumber=this._getPageNumber(this.getActivePage())}};P.prototype._handleGroupNavigation=function(e,t){var i=d.Event("keydown");e.preventDefault();this.$().focus();i.target=e.target;i.keyCode=f.F6;i.shiftKey=t;c.handleF6GroupNavigation(i)};P.prototype.saveLastFocusReference=function(e){var t=d(e.target).closest(".sapMCrsPage").control(0),i;if(this._bDirection===undefined){return}if(this._lastFocusablePageElement===undefined){this._lastFocusablePageElement={}}if(t){i=t.getId();this._lastFocusablePageElement[i]=e.target;this._updateFocusedPagesOrder(i)}};P.prototype._getActivePageLastFocusedElement=function(){if(this._lastFocusablePageElement){return this._lastFocusablePageElement[this._getLastFocusedActivePage()]}};P.prototype._updateFocusedPagesOrder=function(e){var t=this._aOrderOfFocusedElements.indexOf(e);if(t>-1){this._aOrderOfFocusedElements.splice(0,0,this._aOrderOfFocusedElements.splice(t,1)[0])}else{this._aOrderOfFocusedElements.unshift(e)}};P.prototype._updateActivePages=function(e){var t=this._getPageNumber(e),i=this._getNumberOfItemsToShow(),s=t+i,o=this.getPages();if(s>o.length){s=o.length-i}this._aAllActivePages=[];this._aAllActivePagesIndexes=[];for(var a=t;a<s;a++){this._aAllActivePages.push(o[a].getId());this._aAllActivePagesIndexes.push(a)}};P.prototype._getLastFocusedActivePage=function(){for(var e=0;e<this._aOrderOfFocusedElements.length;e++){var t=this._aOrderOfFocusedElements[e];if(this._aAllActivePages.indexOf(t)>-1){return t}}return this.getActivePage()};P.prototype._fnSkipToIndex=function(e,t){var i=t;if(e.target!==this.getDomRef()){return}e.preventDefault();if(t!==0){i=this._getPageNumber(this.getActivePage())+1+t}this._oMobifyCarousel.move(i)};P.prototype._handleF7Key=function(e){var t;e.preventDefault();t=this._getActivePageLastFocusedElement();if(e.target===this.$()[0]&&t){t.focus()}else{this.$().focus()}};P.prototype.setShowBusyIndicator=function(){g.warning("sap.m.Carousel: Deprecated function 'setShowBusyIndicator' called. Does nothing.");return this};P.prototype.getShowBusyIndicator=function(){g.warning("sap.m.Carousel: Deprecated function 'getShowBusyIndicator' called. Does nothing.");return false};P.prototype.setBusyIndicatorSize=function(e){if(!(e in _)){e=_.Medium}return i.prototype.setBusyIndicatorSize.call(this,e)};return P});