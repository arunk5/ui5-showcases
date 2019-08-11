/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/Device","sap/ui/base/Metadata","./ObjectPageSubSection","./library","sap/base/Log"],function(i,e,t,o,s,a){"use strict";var r=t.createClass("sap.uxap._helpers.LazyLoading",{constructor:function(e){this._oObjectPageLayout=e;this._$html=i("html");this._iPreviousScrollTop=0;this._iScrollProgress=0;this._iPreviousScrollTimestamp=0;this._sLazyLoadingTimer=null;this._oPrevSubSectionsInView={};this.setLazyLoadingParameters()}});r.prototype.setLazyLoadingParameters=function(){this.LAZY_LOADING_DELAY=200;this.LAZY_LOADING_EXTRA_PAGE_SIZE=.5;this.LAZY_LOADING_EXTRA_SUBSECTION=this.LAZY_LOADING_DELAY*5;if(this._isPhone()){this.NUMBER_OF_SUBSECTIONS_TO_PRELOAD={FirstRendering:1,ScrollToSection:1}}else if(this._isTablet()){this.NUMBER_OF_SUBSECTIONS_TO_PRELOAD={FirstRendering:2,ScrollToSection:1}}else if(this._isTabletSize()){this.NUMBER_OF_SUBSECTIONS_TO_PRELOAD={FirstRendering:2,ScrollToSection:2}}else{this.NUMBER_OF_SUBSECTIONS_TO_PRELOAD={FirstRendering:3,ScrollToSection:3}}this.LAZY_LOADING_FAST_SCROLLING_THRESHOLD=5};r.prototype._triggerVisibleSubSectionsEvents=function(){this._oPrevSubSectionsInView={};this._oObjectPageLayout._requestAdjustLayout(true);this.doLazyLoading()};r.prototype.lazyLoadDuringScroll=function(i,e,t,o){var s,r,n=false;if(i){if(this._sLazyLoadingTimer){clearTimeout(this._sLazyLoadingTimer)}this._sLazyLoadingTimer=null;this.doLazyLoading();return}this._iScrollProgress=e-this._iPreviousScrollTop;s=Math.round(Math.abs(this._iScrollProgress)/o*100);if(s>=this.LAZY_LOADING_FAST_SCROLLING_THRESHOLD){n=true}this._iPreviousScrollTop=e;this._iPreviousScrollTimestamp=t||0;r=e===0?0:this.LAZY_LOADING_DELAY;if(n&&this._sLazyLoadingTimer){a.debug("ObjectPageLayout :: lazyLoading","delayed by "+r+" ms because of fast scroll");clearTimeout(this._sLazyLoadingTimer);this._sLazyLoadingTimer=null}if(!this._sLazyLoadingTimer){this._sLazyLoadingTimer=setTimeout(this.doLazyLoading.bind(this),r)}};r.prototype.doLazyLoading=function(){var e=this._oObjectPageLayout._getHeightRelatedParameters(),t=this._oObjectPageLayout.getUseIconTabBar(),o=sap.ui.getCore().byId(this._oObjectPageLayout.getSelectedSection()),s=this._oObjectPageLayout._oSectionInfo,r,n,_,L=this._iPreviousScrollTop>=e.iHeaderContentHeight,c,h=-1,l={},u={},g,d,S;_=e.iScreenHeight-(L?e.iAnchorBarHeight:0)-(L?e.iHeaderTitleHeightStickied:0);r=e.iScrollTop;g=Date.now()-this._iPreviousScrollTimestamp;d=g<this.LAZY_LOADING_DELAY/2&&Math.abs(this._iScrollProgress)>5;if(d){if(this._iScrollProgress>=0){S=Math.round(Math.min(this._iScrollProgress*20,_/2))}else{S=-1*Math.round(Math.min(Math.abs(this._iScrollProgress)*20,_/2))}r+=S;a.debug("ObjectPageLayout :: lazyLoading","Visible page shifted from : "+S)}n=r+_;r+=16;i.each(s,i.proxy(function(i,e){if(!e.isSection&&e.sectionReference.getParent()&&e.sectionReference.getParent().getVisible()){if(t&&o&&o.indexOfSubSection(e.sectionReference)<0){return}if(e.positionTop<=n&&r<e.positionBottom-1){u[i]=i;if(!e.loaded){l[i]=i}}else if(!e.loaded&&e.positionTop>n&&e.positionTop<n+_*this.LAZY_LOADING_EXTRA_PAGE_SIZE&&(h==-1||e.positionTop<h)){h=e.positionTop;c=i}}},this));if(h!=-1&&i.isEmptyObject(l)){a.debug("ObjectPageLayout :: lazyLoading","extra section added : "+c);l[c]=c}i.each(l,i.proxy(function(i,e){a.debug("ObjectPageLayout :: lazyLoading","connecting "+e);sap.ui.getCore().byId(e).connectToModels();s[e].loaded=true},this));i.each(u,i.proxy(function(i,e){if(!this._oPrevSubSectionsInView[i]){a.debug("ObjectPageLayout :: lazyLoading","subSectionEnteredViewPort "+e);this._oObjectPageLayout.fireEvent("subSectionEnteredViewPort",{subSection:sap.ui.getCore().byId(e)})}},this));this._oPrevSubSectionsInView=u;if(d){this._sLazyLoadingTimer=setTimeout(this.doLazyLoading.bind(this),this.LAZY_LOADING_DELAY)}else{if(h){this._sLazyLoadingTimer=setTimeout(this.doLazyLoading.bind(this),this.LAZY_LOADING_EXTRA_SUBSECTION)}else{this._sLazyLoadingTimer=null}}};r.prototype.getSubsectionsToPreload=function(i,e){var t,s;if(e){t=this.NUMBER_OF_SUBSECTIONS_TO_PRELOAD.ScrollToSection;s=false}else{t=this.NUMBER_OF_SUBSECTIONS_TO_PRELOAD.FirstRendering;s=true}var a=[];i.some(function(i){if(!s&&e){s=i.getId()==e}if(s&&i instanceof o){if(i.getVisible()&&i._getInternalVisible()){a.push(i);t--}}return t<=0});return a};r.prototype.destroy=function(){if(this._sLazyLoadingTimer){clearTimeout(this._sLazyLoadingTimer)}};r.prototype._isPhone=function(){return s.Utilities.isPhoneScenario(this._oObjectPageLayout._getCurrentMediaContainerRange())};r.prototype._isTablet=function(){return e.system.tablet};r.prototype._isTabletSize=function(){return s.Utilities.isTabletScenario(this._oObjectPageLayout._getCurrentMediaContainerRange())};return r},false);