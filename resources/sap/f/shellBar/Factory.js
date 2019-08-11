/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/m/Title","sap/m/Image","sap/tnt/InfoLabel","./ContentButton","sap/m/MenuButton","sap/m/OverflowToolbar","sap/m/OverflowToolbarButton","sap/f/SearchManager","./ControlSpacer","sap/m/ToolbarSpacer","sap/m/OverflowToolbarLayoutData","./CoPilot","./Accessibility","sap/m/library","sap/ui/core/library","sap/ui/core/theming/Parameters"],function(o,t,e,r,n,i,s,a,l,c,p,h,u,_,C,f,y){"use strict";var S=C.OverflowToolbarPriority;var d=C.ToolbarDesign;var v=C.ButtonType;var w=f.TitleLevel;var T=function(o){this._oContext=o;this._oControls={};this._oAcc=new _;this._alreadyAttachedSearchHandlers=false};T.prototype.getOverflowToolbar=function(){if(!this._oControls.oOverflowToolbar){this._oControls.oOverflowToolbar=new s({design:d.Transparent,style:"Clear"}).addStyleClass("sapFShellBarOTB");this._oControls.oOverflowToolbar._getOverflowButton().addStyleClass("sapFShellBarOverflowButton")}return this._oControls.oOverflowToolbar};T.prototype.getControlSpacer=function(){if(!this._oControls.oControlSpacer){this._oControls.oControlSpacer=(new c).setLayoutData(new h({priority:S.NeverOverflow}))}return this._oControls.oControlSpacer};T.prototype.getToolbarSpacer=function(){if(!this._oControls.oToolbarSpacer){this._oControls.oToolbarSpacer=new p}return this._oControls.oToolbarSpacer};T.prototype.getSecondTitle=function(){if(!this._oControls.oSecondTitle){this._oControls.oSecondTitle=new t({titleStyle:w.H6}).addStyleClass("sapFShellBarSecondTitle").setLayoutData(new h({priority:S.NeverOverflow}))}this._oControls.oSecondTitle._sFontSize=y.get("_sap_f_ShellBar_SecondTitle_FontSize");return this._oControls.oSecondTitle};T.prototype.getAvatarButton=function(){if(!this._oControls.oAvatarButton){this._oControls.oAvatarButton=new n({icon:"none",type:v.Transparent,tooltip:this._oAcc.getEntityTooltip("PROFILE"),iconDensityAware:false,press:function(){this._oContext.fireEvent("avatarPressed",{avatar:this._oControls.oAvatarButton.getAvatar()})}.bind(this)}).addStyleClass("sapFShellBarProfile").setLayoutData(new h({priority:S.NeverOverflow}))}return this._oControls.oAvatarButton};T.prototype.getHomeIcon=function(){if(!this._oControls.oHomeIcon){this._oControls.oHomeIcon=new e({densityAware:false,tooltip:this._oAcc.getEntityTooltip("LOGO"),press:function(){this._oContext.fireEvent("homeIconPressed",{icon:this._oControls.oHomeIcon})}.bind(this)}).addStyleClass("sapFShellBarHomeIcon").setLayoutData(new h({priority:S.NeverOverflow}))}return this._oControls.oHomeIcon};T.prototype.getMegaMenu=function(){if(!this._oControls.oMegaMenu){this._oControls.oMegaMenu=new i({type:v.Transparent,iconDensityAware:false}).addStyleClass("sapFSHMegaMenu").setLayoutData(new h({priority:S.NeverOverflow}))}this._oControls.oMegaMenu._iStaticWidth=36;this._oControls.oMegaMenu._sFontSize=y.get("_sap_f_ShellBar_PrimaryTitle_FontSize");return this._oControls.oMegaMenu};T.prototype.getPrimaryTitle=function(){if(!this._oControls.oPrimaryTitle){this._oControls.oPrimaryTitle=new t({titleStyle:w.H6,level:w.H1}).setLayoutData(new h({priority:S.NeverOverflow})).addStyleClass("sapFShellBarPrimaryTitle")}this._oControls.oPrimaryTitle._iStaticWidth=12;this._oControls.oPrimaryTitle._sFontSize=y.get("_sap_f_ShellBar_PrimaryTitle_FontSize");return this._oControls.oPrimaryTitle};T.prototype.getCopilot=function(){if(!this._oControls.oCopilot){this._oControls.oCopilot=new u({tooltip:this._oAcc.getEntityTooltip("COPILOT"),press:function(){this._oContext.fireEvent("copilotPressed",{image:this._oControls.oCopilot})}.bind(this)}).setLayoutData(new h({priority:S.NeverOverflow}))}return this._oControls.oCopilot};T.prototype.getSearch=function(){if(!this._oControls.oSearch){this._oControls.oSearch=new a({text:"Search",icon:"sap-icon://search",type:v.Transparent,tooltip:this._oAcc.getEntityTooltip("SEARCH"),press:function(){this._oContext.fireEvent("searchButtonPressed",{button:this._oControls.oSearch})}.bind(this)}).setLayoutData(new h({priority:S.Low}))}return this._oControls.oSearch};T.prototype.getManagedSearch=function(){if(!this._oControls.oManagedSearch){this._oControls.oManagedSearch=this._oContext.getSearchManager()._oSearch}return this._oControls.oManagedSearch};T.prototype.getNavButton=function(){if(!this._oControls.oNavButton){this._oControls.oNavButton=new a({icon:"sap-icon://nav-back",type:v.Transparent,tooltip:this._oAcc.getEntityTooltip("BACK"),press:function(){this._oContext.fireEvent("navButtonPressed",{button:this._oControls.oNavButton})}.bind(this)}).setLayoutData(new h({priority:S.NeverOverflow}))}return this._oControls.oNavButton};T.prototype.getMenuButton=function(){if(!this._oControls.oMenuButton){this._oControls.oMenuButton=new a({icon:"sap-icon://menu2",type:v.Transparent,tooltip:this._oAcc.getEntityTooltip("MENU"),press:function(){this._oContext.fireEvent("menuButtonPressed",{button:this._oControls.oMenuButton})}.bind(this)}).setLayoutData(new h({priority:S.NeverOverflow}))}return this._oControls.oMenuButton};T.prototype.getNotifications=function(){if(!this._oControls.oNotifications){this._oControls.oNotifications=new a({text:"Notifications",icon:"sap-icon://bell",type:v.Transparent,tooltip:this._oAcc.getEntityTooltip("NOTIFICATIONS"),press:function(){this._oContext.fireEvent("notificationsPressed",{button:this._oControls.oNotifications})}.bind(this)}).addStyleClass("sapFButtonNotifications").setLayoutData(new h({priority:S.Low}))}return this._oControls.oNotifications};T.prototype.getProductSwitcher=function(){if(!this._oControls.oProductSwitcher){this._oControls.oProductSwitcher=new a({text:"My products",icon:"sap-icon://grid",type:v.Transparent,tooltip:this._oAcc.getEntityTooltip("PRODUCTS"),press:function(){this._oContext.fireEvent("productSwitcherPressed",{button:this._oControls.oProductSwitcher})}.bind(this)}).setLayoutData(new h({priority:S.High})).addStyleClass("sapFShellBarGridButton")}return this._oControls.oProductSwitcher};T.prototype.destroy=function(){Object.keys(this._oControls).forEach(function(o){var t=this._oControls[o];if(t){t.destroy()}}.bind(this))};return T});