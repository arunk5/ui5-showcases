/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Button","./Dialog","./Text","./FormattedText","./Link","./VBox","sap/ui/core/IconPool","sap/ui/core/ElementMetadata","sap/ui/core/library","sap/ui/core/Control","sap/m/library","sap/ui/thirdparty/jquery","sap/ui/core/theming/Parameters"],function(e,t,i,n,o,s,a,r,l,c,u,d,f){"use strict";var g=u.DialogType;var O=u.DialogRoleType;var I=l.TextDirection;var S={};S.Action={OK:"OK",CANCEL:"CANCEL",YES:"YES",NO:"NO",ABORT:"ABORT",RETRY:"RETRY",IGNORE:"IGNORE",CLOSE:"CLOSE",DELETE:"DELETE"};S.Icon={NONE:undefined,INFORMATION:"INFORMATION",WARNING:"WARNING",ERROR:"ERROR",SUCCESS:"SUCCESS",QUESTION:"QUESTION"};(function(){var l=S.Action,u=S.Icon,T=f.get("_sap_m_Message_Box_Information_Icon")==="true",C=T?"message-information":"hint",R={INFORMATION:"sapMMessageBoxInfo",WARNING:"sapMMessageBoxWarning",ERROR:"sapMMessageBoxError",SUCCESS:"sapMMessageBoxSuccess",QUESTION:"sapMMessageBoxQuestion",STANDARD:"sapMMessageBoxStandard"},E={INFORMATION:a.getIconURI(C),WARNING:a.getIconURI("message-warning"),ERROR:a.getIconURI("message-error"),SUCCESS:a.getIconURI("message-success"),QUESTION:a.getIconURI("question-mark")};var p=function(){if(S._rb!==sap.ui.getCore().getLibraryResourceBundle("sap.m")){S._rb=sap.ui.getCore().getLibraryResourceBundle("sap.m")}};S.show=function(a,f){var T,C,N,x=null,y=[],M,_,A,h,B,L,b,F={id:r.uid("mbox"),initialFocus:null,textDirection:I.Inherit,verticalScrolling:true,horizontalScrolling:true,details:"",contentWidth:null};p();if(typeof f==="string"||arguments.length>2){_=arguments[1];A=arguments[2];h=arguments[3];B=arguments[4];L=arguments[5];b=arguments[6];f={icon:_,title:A,actions:h,onClose:B,id:L,styleClass:b}}if(f&&f.hasOwnProperty("details")){F.icon=u.INFORMATION;F.actions=[l.OK,l.CANCEL];f=d.extend({},F,f)}f=d.extend({},F,f);if(typeof f.actions!=="undefined"&&!Array.isArray(f.actions)){f.actions=[f.actions]}if(!f.actions||f.actions.length===0){f.actions=[l.OK]}function m(t){var i;if(S.Action.hasOwnProperty(t)){i=S._rb.getText("MSGBOX_"+t)}var n=new e({id:r.uid("mbox-btn-"),text:i||t,press:function(){x=t;T.close()}});return n}for(M=0;M<f.actions.length;M++){y.push(m(f.actions[M]))}function w(e,t){var i,a,r=new s({items:[t]});if(!e.details){return r}if(typeof e.details=="object"){e.details="<pre>"+JSON.stringify(e.details,null,"\t").replace(/{/gi,"\\{")+"</pre>"}i=(new n).setVisible(false).setHtmlText(e.details);a=new o({text:S._rb.getText("MSGBOX_LINK_TITLE"),press:function(){var e=T.getInitialFocus();T.addAriaLabelledBy(i);i.setVisible(true);a.setVisible(false);if(e&&e!==a.getId()){T._setInitialFocus()}else{y[0].focus()}}});a.addStyleClass("sapMMessageBoxLinkText");i.addStyleClass("sapMMessageBoxDetails");r.addItem(a);r.addItem(i);return r}function v(){if(typeof f.onClose==="function"){f.onClose(x)}T.detachAfterClose(v);T.destroy()}function G(){var e=0;var t=null;if(f.initialFocus){if(f.initialFocus instanceof c){t=f.initialFocus}if(typeof f.initialFocus==="string"){for(e=0;e<y.length;e++){if(S.Action.hasOwnProperty(f.initialFocus)){if(S._rb.getText("MSGBOX_"+f.initialFocus).toLowerCase()===y[e].getText().toLowerCase()){t=y[e];break}}else{if(f.initialFocus.toLowerCase()===y[e].getText().toLowerCase()){t=y[e];break}}}}}return t}if(typeof a==="string"){N=new i({textDirection:f.textDirection}).setText(a).addStyleClass("sapMMsgBoxText");C=N}else if(a instanceof c){N=a.addStyleClass("sapMMsgBoxText")}if(f&&f.hasOwnProperty("details")&&f.details!==""){N=w(f,N)}T=new t({id:f.id,type:g.Message,title:f.title,content:N,icon:E[f.icon],initialFocus:G(),verticalScrolling:f.verticalScrolling,horizontalScrolling:f.horizontalScrolling,afterClose:v,buttons:y,ariaLabelledBy:C?C.getId():undefined,contentWidth:f.contentWidth});T.setProperty("role",O.AlertDialog);if(R[f.icon]){T.addStyleClass(R[f.icon])}else{T.addStyleClass(R.STANDARD)}if(f.styleClass){T.addStyleClass(f.styleClass)}T.open()};S.alert=function(e,t){p();var i={icon:u.NONE,title:S._rb.getText("MSGBOX_TITLE_ALERT"),actions:l.OK,id:r.uid("alert"),initialFocus:null},n,o,s,a;if(typeof t==="function"||arguments.length>2){n=arguments[1];o=arguments[2];s=arguments[3];a=arguments[4];t={onClose:n,title:o,id:s,styleClass:a}}t=d.extend({},i,t);return S.show(e,t)};S.confirm=function(e,t){p();var i={icon:u.QUESTION,title:S._rb.getText("MSGBOX_TITLE_CONFIRM"),actions:[l.OK,l.CANCEL],id:r.uid("confirm"),initialFocus:null},n,o,s,a;if(typeof t==="function"||arguments.length>2){n=arguments[1];o=arguments[2];s=arguments[3];a=arguments[4];t={onClose:n,title:o,id:s,styleClass:a}}t=d.extend({},i,t);return S.show(e,t)};S.error=function(e,t){p();var i={icon:u.ERROR,title:S._rb.getText("MSGBOX_TITLE_ERROR"),actions:[l.CLOSE],id:r.uid("error"),initialFocus:null};t=d.extend({},i,t);return S.show(e,t)};S.information=function(e,t){p();var i={icon:u.INFORMATION,title:S._rb.getText("MSGBOX_TITLE_INFO"),actions:[l.OK],id:r.uid("info"),initialFocus:null};t=d.extend({},i,t);return S.show(e,t)};S.warning=function(e,t){p();var i={icon:u.WARNING,title:S._rb.getText("MSGBOX_TITLE_WARNING"),actions:[l.OK],id:r.uid("warning"),initialFocus:null};t=d.extend({},i,t);return S.show(e,t)};S.success=function(e,t){p();var i={icon:u.SUCCESS,title:S._rb.getText("MSGBOX_TITLE_SUCCESS"),actions:[l.OK],id:r.uid("success"),initialFocus:null};t=d.extend({},i,t);return S.show(e,t)}})();return S},true);