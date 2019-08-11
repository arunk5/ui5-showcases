/*
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/Object","sap/ui/thirdparty/URI","sap/base/util/Version","sap/base/Log","sap/ui/dom/includeStylesheet","sap/base/i18n/ResourceBundle","sap/base/util/uid","sap/base/util/isPlainObject","sap/base/util/LoaderExtensions"],function(e,t,n,i,a,o,r,s,u,f){"use strict";var c=/\{\{([^\}\}]+)\}\}/g;function p(e){var t=i(e);return t.getSuffix()?i(t.getMajor()+"."+t.getMinor()+"."+t.getPatch()):t}function l(e,t){for(var n in e){if(!e.hasOwnProperty(n)){continue}var i=e[n];switch(typeof i){case"object":if(i){l(i,t)}break;case"string":t(e,n,i);break;default:}}}function h(e,t){if(e&&t&&typeof t==="string"&&t[0]==="/"){var n=t.substring(1).split("/"),i;for(var a=0,o=n.length;a<o;a++){i=n[a];e=e.hasOwnProperty(i)?e[i]:undefined;if(e===null||typeof e!=="object"){if(a+1<o&&e!==undefined){e=undefined}break}}return e}return e&&e[t]}function d(e){if(e&&typeof e==="object"&&!Object.isFrozen(e)){Object.freeze(e);for(var t in e){if(e.hasOwnProperty(t)){d(e[t])}}}}var g=t.extend("sap.ui.core.Manifest",{constructor:function(i,a){t.apply(this,arguments);this._uid=s();this._iInstanceCount=0;this._bIncludesLoaded=false;this._oRawManifest=i;this._bProcess=!(a&&a.process===false);this._bAsync=!(a&&a.async===false);this._sComponentName=a&&a.componentName;var o=this.getComponentName(),r=a&&a.baseUrl||o&&sap.ui.require.toUrl(o.replace(/\./g,"/"))+"/";if(r){this._oBaseUri=new n(r).absoluteTo(new n(document.baseURI).search(""))}if(a&&typeof a.url==="string"){this._oManifestBaseUri=new n(a.url).absoluteTo(new n(document.baseURI).search("")).search("")}else{this._oManifestBaseUri=this._oBaseUri}d(this._oRawManifest);this._oManifest=e.extend(true,{},this._oRawManifest);if(this._bProcess){this._processI18n()}},_processI18n:function(e){var t=[];l(this._oManifest,function(e,n,i){var a=i.match(c);if(a){t.push({object:e,key:n})}});if(t.length>0){var n=function(e){var n=function(t,n){return e.getText(n)};for(var i=0,a=t.length;i<a;i++){var o=t[i];o.object[o.key]=o.object[o.key].replace(c,n)}};if(e){return this._loadI18n(e).then(n)}else{n(this._loadI18n(e))}}else{return e?Promise.resolve():undefined}},_loadI18n:function(e){var t=this._oRawManifest,i=t["sap.app"]&&t["sap.app"]["i18n"]||"i18n/i18n.properties",a=new n(i);return r.create({url:this._resolveUri(a,"manifest").toString(),async:e})},getJson:function(){return this._oManifest},getRawJson:function(){return this._oRawManifest},getEntry:function(e){if(!e||e.indexOf(".")<=0){a.warning("Manifest entries with keys without namespace prefix can not be read via getEntry. Key: "+e+", Component: "+this.getComponentName());return null}var t=this.getJson();var n=h(t,e);if(e&&e[0]!=="/"&&!u(n)){a.warning("Manifest entry with key '"+e+"' must be an object. Component: "+this.getComponentName());return null}return n},checkUI5Version:function(){var e=this.getEntry("/sap.ui5/dependencies/minUI5Version");if(e&&a.isLoggable(a.Level.WARNING)&&sap.ui.getCore().getConfiguration().getDebug()){sap.ui.getVersionInfo({async:true}).then(function(t){var n=p(e);var i=p(t&&t.version);if(n.compareTo(i)>0){a.warning('Component "'+this.getComponentName()+'" requires at least version "'+n.toString()+'" but running on "'+i.toString()+'"!')}}.bind(this),function(e){a.warning('The validation of the version for Component "'+this.getComponentName()+'" failed! Reasion: '+e)}.bind(this))}},loadIncludes:function(){if(this._bIncludesLoaded){return}var e=this.getEntry("/sap.ui5/resources");if(!e){return}var t=this.getComponentName();var n=e["js"];if(n){for(var i=0;i<n.length;i++){var r=n[i];var s=r.uri;if(s){var u=s.match(/\.js$/i);if(u){var f=t.replace(/\./g,"/")+(s.slice(0,1)==="/"?"":"/")+s.slice(0,u.index);a.info('Component "'+t+'" is loading JS: "'+f+'"');sap.ui.requireSync(f)}}}}var c=e["css"];if(c){for(var p=0;p<c.length;p++){var l=c[p];if(l.uri){var h=this.resolveUri(l.uri);a.info('Component "'+t+'" is loading CSS: "'+h+'"');o(h,{id:l.id,"data-sap-ui-manifest-uid":this._uid})}}}this._bIncludesLoaded=true},removeIncludes:function(){if(!this._bIncludesLoaded){return}var e=this.getEntry("/sap.ui5/resources");if(!e){return}var t=this.getComponentName();var n=e["css"];if(n){var i=document.querySelectorAll("link[data-sap-ui-manifest-uid='"+this._uid+"']");for(var o=0;o<i.length;o++){var r=i[o];a.info('Component "'+t+'" is removing CSS: "'+r.href+'"');r.parentNode.removeChild(r)}}this._bIncludesLoaded=false},loadDependencies:function(){var e=this.getEntry("/sap.ui5/dependencies"),t=this.getComponentName();if(e){var n=e["libs"];if(n){for(var i in n){if(!n[i].lazy){a.info('Component "'+t+'" is loading library: "'+i+'"');sap.ui.getCore().loadLibrary(i)}}}var o=e["components"];if(o){for(var r in o){if(!o[r].lazy){var s=r.replace(/\./g,"/")+"/Component";var u=sap.ui.loader._.getModuleState(s+".js");if(u===-1){sap.ui.requireSync(s)}else if(u===0){a.info('Component "'+t+'" is loading component: "'+r+'.Component"');sap.ui.requireSync("sap/ui/core/Component");sap.ui.component.load({name:r})}}}}}},defineResourceRoots:function(){var e=this.getEntry("/sap.ui5/resourceRoots");if(e){for(var t in e){var i=e[t];var o=new n(i);if(o.is("absolute")||o.path()&&o.path()[0]==="/"){a.error('Resource root for "'+t+'" is absolute and therefore won\'t be registered! "'+i+'"',this.getComponentName());continue}i=this._resolveUri(o).toString();var r={};r[t.replace(/\./g,"/")]=i;sap.ui.loader.config({paths:r})}}},getComponentName:function(){var e=this.getRawJson();return this._sComponentName||h(e,"/sap.ui5/componentName")||h(e,"/sap.app/id")},resolveUri:function(e,t){var i=this._resolveUri(new n(e),t);return i&&i.toString()},_resolveUri:function(e,t){return g._resolveUriRelativeTo(e,t==="manifest"?this._oManifestBaseUri:this._oBaseUri)},init:function(e){if(this._iInstanceCount===0){this.checkUI5Version();this.defineResourceRoots();this.loadDependencies();this.loadIncludes();this.activateCustomizing()}if(e){this.activateCustomizing(e)}this._iInstanceCount++},exit:function(e){var t=Math.max(this._iInstanceCount-1,0);if(e){this.deactivateCustomizing(e)}if(t===0){this.deactivateCustomizing();this.removeIncludes()}this._iInstanceCount=t},activateCustomizing:function(t){var n=this.getEntry("sap.ui5",true),i=n&&n["extends"]&&n["extends"].extensions;if(!e.isEmptyObject(i)){var a=sap.ui.requireSync("sap/ui/core/CustomizingConfiguration");if(!t){a.activateForComponent(this.getComponentName())}else{a.activateForComponentInstance(t)}}},deactivateCustomizing:function(e){var t=sap.ui.require("sap/ui/core/CustomizingConfiguration");if(t){if(!e){t.deactivateForComponent(this.getComponentName())}else{t.deactivateForComponentInstance(e)}}}});g._resolveUriRelativeTo=function(e,t){if(e.is("absolute")||e.path()&&e.path()[0]==="/"){return e}var i=new n(document.baseURI).search("");t=t.absoluteTo(i);return e.absoluteTo(t).relativeTo(i)};g.load=function(e){var t=e&&e.manifestUrl,i=e&&e.componentName,o=e&&e.async,r=e&&e.failOnError;var s=new n(t);["sap-language","sap-client"].forEach(function(e){if(!s.hasQuery(e)){var t=sap.ui.getCore().getConfiguration().getSAPParam(e);if(t){s.addQuery(e,t)}}});t=s.toString();a.info("Loading manifest via URL: "+t);if(!o){a.warning("Synchronous loading of manifest, due to Manifest.load() call for '"+t+"'. Use parameter 'async' true to avoid this.","SyncXHR",null,function(){return{type:"SyncXHR",name:"Manifest"}})}var u=f.loadResource({url:t,dataType:"json",async:typeof o!=="undefined"?o:false,headers:{"Accept-Language":sap.ui.getCore().getConfiguration().getLanguageTag()},failOnError:typeof r!=="undefined"?r:true});var c={componentName:i,url:t,process:false};if(o){return u.then(function(e){return new g(e,c)})}return new g(u,c)};return g});