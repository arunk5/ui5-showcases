/*
 * ! OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/layout/form/SimpleForm","sap/ui/layout/VerticalLayout","sap/ui/layout/HorizontalLayout","./Page","./Button","./Bar","./Title","./Image","./Link","./Text","./Label","./HBox","sap/ui/core/Icon","sap/ui/core/Title","sap/ui/core/CustomData","sap/ui/core/library","sap/ui/layout/library","sap/ui/Device","sap/ui/layout/form/ResponsiveGridLayout","./QuickViewPageRenderer","sap/base/security/encodeURL"],function(e,t,i,a,o,n,r,s,g,u,p,l,c,d,f,h,v,C,y,m,_,P,w,b){"use strict";var k=e.URLHelper;var V=m.form.SimpleFormLayout;var A=y.TitleLevel;var x=e.QuickViewGroupElementType;var N=e.ButtonType;var T=t.extend("sap.m.QuickViewPage",{metadata:{library:"sap.m",properties:{pageId:{type:"string",group:"Misc",defaultValue:""},header:{type:"string",group:"Misc",defaultValue:""},title:{type:"string",group:"Misc",defaultValue:""},titleUrl:{type:"string",group:"Misc",defaultValue:""},crossAppNavCallback:{type:"object",group:"Misc"},description:{type:"string",group:"Misc",defaultValue:""},icon:{type:"string",group:"Misc",defaultValue:""}},defaultAggregation:"groups",aggregations:{groups:{type:"sap.m.QuickViewGroup",multiple:true,singularName:"group",bindable:"bindable"}}}});T.prototype.init=function(){this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");var e=sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getService;if(e){this.oCrossAppNavigator=e("CrossApplicationNavigation")}};T.prototype.onBeforeRendering=function(){this._destroyPageContent();this._createPageContent()};T.prototype.getPageContent=function(){return this._mPageContent};T.prototype.setNavContext=function(e){this._mNavContext=e};T.prototype.getNavContext=function(){return this._mNavContext};T.prototype.setPageTitleControl=function(e){this._oPageTitle=e};T.prototype.getPageTitleControl=function(){return this._oPageTitle};T.prototype._createPage=function(){var e=this._createPageContent();var t=this.getNavContext();var a;if(this._oPage){a=this._oPage;a.destroyContent();a.setCustomHeader(new g)}else{a=this._oPage=new r(t.quickViewId+"-"+this.getPageId(),{customHeader:new g});a.addEventDelegate({onAfterRendering:this.onAfterRenderingPage},this)}if(this.getHeader()===""&&t.quickView.getPages().length===1&&!_.system.phone){a.setShowHeader(false);a.addStyleClass("sapMQuickViewPageWithoutHeader")}if(e.header){a.addContent(e.header)}a.addContent(e.form);var o=a.getCustomHeader();o.addContentMiddle(new u({text:this.getHeader()}).addStyleClass("sapMQuickViewTitle"));if(t.hasBackButton){o.addContentLeft(new s({type:N.Back,tooltip:this._oResourceBundle.getText("PAGE_NAVBUTTON_TEXT"),press:function(){if(t.navContainer){t.quickView._setNavOrigin(null);t.navContainer.back()}}}))}if(t.popover&&_.system.phone){o.addContentRight(new s({icon:i.getIconURI("decline"),press:function(){t.popover.close()}}))}a.addStyleClass("sapMQuickViewPage");return a};T.prototype.onAfterRenderingPage=function(){var e=this.getParent(),i=e instanceof t&&e.isA("sap.m.QuickView");if(i&&!this._oPage.$().firstFocusableDomRef()){this._oPage.$("cont").attr("tabindex",0)}if(this._bItemsChanged){var a=this.getNavContext();if(a){a.quickView._restoreFocus()}this._bItemsChanged=false}};T.prototype._createPageContent=function(){var e=this._createForm();var t=this._getPageHeaderContent();var i=this.getPageTitleControl();if(t&&i){e.addAriaLabelledBy(i)}this._mPageContent={form:e,header:t};return this._mPageContent};T.prototype._createForm=function(){var e=this.getAggregation("groups"),t=new a({maxContainerCols:1,editable:false,layout:V.ResponsiveGridLayout});if(e){for(var i=0;i<e.length;i++){if(e[i].getVisible()){this._renderGroup(e[i],t)}}}return t};T.prototype._getPageHeaderContent=function(){var e,t=new o,i=new n,a=this.getIcon(),r=this.getTitle(),s=this.getDescription(),g=this.getTitleUrl();if(!a&&!r&&!s){return null}if(a){if(this.getIcon().indexOf("sap-icon")==0){e=new h({src:a,decorative:!g,useIconTooltip:false,tooltip:r})}else{e=new p({src:a,decorative:false,tooltip:r}).addStyleClass("sapUiIcon")}e.addStyleClass("sapMQuickViewThumbnail");if(g){e.attachPress(this._crossApplicationNavigation(this))}i.addContent(e)}var d;if(g){d=new l({text:r,href:g,target:"_blank"})}else if(this.getCrossAppNavCallback()){d=new l({text:r});d.attachPress(this._crossApplicationNavigation(this))}else{d=new u({text:r,level:A.H1})}this.setPageTitleControl(d);var f=new c({text:s});t.addContent(d);t.addContent(f);i.addContent(t);return i};T.prototype._renderGroup=function(e,t){var a=e.getAggregation("elements");var o,n,r;if(e.getHeading()){t.addContent(new v({text:e.getHeading(),level:A.H2}))}if(!a){return}var s=this.getNavContext();for(var g=0;g<a.length;g++){o=a[g];if(!o.getVisible()){continue}r=new d({text:o.getLabel()});var u;if(s){u=s.quickViewId}n=o._getGroupElementValue(u);t.addContent(r);if(!n){t.addContent(new c({text:""}));continue}r.setLabelFor(n.getId());if(o.getType()==x.pageLink){n.attachPress(this._attachPressLink(this))}if(o.getType()==x.mobile&&!_.system.desktop){var p=new h({src:i.getIconURI("post"),tooltip:this._oResourceBundle.getText("QUICKVIEW_SEND_SMS"),decorative:false,customData:[new C({key:"phoneNumber",value:o.getValue()})],press:this._mobilePress});var l=new f({items:[n,p]});t.addContent(l)}else{t.addContent(n)}}};T.prototype._crossApplicationNavigation=function(e){return function(){if(e.getCrossAppNavCallback()&&e.oCrossAppNavigator){var t=e.getCrossAppNavCallback();if(typeof t=="function"){var i=t();var a=e.oCrossAppNavigator.hrefForExternal({target:{semanticObject:i.target.semanticObject,action:i.target.action},params:i.params});k.redirect(a)}}else if(e.getTitleUrl()){window.open(e.getTitleUrl(),"_blank")}}};T.prototype._destroyPageContent=function(){if(!this._mPageContent){return}if(this._mPageContent.form){this._mPageContent.form.destroy()}if(this._mPageContent.header){this._mPageContent.header.destroy()}this._mPageContent=null};T.prototype.exit=function(){this._oResourceBundle=null;if(this._oPage){this._oPage.destroy();this._oPage=null}else{this._destroyPageContent()}this._mNavContext=null};T.prototype._attachPressLink=function(e){var t=e.getNavContext();return function(e){e.preventDefault();var i=this.getCustomData()[0].getValue();if(t.navContainer&&i){t.quickView._setNavOrigin(this);t.navContainer.to(i)}}};T.prototype._mobilePress=function(){var e="sms://"+b(this.getCustomData()[0].getValue());window.location.replace(e)};T.prototype._updatePage=function(){var e=this.getNavContext();if(e&&e.quickView._bRendered){this._bItemsChanged=true;e.popover.focus();if(e.quickView.indexOfPage(this)==0){e.quickView._clearContainerHeight()}this._createPage();e.popover.$().css("display","block");e.quickView._adjustContainerHeight();e.quickView._restoreFocus()}};["setModel","bindAggregation","setAggregation","insertAggregation","addAggregation","removeAggregation","removeAllAggregation","destroyAggregation"].forEach(function(e){T.prototype["_"+e+"Old"]=T.prototype[e];T.prototype[e]=function(){var t=T.prototype["_"+e+"Old"].apply(this,arguments);this._updatePage();if(["removeAggregation","removeAllAggregation"].indexOf(e)!==-1){return t}return this}});T.prototype.setProperty=function(e,i){var a=this.getQuickViewBase(),o=false;if(a&&a.isA("sap.m.QuickView")){o=true}t.prototype.setProperty.call(this,e,i,o);this._updatePage();return this};T.prototype.getQuickViewBase=function(){var e=this.getParent();if(e&&e.isA("sap.m.QuickViewBase")){return e}return null};return T});