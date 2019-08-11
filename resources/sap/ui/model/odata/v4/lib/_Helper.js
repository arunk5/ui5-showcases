/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/util/isEmptyObject","sap/ui/thirdparty/URI"],function(e,t,n){"use strict";var r=/&/g,i="sap.ui.model.odata.v4.lib._Helper",a=/\=/g,u=/%29/g,o=/%28/g,f=/%27/g,s=/#/g,c,l=/\([^/]*|\/-?\d+/g,d=/\+/g,p=/'/g;c={addByPath:function(e,t,n){if(n){if(!e[t]){e[t]=[n]}else if(e[t].indexOf(n)<0){e[t].push(n)}}},addChildrenWithAncestor:function(e,t,n){if(t.length){e.forEach(function(e){var r;if(t.indexOf(e)>=0){n[e]=true;return}r=e.split("/");r.pop();while(r.length){if(t.indexOf(r.join("/"))>=0){n[e]=true;break}r.pop()}})}},addToSelect:function(e,t){e.$select=e.$select||[];t.forEach(function(t){if(e.$select.indexOf(t)<0){e.$select.push(t)}})},buildPath:function(){var e,t="",n;for(e=0;e<arguments.length;e+=1){n=arguments[e];if(n||n===0){if(t&&t!=="/"&&n[0]!=="("){t+="/"}t+=n}}return t},buildQuery:function(e){var t,n;if(!e){return""}t=Object.keys(e);if(t.length===0){return""}n=[];t.forEach(function(t){var r=e[t];if(Array.isArray(r)){r.forEach(function(e){n.push(c.encodePair(t,e))})}else{n.push(c.encodePair(t,r))}});return"?"+n.join("&")},clone:function e(t){return t===undefined||t===Infinity||t===-Infinity||t!==t?t:JSON.parse(JSON.stringify(t))},createError:function(t,n,r,a){var u=t.responseText,o=t.getResponseHeader("Content-Type"),f=new Error(n+": "+t.status+" "+t.statusText);f.status=t.status;f.statusText=t.statusText;f.requestUrl=r;f.resourcePath=a;if(t.status===0){f.message="Network error";return f}if(o){o=o.split(";")[0]}if(t.status===412){f.isConcurrentModification=true}if(o==="application/json"){try{f.error=JSON.parse(u).error;f.message=f.error.message;if(typeof f.message==="object"){f.message=f.error.message.value}}catch(t){e.warning(t.toString(),u,i)}}else if(o==="text/plain"){f.message=u}return f},createGetMethod:function(e,t){return function(){var n=this[e].apply(this,arguments);if(n.isFulfilled()){return n.getResult()}else if(t){if(n.isRejected()){n.caught();throw n.getResult()}else{throw new Error("Result pending")}}}},createRequestMethod:function(e){return function(){return Promise.resolve(this[e].apply(this,arguments))}},deletePrivateAnnotation:function(e,t){var n=e["@$ui5._"];if(n){delete n[t]}},drillDown:function(e,t){return t.reduce(function(e,t){return e&&t in e?e[t]:undefined},e)},encode:function(e,t){var n=encodeURI(e).replace(r,"%26").replace(s,"%23").replace(d,"%2B");if(t){n=n.replace(a,"%3D")}return n},encodePair:function(e,t){return c.encode(e,true)+"="+c.encode(t,false)},fireChange:function(e,t,n){var r=e[t],i;if(r){for(i=0;i<r.length;i+=1){r[i].onChange(n)}}},fireChanges:function(e,t,n,r){Object.keys(n).forEach(function(i){var a=c.buildPath(t,i),u=n[i];if(u&&typeof u==="object"){c.fireChanges(e,a,u,r)}else{c.fireChange(e,a,r?undefined:u)}});c.fireChange(e,t,r?undefined:n)},formatLiteral:function(e,t){if(e===undefined){throw new Error("Illegal value: undefined")}if(e===null){return"null"}switch(t){case"Edm.Binary":return"binary'"+e+"'";case"Edm.Boolean":case"Edm.Byte":case"Edm.Double":case"Edm.Int16":case"Edm.Int32":case"Edm.SByte":case"Edm.Single":return String(e);case"Edm.Date":case"Edm.DateTimeOffset":case"Edm.Decimal":case"Edm.Guid":case"Edm.Int64":case"Edm.TimeOfDay":return e;case"Edm.Duration":return"duration'"+e+"'";case"Edm.String":return"'"+e.replace(p,"''")+"'";default:throw new Error("Unsupported type: "+t)}},getKeyFilter:function(e,t,n){var r=[],i,a=c.getKeyProperties(e,t,n);if(!a){return undefined}for(i in a){r.push(i+" eq "+a[i])}return r.join(" and ")},getKeyPredicate:function(e,t,n){var r=[],i=c.getKeyProperties(e,t,n,true);if(!i){return undefined}r=Object.keys(i).map(function(e,t,n){var r=encodeURIComponent(i[e]);return n.length===1?r:encodeURIComponent(e)+"="+r});return"("+r.join(",")+")"},getKeyProperties:function(e,t,n,r){var i,a={};i=n[t].$Key.some(function(i){var u,o,f,s,l,d;if(typeof i==="string"){u=o=i}else{u=Object.keys(i)[0];o=i[u];if(!r){u=o}}f=o.split("/");d=c.drillDown(e,f);if(d===undefined){return true}s=f.pop();l=n[c.buildPath(t,f.join("/"))];d=c.formatLiteral(d,l[s].$Type);a[u]=d});return i?undefined:a},getMetaPath:function(e){return e.replace(l,"")},getPrivateAnnotation:function(e,t){var n=e["@$ui5._"];return n&&n[t]},getQueryOptionsForPath:function(e,t){t=t[0]==="("?c.getMetaPath(t).slice(1):c.getMetaPath("/"+t).slice(1);if(t){t.split("/").some(function(t){e=e&&e.$expand&&e.$expand[t];if(!e||e===true){e={};return true}})}return e||{}},hasPrivateAnnotation:function(e,t){var n=e["@$ui5._"];return n?t in n:false},intersectQueryOptions:function(e,n,r,i,a,u){var o=[],f={},s,l,d={};function p(e,t){var n=t.split("/");return n.every(function(t,a){return a===0&&e||r(i+"/"+n.slice(0,a+1).join("/")).getResult().$kind==="Property"})}if(n.indexOf("")>=0){throw new Error("Unsupported empty navigation property path")}if(e&&e.$select&&e.$select.indexOf("*")<0){c.addChildrenWithAncestor(n,e.$select,d);c.addChildrenWithAncestor(e.$select,n,d);l=Object.keys(d).filter(p.bind(null,true))}else{l=n.filter(p.bind(null,false))}if(e&&e.$expand){o=Object.keys(e.$expand);o.forEach(function(o){var s,l=i+"/"+o,d=c.buildPath(u,o),p={},h;c.addChildrenWithAncestor([o],n,p);if(!t(p)){if(r(l).getResult().$isCollection){a[d]=true}f[o]=e.$expand[o];return}h=c.stripPathPrefix(o,n);if(h.length){if(r(l).getResult().$isCollection){throw new Error("Unsupported collection-valued navigation property "+l)}s=c.intersectQueryOptions(e.$expand[o]||{},h,r,i+"/"+o,a,d);if(s){f[o]=s}}})}if(!l.length&&t(f)){return null}if(!l.length){l=Object.keys(f).slice(0,1)}s=Object.assign({},e,{$select:l});if(t(f)){delete s.$expand}else{s.$expand=f}return s},isSafeInteger:function(e){if(typeof e!=="number"||!isFinite(e)){return false}e=Math.abs(e);return e<=9007199254740991&&Math.floor(e)===e},makeAbsolute:function(e,t){return new n(e).absoluteTo(t).toString().replace(f,"'").replace(o,"(").replace(u,")")},mergeQueryOptions:function(e,t,n){var r;function i(t,n){if(n&&(!e||e[t]!==n)){if(!r){r=e?c.clone(e):{}}r[t]=n}}i("$orderby",t);i("$filter",n);return r||e},namespace:function(e){var t=e.indexOf("/");if(t>=0){e=e.slice(0,t)}t=e.lastIndexOf(".");return t<0?"":e.slice(0,t)},parseLiteral:function(e,t,n){function r(r){if(!isFinite(r)){throw new Error(n+": Not a valid "+t+" literal: "+e)}return r}if(e==="null"){return null}switch(t){case"Edm.Boolean":return e==="true";case"Edm.Byte":case"Edm.Int16":case"Edm.Int32":case"Edm.SByte":return r(parseInt(e));case"Edm.Date":case"Edm.DateTimeOffset":case"Edm.Decimal":case"Edm.Guid":case"Edm.Int64":case"Edm.TimeOfDay":return e;case"Edm.Double":case"Edm.Single":return e==="INF"||e==="-INF"||e==="NaN"?e:r(parseFloat(e));default:throw new Error(n+": Unsupported type: "+t)}},publicClone:function(e){var t=c.clone(e);if(t){delete t["@$ui5._"]}return t},removeByPath:function(e,t,n){var r=e[t],i;if(r){i=r.indexOf(n);if(i>=0){if(r.length===1){delete e[t]}else{r.splice(i,1)}}}},resolveIfMatchHeader:function(e){var t=e&&e["If-Match"];if(t&&typeof t==="object"){t=t["@odata.etag"];e=Object.assign({},e);if(t===undefined){delete e["If-Match"]}else{e["If-Match"]=t}}return e},selectKeyProperties:function(e,t){if(t&&t.$Key){c.addToSelect(e,t.$Key.map(function(e){if(typeof e==="object"){return e[Object.keys(e)[0]]}return e}))}},setPrivateAnnotation:function(e,t,n){var r=e["@$ui5._"];if(!r){r=e["@$ui5._"]={}}r[t]=n},stripPathPrefix:function(e,t){var n=e+"/";if(e===""){return t}return t.filter(function(t){return t===e||t.startsWith(n)}).map(function(e){return e.slice(n.length)})},toArray:function(e){if(e===undefined||e===null){return[]}if(Array.isArray(e)){return e}return[e]},updateExisting:function(e,t,n,r){if(!r){return}Object.keys(n).forEach(function(i){var a=c.buildPath(t,i),u=n[i],o;if(i in r||i[0]==="#"){o=r[i];if(o&&typeof o==="object"){if(Array.isArray(o)){n[i]=o}else if(u){c.updateExisting(e,a,u,o)}else{n[i]=o;c.fireChanges(e,a,o,false)}}else if(u&&typeof u==="object"){n[i]=o;c.fireChanges(e,a,u,true)}else{n[i]=o;if(u!==o){c.fireChange(e,a,o)}}}});Object.keys(r).filter(function(e){return e[0]==="#"}).filter(function(e){return!(e in n)}).forEach(function(i){var a=r[i],u=c.buildPath(t,i);n[i]=a;c.fireChanges(e,u,a,false)})},updateSelected:function(e,t,n,r,i){var a;function u(t,n,r,i){var a=n.split("/");a.every(function(u,o){if(i[u]===null){r[u]=null;if(o<a.length-1){return false}c.fireChange(e,c.buildPath(t,n),r[u])}else if(typeof i[u]==="object"){r[u]=r[u]||{}}else{if(r[u]!==i[u]){r[u]=i[u];c.fireChange(e,c.buildPath(t,n),r[u])}return false}r=r[u];i=i[u];return true})}function o(e,t){Object.keys(e).forEach(function(n){var r=c.buildPath(t,n),a=e[n];if(n==="@$ui5._"){return}if(a!==null&&typeof a==="object"){o(a,r)}else{i.push(r)}})}if(!i||i.indexOf("*")>=0){i=[];o(r)}else{i=i.concat("@odata.etag")}i.forEach(function(e){u(t,e,n,r)});a=c.getPrivateAnnotation(r,"predicate");if(a){c.setPrivateAnnotation(n,"predicate",a)}},updateTransientPaths:function(e,t,n){var r;for(r in e){if(r.includes(t)){e[r.replace(t,n)]=e[r];delete e[r]}}},wrapChildQueryOptions:function(t,n,r,a){var u="",o,f=n.split("/"),s,l=t,d={},p=d;if(n===""){return r}for(o=0;o<f.length;o+=1){l=c.buildPath(l,f[o]);u=c.buildPath(u,f[o]);s=a(l).getResult();if(s.$kind==="NavigationProperty"){p.$expand={};p=p.$expand[u]=o===f.length-1?r:{};c.selectKeyProperties(p,a(l+"/").getResult());u=""}else if(s.$kind!=="Property"){return undefined}}if(s.$kind==="Property"){if(Object.keys(r).length>0){e.error("Failed to enhance query options for auto-$expand/$select as the"+" child binding has query options, but its path '"+n+"' points to a structural property",JSON.stringify(r),i);return undefined}c.addToSelect(p,[u])}if("$apply"in r){e.debug("Cannot wrap $apply into $expand: "+n,JSON.stringify(r),i);return undefined}return d}};return c},false);