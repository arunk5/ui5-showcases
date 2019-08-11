/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ODataContextBinding","./ODataListBinding","./ODataMetaModel","./ODataPropertyBinding","./SubmitMode","./lib/_GroupLock","./lib/_Helper","./lib/_MetadataRequestor","./lib/_Parser","./lib/_Requestor","sap/base/assert","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/core/library","sap/ui/core/message/Message","sap/ui/model/BindingMode","sap/ui/model/Context","sap/ui/model/Model","sap/ui/model/odata/OperationMode","sap/ui/thirdparty/jquery","sap/ui/thirdparty/URI"],function(e,t,r,o,i,n,s,a,u,p,c,d,h,f,l,g,y,m,w,b,M){"use strict";var v=/^\w+$/,E="sap.ui.model.odata.v4.ODataModel",G=["$count","$expand","$filter","$levels","$orderby","$search","$select"],U=/^(\$auto(\.\w+)?|\$direct|\w+)$/,x=f.MessageType,O=[undefined,x.Success,x.Information,x.Warning,x.Error],$={messageChange:true,sessionTimeout:true},k={annotationURI:true,autoExpandSelect:true,earlyRequests:true,groupId:true,groupProperties:true,odataVersion:true,operationMode:true,serviceUrl:true,supportReferences:true,synchronizationMode:true,updateGroupId:true},P=["$apply","$count","$expand","$filter","$orderby","$search","$select"];var I=m.extend("sap.ui.model.odata.v4.ODataModel",{constructor:function(e){var t,o,n=sap.ui.getCore().getConfiguration().getLanguageTag(),s,u,c,d,h=this;m.apply(this);if(!e||e.synchronizationMode!=="None"){throw new Error("Synchronization mode must be 'None'")}s=e.odataVersion||"4.0";this.sODataVersion=s;if(s!=="4.0"&&s!=="2.0"){throw new Error("Unsupported value for parameter odataVersion: "+s)}for(u in e){if(!(u in k)){throw new Error("Unsupported parameter: "+u)}}c=e.serviceUrl;if(!c){throw new Error("Missing service root URL")}d=new M(c);if(d.path()[d.path().length-1]!=="/"){throw new Error("Service root URL must end with '/'")}if(e.operationMode&&e.operationMode!==w.Server){throw new Error("Unsupported operation mode: "+e.operationMode)}this.sOperationMode=e.operationMode;this.mUriParameters=this.buildQueryOptions(d.query(true),false,true);this.sServiceUrl=d.query("").toString();this.sGroupId=e.groupId;if(this.sGroupId===undefined){this.sGroupId="$auto"}if(this.sGroupId!=="$auto"&&this.sGroupId!=="$direct"){throw new Error("Group ID must be '$auto' or '$direct'")}this.checkGroupId(e.updateGroupId,false,"Invalid update group ID: ");this.sUpdateGroupId=e.updateGroupId||this.getGroupId();this.aLockedGroupLocks=[];this.mGroupProperties={};for(t in e.groupProperties){h.checkGroupId(t,true);o=e.groupProperties[t];if(typeof o!=="object"||Object.keys(o).length!==1||!(o.submit in i)){throw new Error("Group '"+t+"' has invalid properties: '"+o+"'")}}this.mGroupProperties=b.extend({$auto:{submit:i.Auto},$direct:{submit:i.Direct}},e.groupProperties);if(e.autoExpandSelect!==undefined&&typeof e.autoExpandSelect!=="boolean"){throw new Error("Value for autoExpandSelect must be true or false")}this.bAutoExpandSelect=e.autoExpandSelect===true;this.oMetaModel=new r(a.create({"Accept-Language":n},s,this.mUriParameters),this.sServiceUrl+"$metadata",e.annotationURI,this,e.supportReferences);this.oRequestor=p.create(this.sServiceUrl,{fetchEntityContainer:this.oMetaModel.fetchEntityContainer.bind(this.oMetaModel),fetchMetadata:this.oMetaModel.fetchObject.bind(this.oMetaModel),fireSessionTimeout:function(){h.fireEvent("sessionTimeout")},getGroupProperty:this.getGroupProperty.bind(this),lockGroup:this.lockGroup.bind(this),onCreateGroup:function(e){if(h.isAutoGroup(e)){sap.ui.getCore().addPrerenderingTask(h._submitBatch.bind(h,e,true))}},reportBoundMessages:this.reportBoundMessages.bind(this),reportUnboundMessages:this.reportUnboundMessages.bind(this)},{"Accept-Language":n},this.mUriParameters,s);if(e.earlyRequests){this.oMetaModel.fetchEntityContainer(true);this.initializeSecurityToken()}this.aAllBindings=[];this.sDefaultBindingMode=g.TwoWay;this.mSupportedBindingModes={OneTime:true,OneWay:true,TwoWay:true}}});I.prototype._submitBatch=function(e,t){var r,o,i=this;o=h.all(this.aLockedGroupLocks.map(function(t){return t.waitFor(e)}));r=o.isPending();if(r){d.info("submitBatch('"+e+"') is waiting for locks",null,E)}return Promise.resolve(o.then(function(){if(r){d.info("submitBatch('"+e+"') continues",null,E)}i.aLockedGroupLocks=i.aLockedGroupLocks.filter(function(e){return e.isLocked()});return i.oRequestor.submitBatch(e).catch(function(e){i.reportError("$batch failed",E,e);if(!t){throw e}})}))};I.prototype.attachEvent=function(e){if(!(e in $)){throw new Error("Unsupported event '"+e+"': v4.ODataModel#attachEvent")}return m.prototype.attachEvent.apply(this,arguments)};I.prototype.attachSessionTimeout=function(e,t){return this.attachEvent("sessionTimeout",e,t)};I.prototype.bindContext=function(t,r,o){return new e(this,t,r,o)};I.prototype.bindingCreated=function(e){this.aAllBindings.push(e)};I.prototype.bindingDestroyed=function(e){var t=this.aAllBindings.indexOf(e);if(t<0){throw new Error("Unknown "+e)}this.aAllBindings.splice(t,1)};I.prototype.bindList=function(e,r,o,i,n){return new t(this,e,r,o,i,n)};I.prototype.bindProperty=function(e,t,r){return new o(this,e,t,r)};I.prototype.bindTree=function(){throw new Error("Unsupported operation: v4.ODataModel#bindTree")};I.prototype.buildQueryOptions=function(e,t,r){var o,i=b.extend(true,{},e);function n(e,r,o){var i,s,a,p=e[r];if(!t||o.indexOf(r)<0){throw new Error("System query option "+r+" is not supported")}if((r==="$expand"||r==="$select")&&typeof p==="string"){p=u.parseSystemQueryOption(r+"="+p)[r];e[r]=p}if(r==="$expand"){for(a in p){s=p[a];if(s===null||typeof s!=="object"){s=p[a]={}}for(i in s){n(s,i,G)}}}else if(r==="$count"){if(typeof p==="boolean"){if(!p){delete e.$count}}else{switch(typeof p==="string"&&p.toLowerCase()){case"false":delete e.$count;break;case"true":e.$count=true;break;default:throw new Error("Invalid value for $count: "+p)}}}}if(e){for(o in e){if(o.indexOf("$$")===0){delete i[o]}else if(o[0]==="@"){throw new Error("Parameter "+o+" is not supported")}else if(o[0]==="$"){n(i,o,P)}else if(!r&&o.indexOf("sap-")===0){throw new Error("Custom query option "+o+" is not supported")}}}return i};I.prototype.checkBatchGroupId=function(e){this.checkGroupId(e);if(this.isDirectGroup(e)){throw new Error("Group ID does not use batch requests: "+e)}};I.prototype.checkGroupId=function(e,t,r){if(!t&&e===undefined||typeof e==="string"&&(t?v:U).test(e)){return}throw new Error((r||"Invalid group ID: ")+e)};I.prototype.createBindingContext=function(e,t){var r,o,i,n,s;function a(e){var t=e.indexOf("."),r=e.indexOf("/");return t>0&&(r<0||t<r)}if(arguments.length>2){throw new Error("Only the parameters sPath and oContext are supported")}if(t&&t.getBinding){throw new Error("Unsupported type: oContext must be of type sap.ui.model.Context, "+"but was sap.ui.model.odata.v4.Context")}n=this.resolve(e,t);if(n===undefined){throw new Error("Cannot create binding context from relative path '"+e+"' without context")}s=n.indexOf("#");if(s>=0){r=n.slice(0,s);i=n.slice(s+1);if(i[0]==="#"){i=i.slice(1)}else if(r.length>1&&i[0]!=="@"&&a(i)){return new y(this,n)}if(i[0]==="/"){i="."+i}o=this.oMetaModel.getMetaContext(r);return this.oMetaModel.createBindingContext(i,o)}return new y(this,n)};I.prototype.destroy=function(){this.oRequestor.destroy();this.oMetaModel.destroy();return m.prototype.destroy.apply(this,arguments)};I.prototype.destroyBindingContext=function(){throw new Error("Unsupported operation: v4.ODataModel#destroyBindingContext")};I.prototype.detachSessionTimeout=function(e,t){return this.detachEvent("sessionTimeout",e,t)};I.prototype.getAllBindings=function(){return this.aAllBindings};I.prototype.getContext=function(){throw new Error("Unsupported operation: v4.ODataModel#getContext")};I.prototype.getDependentBindings=function(e){return this.aAllBindings.filter(function(t){var r=t.getContext();return t.isRelative()&&(r===e||r&&r.getBinding&&r.getBinding()===e)})};I.prototype.getGroupId=function(){return this.sGroupId};I.prototype.getGroupProperty=function(e,t){switch(t){case"submit":if(e.startsWith("$auto.")){return i.Auto}return this.mGroupProperties[e]?this.mGroupProperties[e].submit:i.API;default:throw new Error("Unsupported group property: '"+t+"'")}};I.prototype.getMetaModel=function(){return this.oMetaModel};I.prototype.getObject=function(){throw new Error("Unsupported operation: v4.ODataModel#getObject")};I.prototype.getODataVersion=function(){return this.sODataVersion};I.prototype.getOriginalProperty=function(){throw new Error("Unsupported operation: v4.ODataModel#getOriginalProperty")};I.prototype.getProperty=function(){throw new Error("Unsupported operation: v4.ODataModel#getProperty")};I.prototype.getUpdateGroupId=function(){return this.sUpdateGroupId};I.prototype.hasPendingChanges=function(){return this.oRequestor.hasPendingChanges()};I.prototype.initializeSecurityToken=function(){this.oRequestor.refreshSecurityToken().catch(function(){})};I.prototype.isAutoGroup=function(e){return this.getGroupProperty(e,"submit")===i.Auto};I.prototype.isDirectGroup=function(e){return this.getGroupProperty(e,"submit")===i.Direct};I.prototype.isList=function(){throw new Error("Unsupported operation: v4.ODataModel#isList")};I.prototype.lockGroup=function(e,t,r){var o;if(t instanceof n){t.setGroupId(e);return t}o=new n(e,t,r,this.oRequestor.getSerialNumber());if(o.isLocked()){this.aLockedGroupLocks.push(o)}return o};I.prototype.refresh=function(e){this.checkGroupId(e);this.getBindings().forEach(function(t){if(t.isRoot()){t.refresh(t.isSuspended()?undefined:e)}})};I.prototype.reportBoundMessages=function(e,t,r){var o="/"+e,i=[],n=[],a=this;Object.keys(t).forEach(function(e){t[e].forEach(function(t){var r=s.buildPath(o,e,t.target);i.push(new l({code:t.code,descriptionUrl:t.longtextUrl||undefined,message:t.message,persistent:t.transition,processor:a,target:r,technical:t.technical,technicalDetails:t.technicalDetails,type:O[t.numericSeverity]||x.None}))})});(r||[""]).forEach(function(e){var t=s.buildPath(o,e);Object.keys(a.mMessages||{}).forEach(function(e){if(e===t||e.startsWith(t+"/")||e.startsWith(t+"(")){n=n.concat(a.mMessages[e].filter(function(e){return!e.persistent}))}})});if(i.length||n.length){this.fireMessageChange({newMessages:i,oldMessages:n})}};I.prototype.reportError=function(e,t,r){var o=[],i,n,a=[];function u(e){var t,i={code:e.code,message:e.message,technical:e.technical,technicalDetails:{}};Object.defineProperty(i.technicalDetails,"originalMessage",{enumerable:true,get:function(){if(!t){t=s.clone(e)}return t}});Object.keys(e).forEach(function(t){if(t[0]==="@"){if(t.endsWith(".numericSeverity")){i.numericSeverity=e[t]}else if(t.endsWith(".longtextUrl")&&r.requestUrl&&n){i.longtextUrl=s.makeAbsolute(e[t],r.requestUrl)}}});if(typeof e.target!=="string"){a.push(i)}else if(e.target[0]==="$"||!n){i.message=e.target+": "+i.message;a.push(i)}else{i.target=e.target;i.transition=true;o.push(i)}}if(r.canceled==="noDebugLog"){return}i=r.stack||r.message;if(i.indexOf(r.message)<0){i=r.message+"\n"+r.stack}if(r.canceled){d.debug(e,i,t);return}d.error(e,i,t);if(r.$reported){return}r.$reported=true;if(r.error){n=r.resourcePath&&r.resourcePath.split("?")[0];r.error["@.numericSeverity"]=4;r.error.technical=true;u(r.error);if(r.error.details){r.error.details.forEach(u)}if(o.length){this.reportBoundMessages(n,{"":o},[])}}else{r["@.numericSeverity"]=4;r.technical=true;u(r)}this.reportUnboundMessages(n,a)};I.prototype.reportUnboundMessages=function(e,t){var r=this;if(t&&t.length){this.fireMessageChange({newMessages:t.map(function(t){var o=t.longtextUrl;return new l({code:t.code,descriptionUrl:o&&e?s.makeAbsolute(o,r.sServiceUrl+e):undefined,message:t.message,persistent:true,processor:r,target:"",technical:t.technical,technicalDetails:t.technicalDetails,type:O[t.numericSeverity]||x.None})})})}};I.prototype.requestCanonicalPath=function(e){c(e.getModel()===this,"oEntityContext must belong to this model");return e.requestCanonicalPath()};I.prototype.resetChanges=function(e){e=e||this.sUpdateGroupId;this.checkBatchGroupId(e);this.oRequestor.cancelChanges(this.isAutoGroup(e)?"$parked."+e:e);this.aAllBindings.forEach(function(t){if(e===t.getUpdateGroupId()){t.resetInvalidDataState()}})};I.prototype.resolve=function(e,t){var r;if(e&&e[0]==="/"){r=e}else if(t){r=t.getPath();if(e){if(r.slice(-1)!=="/"){r+="/"}r+=e}}if(r&&r!=="/"&&r[r.length-1]==="/"&&r.indexOf("#")<0){r=r.slice(0,r.length-1)}return r};I.prototype.setLegacySyntax=function(){throw new Error("Unsupported operation: v4.ODataModel#setLegacySyntax")};I.prototype.submitBatch=function(e){var t=this;this.checkBatchGroupId(e);if(this.isAutoGroup(e)){e="$parked."+e}else{this.oRequestor.addChangeSet(e)}return new Promise(function(r){sap.ui.getCore().addPrerenderingTask(function(){r(t._submitBatch(e))})})};I.prototype.toString=function(){return E+": "+this.sServiceUrl};I.prototype.withUnresolvedBindings=function(e,t){return this.getAllBindings().filter(function(e){return e.isRelative()&&!e.getContext()}).some(function(r){return r[e](t)})};return I});