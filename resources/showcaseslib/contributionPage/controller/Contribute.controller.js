sap.ui.define(["sap/ui/core/mvc/Controller","showcaseslib/shared/data/model/formatter","sap/ui/model/json/JSONModel","sap/m/MessageToast","showcaseslib/thirdparty/jsZipLibrary/jszip","showcaseslib/thirdparty/jsZipLibrary/FileSaver","sap/m/Button","sap/m/ButtonType","sap/ui/layout/HorizontalLayout","sap/ui/unified/FileUploader"],function(e,t,i,a,s,o,r,l,d,n){"use strict";var g=new Image;const u=500;return e.extend("showcaseslib.contributionPage.controller.Contribute",{formatter:t,onInit:function(){this._oWizard=this.byId("contributeWizard");this._oNavContainer=this.getView().byId("wizardNavContainer");var e={title:"Start filling in the form below...",teaser:"",author:"",classification:"public",description:"",usage:"",image:{url:"resources/showcaseslib/shared/data/mainImage_default.png",text:"",device:"desktop"},devices:["desktop","tablet","phone"],imageURL:[{url:"",text:"..."},{url:"",text:"..."},{url:"",text:"..."}],website:[]};var t=new i(e);this.getView().setModel(t);sap.ui.getCore().loadLibrary("ui5lab.wl.img","resources/showcaseslib/thirdparty/imageViewerLibrary/ui5lab/wl/img");this.createFileUploader("mainImageUploader","mainImageLayout");for(var a=0;a<=2;a++){this.createFileUploader("additionalUploader_"+(a+1),"addImages_Layout_"+(a+1),a)}this.selectTitleText()},onAfterRendering:function(){this.selectTitleText()},selectTitleText:function(){this.byId("title_Input").focus();this.byId("title_Input").$().find("input").select()},createFileUploader:function(e,t,i){var s=new n(this.getView().createId(e),{change:function(t){var s=new FileReader;s.onload=function(t){a.show("Checking file...");var s=false;var o=new Image;o.src=t.target.result;o.onload=function(){s=true;if(e==="mainImageUploader"){g=o;var t=this.getView().getModel().getProperty("/image");t.url=g.src;this.getView().getModel().setProperty("/image",t);this._oWizard.validateStep(this.byId("imagesStep"))}else{var r=this.getView().getModel().getProperty("/imageURL");r[i].url=o.src;this.getView().getModel().setProperty("/imageURL",r)}a.show("Upload successful!");if(e==="mainImageUploader"&&(o.width<1280||o.height<720)){this.getView().byId("resolution_MessageStrip").setVisible(true)}else if(e==="mainImageUploader"){this.getView().byId("resolution_MessageStrip").setVisible(false)}}.bind(this);setTimeout(function(){if(s===false){a.show("The uploaded file is either not an image or corrupted");if(e==="mainImageUploader"){this._oWizard.invalidateStep(this.byId("imagesStep"))}}},2e3)}.bind(this);try{s.readAsDataURL(t.getParameter("files")[0])}catch(e){}}.bind(this)});var o=new r(e+"_deleteButton",{icon:"sap-icon://delete",type:l.Transparent,press:function(){if(e==="mainImageUploader"){this.getView().getModel().setProperty("/image/url","");this.byId("mainImageUploader").setValue("");this._oWizard.invalidateStep(this.byId("imagesStep"));this.getView().byId("resolution_MessageStrip").setVisible(false)}else{var t=this.getView().getModel().getProperty("/imageURL");if(i+1===2){t[1].url=t[2].url;this.byId("additionalUploader_2").setValue(this.byId("additionalUploader_3").getValue())}if(i+1===1){t[0].url=t[1].url;t[1].url=t[2].url;t[2].url="";this.byId("additionalUploader_1").setValue(this.byId("additionalUploader_2").getValue());this.byId("additionalUploader_2").setValue(this.byId("additionalUploader_3").getValue())}if(this.getView().byId("addImages_Layout_3").getVisible()){this.getView().byId("addImages_Layout_3").setVisible(false)}else if(this.getView().byId("addImages_Layout_2").getVisible()){this.getView().byId("addImages_Layout_2").setVisible(false)}else{this.getView().byId("addImages_Layout_1").setVisible(false)}t[2].url="";this.byId("additionalUploader_3").setValue("");this.getView().byId("addImages_Layout_3").setVisible(false);this.getView().getModel().setProperty("/imageURL",t);this.getView().byId("plusImage_Button").setEnabled(true)}}.bind(this)});var u=new d({content:[s,o]});this.getView().byId(t).addContent(u)},_validateInput:function(e){var t=e.getBinding("value");var i="None";var a=false;try{t.getType().validateValue(e.getValue())}catch(e){i="Error";a=true}e.setValueState(i);return a},onClassificationSelected:function(){var e=this.getView().byId("RB_Public").getSelected()?"public":"internal";this.getView().getModel().setProperty("/classification",e)},onCheckBoxSelected:function(){var e=this.getView().getModel().getData();e.devices=[];if(this.byId("supportedDevicesDesktop_Checkbox").getSelected()){e.devices.push("desktop")}if(this.byId("supportedDevicesTablet_Checkbox").getSelected()){e.devices.push("tablet")}if(this.byId("supportedDevicesPhone_Checkbox").getSelected()){e.devices.push("phone")}this.getView().getModel().setData(e)},onDeviceSelected:function(){var e=this.getView().getModel().getData();e.image.device=this.byId("imageDevice_Desktop").getSelected()?"desktop":this.byId("imageDevice_Tablet").getSelected()?"tablet":"laptop";this.getView().getModel().setData(e)},onChange:function(e){var t=e.getSource();this._validateInput(t)},onChangeURL:function(e){var t=e.getSource();this._validateInput(t);var i=new RegExp("^http[s]?:\\/\\/.*\\..+");if(i.exec(t.getValue())===null){t.setValueState("Error")}},resetValueState(e){e.getSource().setValueState("None")},onPressInfo:function(e){sap.m.URLHelper.redirect(e,true)},insertFirstLink:function(){var e=this.getView().getModel().getProperty("/website");e.push({url:"",text:""});this.getView().getModel().setProperty("/website",e)},onImagePlusClicked:function(){if(!this.byId("addImages_Layout_1").getVisible()){this.getView().byId("addImages_Layout_1").setVisible(true)}else if(!this.byId("addImages_Layout_2").getVisible()){this.getView().byId("addImages_Layout_2").setVisible(true)}else{this.getView().byId("addImages_Layout_3").setVisible(true);this.getView().byId("minusImage_Button").setEnabled(true)}if(this.byId("addImages_Layout_1").getVisible()&&this.byId("addImages_Layout_2").getVisible()&&this.byId("addImages_Layout_3").getVisible()){this.getView().byId("plusImage_Button").setEnabled(false)}},onDeleteLink:function(e){var t=e.getSource().getCustomData()[0].getBindingContext();var i=t.getPath().split("/").pop();var a=this.getView().getModel().getProperty("/website");a.splice(i,1);this.getView().getModel().setProperty("/website",a);this.getView().byId("plus_Button").setEnabled(true)},onPlusClicked:function(){var e=this.getView().getModel();var t=e.getProperty("/website");t.push({url:"",text:"",type:""});if(t.length===3){this.getView().byId("plus_Button").setEnabled(false)}e.setProperty("/website",t)},onExit:function(){if(this._oPopover){this._oPopover.destroy()}},showLinkPopover:function(e){if(!this._oPopover){this._oPopover=sap.ui.xmlfragment("showcaseslib/contributionPage/view/Contribution_LinkInfo",this);this.getView().addDependent(this._oPopover)}this._oPopover.openBy(e.getSource())},checkRequiredFields:function(){var e=this.getView();if(this._validateInput(e.byId("title_Input"))||this._validateInput(e.byId("author_Input"))||this._validateInput(e.byId("description_TextArea"))){a.show("Please fill in all required fields");return false}else if(e.getModel().getProperty("/image").url===""){a.show("Please upload a preview image");return false}return true},onDownload:function(e){if(this.checkRequiredFields()){this.downloadZIP();this.getView().byId("thankYou_Text").setVisible(true)}},escapeToFilename:function(e){return e.replace(/[^a-z0-9]/gi,"_").toLowerCase()},generateJSON:function(){var e=this.getView().getModel();var t=new i;t=[];t.push({title:e.getProperty("/title"),teaser:e.getProperty("/teaser"),author:e.getProperty("/author"),description:e.getProperty("/description"),usage:e.getProperty("/usage"),image:{url:this.escapeToFilename(e.getProperty("/title"))+"_mainImage.png",text:"...",device:this.byId("imageDevice_Desktop").getSelected()?"desktop":this.byId("imageDevice_Tablet").getSelected()?"tablet":"laptop"},devices:e.getProperty("/devices"),imageURL:[],website:e.getProperty("/website")});var a=e.getProperty("/imageURL");for(var s=0;s<a.length;s++){if(e.getProperty("/imageURL")[s].url.length>0){t[0].imageURL.push({url:this.escapeToFilename(e.getProperty("/title")+"_"+(s+1))+".png",text:"..."})}}return t},downloadZIP:function(){var e=new JSZip;var t=e.folder("large");var i=e.folder("small");var a=this.escapeToFilename(this.getView().getModel().getData().title);this.addImageToZip(t,a+"_mainImage.png",g,g.width,g.height);this.addImageToZip(i,a+"_mainImage.png",g,u,u/g.width*g.height);var s=new Image;var o=this.getView().getModel().getData().imageURL;for(var r=0;r<o.length;r++){s.src=o[r].url;if(o[r].url!==""){this.addImageToZip(t,a+"_additionalImage_"+(r+1)+".png",s,s.width,s.height);this.addImageToZip(i,a+"_additionalImage_"+(r+1)+".png",s,u,u/g.width*g.height)}}e.file("myShowcase.json",JSON.stringify(this.generateJSON()[0]));e.generateAsync({type:"blob"}).then(function(e){saveAs(e,"Your_Showcase.zip")})},addImageToZip:function(e,t,i,a,s){var o=this.getResizedURL(i,a,s);var r=o.replace("data:image/png;base64,","");e.file(t,r,{base64:true})},getResizedURL:function(e,t,i){var a=document.createElement("canvas"),s=a.getContext("2d");a.width=t;a.height=i;s.drawImage(e,0,0,t,i);var o=a.toDataURL({format:"png",multiplier:4});return o},onPressPullRequestLink:function(){sap.m.URLHelper.redirect("https://github.com/SAP/ui5-showcases/blob/master/CONTRIBUTING.md",true)},additionalInfoValidation:function(e){this._validateInput(e.getSource());var t=this.byId("title_Input").getValue();var i=this.byId("author_Input").getValue();var a=this.byId("description_TextArea").getValue();if(i.length<1||i.length>70||a.length<1||a.length>500||t.length<1||t.length>70){this._oWizard.invalidateStep(this.byId("ShowcaseInfoStep"))}else{this._oWizard.validateStep(this.byId("ShowcaseInfoStep"))}},dataURLtoBlob:function(e){var t=e.split(","),i=t[0].match(/:(.*?);/)[1],a=atob(t[1]),s=a.length,o=new Uint8Array(s);while(s--){o[s]=a.charCodeAt(s)}return new Blob([o],{type:i})}})});