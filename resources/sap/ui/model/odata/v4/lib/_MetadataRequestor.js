/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_Helper","./_V2MetadataConverter","./_V4MetadataConverter","sap/base/Log","sap/ui/thirdparty/jquery"],function(e,t,a,r,n){"use strict";return{create:function(o,i,d){var s={},u=e.buildQuery(d);return{read:function(d,f,c){var l;function M(e){var r=i==="4.0"||f?a:t,o=e.$XML;delete e.$XML;return n.extend((new r).convertXMLMetadata(o,d),e)}if(d in s){if(c){throw new Error("Must not prefetch twice: "+d)}l=s[d].then(M);delete s[d]}else{l=new Promise(function(t,a){n.ajax(f?d:d+u,{method:"GET",headers:o}).then(function(e,a,r){var n=r.getResponseHeader("Date"),o=r.getResponseHeader("ETag"),i={$XML:e},d=r.getResponseHeader("Last-Modified");if(n){i.$Date=n}if(o){i.$ETag=o}if(d){i.$LastModified=d}t(i)},function(t,n,o){var i=e.createError(t,"Could not load metadata");r.error("GET "+d,i.message,"sap.ui.model.odata.v4.lib._MetadataRequestor");a(i)})});if(c){s[d]=l}else{l=l.then(M)}}return l}}}}},false);