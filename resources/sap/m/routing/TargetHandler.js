/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/InstanceManager","sap/m/NavContainer","sap/m/SplitContainer","sap/ui/base/Object","sap/ui/core/routing/History","sap/ui/Device","sap/base/Log"],function(e,t,i,a,s,o,r){"use strict";var n=a.extend("sap.m.routing.TargetHandler",{constructor:function(e){this._aQueue=[];this._oNavigationOrderPromise=Promise.resolve();if(e===undefined){this._bCloseDialogs=true}else{this._bCloseDialogs=!!e}}});n.prototype.setCloseDialogs=function(e){this._bCloseDialogs=!!e;return this};n.prototype.getCloseDialogs=function(){return this._bCloseDialogs};n.prototype.addNavigation=function(e){this._aQueue.push(e)};n.prototype.navigate=function(e){var t=this._createResultingNavigations(e.navigationIdentifier),i=false,a=this._getDirection(e),s;while(t.length){s=this._applyNavigationResult(t.shift().oParams,a);i=i||s}if(i){this._closeDialogs()}};n.prototype._chainNavigation=function(e){this._oNavigationOrderPromise=this._oNavigationOrderPromise.then(e);return this._oNavigationOrderPromise};n.prototype._getDirection=function(e){var t=e.viewLevel,i=s.getInstance(),a=false;if(e.direction==="Backwards"){a=true}else if(isNaN(t)||isNaN(this._iCurrentViewLevel)||t===this._iCurrentViewLevel){if(e.askHistory){a=i.getDirection()==="Backwards"}}else{a=t<this._iCurrentViewLevel}this._iCurrentViewLevel=t;return a};n.prototype._createResultingNavigations=function(e){var a,s,r,n,g,l=[],u,p,f,c,h;while(this._aQueue.length){s=false;r=this._aQueue.shift();n=r.targetControl;p=n instanceof i;f=n instanceof t;u=r.view;g={oContainer:n,oParams:r,bIsMasterPage:p&&!!n.getMasterPage(u.getId())};c=p&&r.preservePageInSplitContainer&&n.getCurrentPage(g.bIsMasterPage)&&e!==r.navigationIdentifier;if(!(f||p)||!u){continue}for(a=0;a<l.length;a++){h=l[a];if(h.oContainer!==n){continue}if(f||o.system.phone){l.splice(a,1);l.push(g);s=true;break}if(h.bIsMasterPage===g.bIsMasterPage){if(c){break}l.splice(a,1);l.push(g);s=true;break}}if(n instanceof i&&!o.system.phone){g.bIsMasterPage=!!n.getMasterPage(u.getId())}if(!s){if(!!n.getCurrentPage(g.bIsMasterPage)&&c){continue}l.push(g)}}return l};n.prototype._applyNavigationResult=function(e,t){var a=e.targetControl,s,o=e.eventData,n=e.transition||"",g=e.transitionParameters,l=e.view.getId(),u=a instanceof i&&!!a.getMasterPage(l);if(a.getDomRef()&&a.getCurrentPage(u).getId()===l){r.info("navigation to view with id: "+l+" is skipped since it already is displayed by its targetControl","sap.m.routing.TargetHandler");return false}r.info("navigation to view with id: "+l+" the targetControl is "+a.getId()+" backwards is "+t);if(t){s=a.getPreviousPage(u);if(!s||s.getId()!==l){a.insertPreviousPage(l,n,o)}a.backToPage(l,o,g)}else{a.to(l,n,o,g)}return true};n.prototype._closeDialogs=function(){if(!this._bCloseDialogs){return}if(e.hasOpenPopover()){e.closeAllPopovers()}if(e.hasOpenDialog()){e.closeAllDialogs()}if(e.hasOpenLightBox()){e.closeAllLightBoxes()}};return n});