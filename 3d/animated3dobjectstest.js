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
 
// animated3dobjectstest.js

(function(){

// Test for UIPerfTest
if(!window.UIPerfTest){
    alert("Please include uiperftest.js before animated3dobjectstest.js"); 
    return;
}

var self = window.Animated3dObjectsTest = {
    frameWidth : 300,
    frameHeight : 300,
	frameNumber : 0,
	constant : "",
    objects3d : new Array(),
    run : function (label,
                    prerequisites,
                    startCB,
                    stopCB) {
        document.addEventListener('DOMContentLoaded',
        function (evt) {
			var perspectiveProperty = window.Modernizr ? Modernizr.prefixed('perspective') : 'webkitPerspective';
			document.getElementById("container").style[perspectiveProperty] = 500;
            UIPerfTest.run(label,prerequisites,startCB,stopCB);
        },
        false);
    },
    randomPositionObject : function (object) {
        object.style['left']= Math.round((Math.random()*(UIPerfTest.contWidth-self.frameWidth)*0.9) + ((UIPerfTest.contHeight-self.frameHeight)*0.05) )+"px";
        object.style['top']= Math.round((Math.random()*(UIPerfTest.contHeight-self.frameHeight)*0.9) + ((UIPerfTest.contHeight-self.frameHeight)*0.05) )+"px";
    },
    add3dColoredFrame : function () {
		//self.frameWidth = Math.round((UIPerfTest.contWidth)/5);
		//self.frameHeight = Math.round((UIPerfTest.contWidth)/5);
        var div= document.createElement("div");
        var transitionProperty = window.Modernizr ? Modernizr.prefixed('transition') : 'webkitTransition';
        div.style[transitionProperty] = 'all 1s ease-in-out';
        var transformStyleProperty = window.Modernizr ? Modernizr.prefixed('transformStyle') : 'webkitTransformStyle';
        div.style[transformStyleProperty] = 'preserve-3d';
        div.style['position'] = 'absolute';
		var frame= document.createElement("div");
        frame.style['backgroundColor']= "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")";
        frame.style['width']= self.frameWidth + "px";
        frame.style['height']= self.frameHeight + "px";
		div.appendChild(frame);
        self.randomPositionObject(div);
        UIPerfTest.container.appendChild(div);
        self.objects3d.push(div);
    },
	add3dImageFrame : function (url) {
		self.frameWidth = Math.round((UIPerfTest.contWidth)/3);
		self.frameHeight = Math.round((UIPerfTest.contWidth)/3);
        var div= document.createElement("div");
        var transitionProperty = window.Modernizr ? Modernizr.prefixed('transition') : 'webkitTransition';
        div.style[transitionProperty] = 'all 1s ease-in-out';
        var transformStyleProperty = window.Modernizr ? Modernizr.prefixed('transformStyle') : 'webkitTransformStyle';
        div.style[transformStyleProperty] = 'preserve-3d';
        div.style['position'] = 'absolute';
		var frame= document.createElement("div");
        //frame.style['backgroundColor']= "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")";
		frame.style['backgroundImage']= "url("+url+")";
		frame.style['backgroundSize']= self.frameWidth + "px " + self.frameHeight + "px";
		frame.style['backgroundRepeat']= "no-repeat";
        frame.style['width']= self.frameWidth + "px";
        frame.style['height']= self.frameHeight + "px";
		div.appendChild(frame);
        self.randomPositionObject(div);
        UIPerfTest.container.appendChild(div);
        self.objects3d.push(div);
    },
	add3dTextFrame : function (text) {
		self.frameNumber++;
		text= text ? text : "Text " + self.frameNumber + " in CSS3";
		self.frameWidth = Math.round((UIPerfTest.contWidth)/5);
		self.frameHeight = Math.round((UIPerfTest.contWidth)/5);
        var div= document.createElement("div");
        var transitionProperty = window.Modernizr ? Modernizr.prefixed('transition') : 'webkitTransition';
        div.style[transitionProperty] = 'all 1s ease-in-out';
        var transformStyleProperty = window.Modernizr ? Modernizr.prefixed('transformStyle') : 'webkitTransformStyle';
        div.style[transformStyleProperty] = 'preserve-3d';
        div.style['position'] = 'absolute';
		var frame= document.createElement("div");
        frame.style['backgroundColor']= "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")";
        frame.style['color']= "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")";
        div.style['padding']= "5px";
        div.style['fontSize']= "40px";
        div.style['fontWeight']= "bolder";
        div.style['width']= self.frameWidth + "px";
        //div.style['height']= self.frameHeight + "px";
		frame.innerHTML= text; 
		div.appendChild(frame);
        self.randomPositionObject(div);
        UIPerfTest.container.appendChild(div);
        self.objects3d.push(div);
    },
	add3dLogoFrame : function (number) {
		number = number ? number : ((self.frameNumber++)%16);
		url = '../images/logo/logo_'+ number +'.png'
		self.frameWidth = 300;
		self.frameHeight = 300;
        var div= document.createElement("div");
        var transitionProperty = window.Modernizr ? Modernizr.prefixed('transition') : 'webkitTransition';
        div.style[transitionProperty] = 'all 1s ease-in-out';
        var transformStyleProperty = window.Modernizr ? Modernizr.prefixed('transformStyle') : 'webkitTransformStyle';
        div.style[transformStyleProperty] = 'preserve-3d';
        div.style['position'] = 'absolute';
		var frame= document.createElement("div");
        //frame.style['backgroundColor']= "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")";
		frame.style['backgroundImage']= "url("+url+")";
		//frame.style['backgroundSize']= self.frameWidth + "px " + self.frameHeight + "px";
		frame.style['backgroundRepeat']= "no-repeat";
        frame.style['width']= self.frameWidth + "px";
        frame.style['height']= self.frameHeight + "px";
		div.appendChild(frame);
        self.randomPositionObject(div);
        UIPerfTest.container.appendChild(div);
        self.objects3d.push(div);
    },
	addCardObject : function (big, number) {
		big = big ? big : false;
		number = number ? number : ((self.frameNumber++)%54) + 1;
		if (big) {
			self.frameWidth = 388;
			self.frameHeight = 560;
			urlFront = '../images/cards_big/card_'+ number +'.png';
			urlBack = '../images/cards_big/card_0.png';
		}
		else {
			self.frameWidth = 194;
			self.frameHeight = 280;
			urlFront = '../images/cards_small/card_'+ number +'.png';
			urlBack = '../images/cards_small/card_0.png';
		}

        var div= document.createElement("div");
        var transitionProperty = window.Modernizr ? Modernizr.prefixed('transition') : 'webkitTransition';
        div.style[transitionProperty] = 'all 1s ease-in-out';
        div.style[Modernizr.prefixed('transformStyle')] = 'preserve-3d';
        div.style['position'] = 'absolute';
        div.style['width']= self.frameWidth + "px";
        div.style['height']= self.frameHeight + "px";
		
		// front picture
		var front= document.createElement("div");
		front.style['backgroundImage']= "url("+urlFront+")";
		//frame.style['backgroundSize']= self.frameWidth + "px " + self.frameHeight + "px";
		front.style['backgroundRepeat']= "no-repeat";
        front.style['width']= self.frameWidth + "px";
        front.style['height']= self.frameHeight + "px";
        front.style[Modernizr.prefixed('backfaceVisibility')] = 'hidden';
		div.appendChild(front);
		
		// back picture
		var back= document.createElement("div");
		back.style['backgroundImage']= "url("+urlBack+")";
		//frame.style['backgroundSize']= self.frameWidth + "px " + self.frameHeight + "px";
		back.style['backgroundRepeat']= "no-repeat";
        back.style['width']= self.frameWidth + "px";
        back.style['height']= self.frameHeight + "px";
        back.style[Modernizr.prefixed('backfaceVisibility')] = 'hidden';
		back.style[Modernizr.prefixed('transform')] = 'rotateY( 180deg ) translateY( -' + (self.frameHeight) + 'px )';
		div.appendChild(back);

        self.randomPositionObject(div);
        UIPerfTest.container.appendChild(div);
        self.objects3d.push(div);
    },	
	addColoredCarouselObject : function (number) {
		number = number ? number : 9;
		self.frameWidth = 300;
		self.frameHeight = 300;
        var div= document.createElement("div");
        var transitionProperty = window.Modernizr ? Modernizr.prefixed('transition') : 'webkitTransition';
        div.style[transitionProperty] = 'all 1s ease-in-out';
        var transformStyleProperty = window.Modernizr ? Modernizr.prefixed('transformStyle') : 'webkitTransformStyle';
        div.style[transformStyleProperty] = 'preserve-3d';
        div.style['position'] = 'absolute';
		for (var i=0;i<number;i++) {
			var figure= document.createElement("div");
			var radius = Math.round(self.frameWidth * number/6.284);
			figure.style['backgroundColor']= "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")";
			//figure.style['backgroundImage']= "url("+url+")";
			//figure.style['backgroundSize']= self.frameWidth + "px " + self.frameHeight + "px";
			//figure.style['backgroundRepeat']= "no-repeat";
			figure.style['width']= self.frameWidth + "px";
			figure.style['height']= self.frameHeight + "px";
			figure.style['position']= "absolute";
			figure.style['background']= "hsla(   " + Math.round((360/number)*i) + ", 100%, 50%, 0.8 );";
			figure.style[Modernizr.prefixed('transform')]= "translateX( -" + (self.frameWidth/2) + "px ) rotateY(   "+ Math.round((360/number)*i) +"deg ) translateZ( "+ radius +"px )";
			div.appendChild(figure);
		}
		self.constant = " rotateX( -25deg ) translateZ( -" + radius + "px )";
		div.style[Modernizr.prefixed('transform')]= self.constant;
		div.style['top']= Math.round(UIPerfTest.contHeight/2 - self.frameHeight/2) + "px";
		div.style['left']= Math.round(UIPerfTest.contWidth/2 ) + "px";
        UIPerfTest.container.appendChild(div);
        self.objects3d.push(div);
    },
	moveCarouselObject :  function (object, move) {
		object.style[Modernizr.prefixed('transform')] = self.constant + ' ' + move;
	},
	addCImageCarouselObject : function (number) {
		number = number ? number : 9;
		self.frameWidth = 194;
		self.frameHeight = 280;
        var div= document.createElement("div");
        var transitionProperty = window.Modernizr ? Modernizr.prefixed('transition') : 'webkitTransition';
        div.style[transitionProperty] = 'all 1s ease-in-out';
        var transformStyleProperty = window.Modernizr ? Modernizr.prefixed('transformStyle') : 'webkitTransformStyle';
        div.style[transformStyleProperty] = 'preserve-3d';
        div.style['position'] = 'absolute';
		for (var i=0;i<number;i++) {
			var figure= document.createElement("div");
			var radius = Math.round(self.frameWidth * number/6.284);
			var urlFront = '../images/cards_small/card_'+ ((i%54) + 1) +'.png';
			//figure.style['backgroundColor']= "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")";
			
			figure.style['backgroundImage']= "url("+urlFront+")";
			//figure.style['backgroundSize']= self.frameWidth + "px " + self.frameHeight + "px";
			//figure.style['backgroundRepeat']= "no-repeat";
			figure.style['width']= self.frameWidth + "px";
			figure.style['height']= self.frameHeight + "px";
			figure.style['position']= "absolute";
			figure.style['background']= "hsla(   " + Math.round((360/number)*i) + ", 100%, 50%, 0.8 );";
			figure.style[Modernizr.prefixed('transform')]= "translateX( -" + (self.frameWidth/2) + "px )  rotateY(   "+ Math.round((360/number)*i) +"deg ) translateZ( "+ radius +"px ) ";
			div.appendChild(figure);
		}
		self.constant = " rotateX( -25deg ) translateZ( -" + radius + "px )";
		div.style[Modernizr.prefixed('transform')] = self.constant;
		div.style['top']= Math.round(UIPerfTest.contHeight/2 - self.frameHeight/2) + "px";
		div.style['left']= Math.round(UIPerfTest.contWidth/2 ) + "px";
        UIPerfTest.container.appendChild(div);
        self.objects3d.push(div);
    },
}

})();
