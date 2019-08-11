/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ComponentMetadata","./library"],function(t,e){"use strict";var o=e.mvc.ViewType;var r=function(e,o){t.apply(this,arguments)};r.prototype=Object.create(t.prototype);r.preprocessClassInfo=function(t){if(t&&typeof t.metadata==="string"){t.metadata={_src:t.metadata}}return t};r.prototype.getRootView=function(t){return this.getManifestEntry("/sap.ui5/rootView",!t)};r.prototype.getRoutingConfig=function(t){return this.getManifestEntry("/sap.ui5/routing/config",!t)};r.prototype.getRoutes=function(t){return this.getManifestEntry("/sap.ui5/routing/routes",!t)};r.prototype._convertLegacyMetadata=function(e,r){t.prototype._convertLegacyMetadata.call(this,e,r);var i=r["sap.ui5"];var n=i["rootView"]||e["rootView"];if(n){i["rootView"]=n}var a=i["routing"]||e["routing"];if(a){i["routing"]=a}if(i["rootView"]&&typeof i["rootView"]==="string"){i["rootView"]={viewName:i["rootView"],type:o.XML}}};return r},true);