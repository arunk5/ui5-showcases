sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","showcaseslib/shared/data/model/models"],function(e,t,s){"use strict";return e.extend("showcaseslib.showcase.Component",{metadata:{properties:{navTarget:{type:"string"}},events:{buttonClicked:{parameters:{navTarget:{type:"string"}}}},manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.setModel(s.createDeviceModel(),"device")}})});