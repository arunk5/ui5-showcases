/**
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/layout/library"],function(t){"use strict";function i(){var t=0;for(var i=0;i<this.virtualGridMatrix.length;i++){if(this.virtualGridMatrix[i][0]!==0){t++}}if(t>0){this.addEmptyRows(t)}}function r(t){return t==0}var e=t.extend("sap.f.VirtualGrid");e.prototype.init=function(t){this.virtualGridMatrix=[[]];this.numberOfCols=t.numberOfCols?t.numberOfCols:1;this.numberOfRows=t.numberOfRows?t.numberOfRows:1;this.cellWidth=t.cellWidth?t.cellWidth:5;this.cellHeight=t.cellHeight?t.cellHeight:5;this.unitOfMeasure=t.unitOfMeasure?t.unitOfMeasure:"rem";this.iGapSize=t.gapSize?t.gapSize:1;this.bAllowDenseFill=t.allowDenseFill?t.allowDenseFill:false;this.items={};this.topOffset=t.topOffset?t.topOffset:0;this.leftOffset=t.topOffset?t.leftOffset:0;for(var i=0;i<this.numberOfRows;i++){for(var r=0;r<this.numberOfCols;r++){this.virtualGridMatrix[i][r]=0}}this.lastItemPosition={top:-1,left:-1}};e.prototype.addEmptyRows=function(t){var i=this.virtualGridMatrix.length;for(var r=i;r<i+t;r++){this.virtualGridMatrix[r]=Array.apply(null,Array(this.numberOfCols)).map(Number.prototype.valueOf,0)}};e.prototype.getItems=function(){return this.items};e.prototype.getMatrix=function(){return this.virtualGridMatrix};e.prototype.getHeight=function(){var t=0;for(var i=0;i<this.virtualGridMatrix.length;i++){if(!this.virtualGridMatrix[i].every(r)){t++}}return t*this.cellHeight+(t-1)*this.iGapSize};e.prototype.calculatePositions=function(){for(var t=0;t<this.virtualGridMatrix.length;t++){for(var i=0;i<this.virtualGridMatrix[t].length;i++){if(!this.items[parseInt(this.virtualGridMatrix[t][i])].calculatedCoords){var r=this.items[this.virtualGridMatrix[t][i]];r.top=t*(this.cellHeight+this.iGapSize)+this.topOffset+this.unitOfMeasure;r.left=i*(this.cellWidth+this.iGapSize)+this.leftOffset+this.unitOfMeasure;r.width=r.cols*(this.cellHeight+this.iGapSize)-this.iGapSize+this.unitOfMeasure;r.height=r.rows*(this.cellWidth+this.iGapSize)-this.iGapSize+this.unitOfMeasure;r.calculatedCoords=true}}}};e.prototype.fitElement=function(t,r,e,s,l){var a,o=this,h=Math.min(r,this.numberOfCols),f=o.lastItemPosition.top,u=o.lastItemPosition.left;this.items[t]={rows:e,cols:h,calculatedCoords:false};if(e>this.virtualGridMatrix.length){this.addEmptyRows(e-this.virtualGridMatrix.length)}if(s){i.call(this)}this.virtualGridMatrix.forEach(function(i,r,s){i.forEach(function(i,s,l){var n=o.bAllowDenseFill||r>f||r==f&&s>u;if(n&&o.virtualGridMatrix[r][s]===0&&!a){if(o.shouldElementFit(r,s,h,e)){o.fillElement(r,s,h,e,t);a=true}}})});if(!a&&!l){this.fitElement(t,r,e,true,true)}};e.prototype.shouldElementFit=function(t,i,r,e){var s=t+e;var l=i+r;var a=this.virtualGridMatrix;for(var o=t;o<s;o++){for(var h=i;h<l;h++){if(a[o][h]!==0||a.length<s||a[o].length<i+r){return false}}}return true};e.prototype.fillElement=function(t,i,r,e,s){for(var l=t;l<t+e;l++){for(var a=i;a<i+r;a++){this.virtualGridMatrix[l][a]=s}}this.lastItemPosition={top:t,left:i}};return e});