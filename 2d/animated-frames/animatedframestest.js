/*
 *  Copyright (C) 2012 Orange
 *
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 2 of the License, or (at your option) any later version.
 *
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */
 
// animatedframestest.js

(function(){

// Test for UIPerfTest
if(!window.UIPerfTest){
    alert("Please include uiperftest.js before animatedframestest.js"); 
    return;
}

var self = window.AnimatedFramesTest = {
    frameWidth : 300,
    frameHeight : 300,
    frames : new Array(),
    run : function (label,
                    prerequisites,
                    startCB,
                    stopCB) {
        document.addEventListener('DOMContentLoaded',
        function (evt) {
            UIPerfTest.run(label,prerequisites,startCB,stopCB);
        },
        false);
    },
    randomPositionFrame : function (frame) {
        frame.style['left']= Math.round((Math.random()*(UIPerfTest.contWidth-self.frameWidth)*0.9) + ((UIPerfTest.contHeight-self.frameHeight)*0.05) )+"px";
        frame.style['top']= Math.round((Math.random()*(UIPerfTest.contHeight-self.frameHeight)*0.9) + ((UIPerfTest.contHeight-self.frameHeight)*0.05) )+"px";
    },
    addColoredFrame : function () {
		self.frameWidth = Math.round((UIPerfTest.contWidth)/5);
		self.frameHeight = Math.round((UIPerfTest.contWidth)/5);
        var div= document.createElement("div");
        div.style['position'] = 'absolute';
        div.style['backgroundColor']= "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")";
        div.style['width']= self.frameWidth + "px";
        div.style['height']= self.frameHeight + "px";
        var transitionProperty = window.Modernizr ? Modernizr.prefixed('transition') : 'webkitTransition';
        div.style[transitionProperty] = 'all 1s ease-in-out';
        self.randomPositionFrame(div);
        UIPerfTest.container.appendChild(div);
        self.frames.push(div);
    },
	addImageFrame : function (url) {
		self.frameWidth = Math.round((UIPerfTest.contWidth)/5);
		self.frameHeight = Math.round((UIPerfTest.contWidth)/5);
        var div= document.createElement("div");
        div.style['position'] = 'absolute';
		div.style['backgroundImage']= "url("+url+")";
		div.style['backgroundSize']= self.frameWidth + "px " + self.frameHeight + "px";
		div.style['backgroundRepeat']= "no-repeat";
        div.style['width']= self.frameWidth + "px";
        div.style['height']= self.frameHeight + "px";
        var transitionProperty = window.Modernizr ? Modernizr.prefixed('transition') : 'webkitTransition';
        div.style[transitionProperty] = 'all 1s ease-in-out';
        self.randomPositionFrame(div);
        UIPerfTest.container.appendChild(div);
        self.frames.push(div);
    },
	addTextFrame : function (text) {
		text= text ? text : "Text in CSS3";
		self.frameWidth = Math.round((UIPerfTest.contWidth)/5);
		self.frameHeight = Math.round((UIPerfTest.contWidth)/5);
        var div= document.createElement("div");
        div.style['position'] = 'absolute';
        div.style['backgroundColor']= "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")";
        div.style['color']= "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")";
		div.style['backgroundSize']= self.frameWidth + "px " + self.frameHeight + "px";
		div.style['backgroundRepeat']= "no-repeat";
        div.style['padding']= "5px";
        div.style['fontSize']= "40px";
        div.style['fontWeight']= "bolder";
        div.style['width']= self.frameWidth + "px";
        //div.style['height']= self.frameHeight + "px";
		div.innerHTML= text; 
        var transitionProperty = window.Modernizr ? Modernizr.prefixed('transition') : 'webkitTransition';
        div.style[transitionProperty] = 'all 1s ease-in-out';
        self.randomPositionFrame(div);
        UIPerfTest.container.appendChild(div);
        self.frames.push(div);
    }
	
}

})();
