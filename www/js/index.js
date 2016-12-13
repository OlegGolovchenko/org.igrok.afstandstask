/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener('backbutton', function() {
            window.plugins.flashlight.switchOff(this.exitApp, this.exitApp);
        }, false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        alert("undefined "+window.plugins.flashlight===undefined+" null "+window.plugins.flashlight===null);
        var flbtn = document.getElementById("flash");
        var albtn = document.getElementById("alarm");
        flbtn.addEventListener('click',this.flashMe);
        albtn.addEventListener('click',this.alertMe);
        window.addEventListener('batterystatus', this.onBatteryStatus, false);
    },

    onBatteryStatus:function(status) {
        if(status.level<15){
            window.plugins.toast.showLongCenter("Batterij is laag",this.successCb,this.failureCb);
        }
    },

    flashMe: function(){
        window.plugins.flashlight.available(function(isAvailable) {
            if(isAvailable){
                window.plugins.flashlight.toggle(
                    function() {},
                    function() {alert("flashlight error")},
                    {intensity: 0.3}
                    );
            }else{
                window.plugins.toast.showLongCenter("flashlight not available",this.successCb,this.failureCb);
            }
        });
    },

    alertMe:function(){

    },

    successCb: function(result){
        alert("toast successeful");
    },

    failureCb: function(result){
        alert("failed to toast");
    },

    exitApp:function() {
        navigator.app.exitApp();
    },
};

app.initialize();