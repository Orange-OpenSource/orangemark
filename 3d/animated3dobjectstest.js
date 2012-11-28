// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
 
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
	add3dCardFrame : function (big, number) {
		big = big ? big : false;
		number = number ? number : ((self.frameNumber++)%54) + 1;
		if (big) {
			url = '../images/cards_big/card_'+ number +'.png';
			self.frameWidth = 388;
			self.frameHeight = 560;
		}
		else {
			url = '../images/cards_small/card_'+ number +'.png';
			self.frameWidth = 194;
			self.frameHeight = 280;
		}
        var div= document.createElement("div");
        var transitionProperty = window.Modernizr ? Modernizr.prefixed('transition') : 'webkitTransition';
        div.style[transitionProperty] = 'all 1s ease-in-out';
        var transformStyleProperty = window.Modernizr ? Modernizr.prefixed('transformStyle') : 'webkitTransformStyle';
        div.style[transformStyleProperty] = 'preserve-3d';
        div.style['position'] = 'absolute';
		var frame= document.createElement("div");
		frame.style['backgroundImage']= "url("+url+")";
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
		front.style['backgroundRepeat']= "no-repeat";
        front.style['width']= self.frameWidth + "px";
        front.style['height']= self.frameHeight + "px";
        front.style[Modernizr.prefixed('backfaceVisibility')] = 'hidden';
		div.appendChild(front);
		
		// back picture
		var back= document.createElement("div");
		back.style['backgroundImage']= "url("+urlBack+")";
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
	makeCarouselObject : function (number, div, url, urlMax) {
		var index = 0;
		var radius = 0;
		if (number>=4) {
			radius = Math.round(self.frameWidth * number/(Math.PI*2));
			for (var i=0;i<number;i++) {
				var figure= document.createElement("div");
				if (url) {
					var urlTmp = url.replace(/#/g,((index++)%urlMax)+1);
					figure.style['backgroundImage']= "url("+urlTmp+")";
					figure.style['backgroundSize']= self.frameWidth + "px " + self.frameHeight + "px";
					figure.style['backgroundRepeat']= "no-repeat";
				}
				else {
					figure.style['backgroundColor']= "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")";
				}
				figure.style['width']= self.frameWidth + "px";
				figure.style['height']= self.frameHeight + "px";
				figure.style['position']= "absolute";
				figure.style['background']= "hsla(   " + Math.round((360/number)*i) + ", 100%, 50%, 0.8 );";
				figure.style[Modernizr.prefixed('transform')]= "translateX( -" + (self.frameWidth/2) + "px ) rotateY(   "+ Math.round((360/number)*i) +"deg ) translateZ( "+ radius +"px )";
				div.appendChild(figure);
			}
			self.makeCarouselObject(Math.round(number/2), div, url, urlMax);			
		}
		return radius;
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
		var radius = self.makeCarouselObject(number, div);
		self.constant = " rotateX( -25deg ) translateZ( -" + radius + "px )";
		div.style[Modernizr.prefixed('transform')]= self.constant;
		div.style['top']= Math.round(UIPerfTest.contHeight/2 - self.frameHeight/2) + "px";
		div.style['left']= Math.round(UIPerfTest.contWidth/2 ) + "px";
        UIPerfTest.container.appendChild(div);
        self.objects3d.push(div);
    },
	moveObject :  function (object, move) {
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
		var radius = self.makeCarouselObject(number, div, '../images/cards_small/card_#.png', 54);
		self.constant = " rotateX( -25deg ) translateZ( -" + radius + "px )";
		div.style[Modernizr.prefixed('transform')] = self.constant;
		div.style['top']= Math.round(UIPerfTest.contHeight/2 - self.frameHeight/2) + "px";
		div.style['left']= Math.round(UIPerfTest.contWidth/2 ) + "px";
        UIPerfTest.container.appendChild(div);
        self.objects3d.push(div);
    },
	makeSphereObject : function (number, div, square, url, urlMax) {
		square = square ? square : false;
		var index = 0;
		var radius = 0;
		if (number>=4) {
			radius = Math.round(self.frameWidth * number/(Math.PI*2));
			var maxRotateY = Math.round(number/2);
			var maxRotateX = Math.round(number);
			var interTop = Math.round(number/4);
			var interBottom = Math.round(3*number/4);
			for (var ry=0;ry<maxRotateY;ry++) {
				var color = "";
				for (var rx=0;rx<=maxRotateX;rx++) {
					color = "rgb(" + Math.abs(Math.round(128-128*Math.sin(Math.PI*rx*2/number + Math.PI/2))) + "," + Math.abs(Math.round(128-128*Math.cos(Math.PI*rx*2/number - Math.PI))) + "," + Math.abs(Math.round(128-128*Math.sin(Math.PI*rx*2/number))) + ")";
					if (ry!=rx && rx==interTop) continue;
					if (ry!=0 && rx==interBottom) continue;
					var figure= document.createElement("div");
					if (url) {
						var urlTmp = url.replace(/#/g,((index++)%urlMax)+1);
						figure.style['backgroundImage']= "url("+urlTmp+")";
						figure.style['backgroundSize']= self.frameWidth + "px " + self.frameHeight + "px";
						figure.style['backgroundRepeat']= "no-repeat";
					    figure.style['height']= self.frameHeight + "px";
						figure.style['width']= self.frameWidth + "px";
					}
					else {
						figure.style['backgroundColor']= color;
						figure.style['opacity']= "0.9";
						figure.style['padding']= "5px";
						figure.style['fontSize']= "40px";
						figure.style['fontWeight']= "bolder";
					    figure.style['height']= self.frameHeight + "px";
						if (square) {
							figure.style['width']= self.frameWidth + "px";
						}
						else {
							if (rx==interTop || rx==interBottom) {
								figure.style['width']= self.frameWidth + "px";
								figure.style['borderRadius'] = '50%';
							}
							else {
								var width = Math.abs(self.frameWidth*Math.cos(rx*2*Math.PI/number));
								figure.style['width']= width + "px";
								figure.style['left']=  Math.round((self.frameWidth - width) / 2) + "px";
							}
						}
					}
					figure.style['position']= "absolute";
					figure.style['background']= "hsla(   " + Math.round((360/number)*ry) + ", 100%, 50%, 0.8 );";
					figure.style[Modernizr.prefixed('transform')] = "translateY( -" + (self.frameHeight/2) + "px ) translateX( -" + (self.frameWidth/2) + "px ) rotateY(   "+ Math.round(ry*360/number) +"deg ) rotateX(   "+ Math.round(rx*360/number) +"deg ) translateZ( "+ radius +"px )";
					div.appendChild(figure);
				}
			}
		}
		return radius;
	},
	addColoredSphereObject : function (number) {
		number = number ? number : 9;
		self.frameWidth = 300;
		self.frameHeight = 300;
        var div= document.createElement("div");
        var transitionProperty = window.Modernizr ? Modernizr.prefixed('transition') : 'webkitTransition';
        div.style[transitionProperty] = 'all 1s ease-in-out';
        var transformStyleProperty = window.Modernizr ? Modernizr.prefixed('transformStyle') : 'webkitTransformStyle';
        div.style[transformStyleProperty] = 'preserve-3d';
        div.style['position'] = 'absolute';
		var radius = self.makeSphereObject(number, div);
		self.constant = " rotateX( -45deg ) translateZ( -" + (2*radius) + "px ) translateY( " + (2*radius) + "px )";
		div.style[Modernizr.prefixed('transform')]= self.constant;
		div.style['top']= Math.round(UIPerfTest.contHeight/2 - self.frameHeight/2) + "px";
		div.style['left']= Math.round(UIPerfTest.contWidth/2 ) + "px";
        UIPerfTest.container.appendChild(div);
        self.objects3d.push(div);
    },
	addImageSphereObject : function (number) {
		number = number ? number : 9;
		self.frameWidth = 194;
		self.frameHeight = 280;
        var div= document.createElement("div");
        var transitionProperty = window.Modernizr ? Modernizr.prefixed('transition') : 'webkitTransition';
        div.style[transitionProperty] = 'all 1s ease-in-out';
        var transformStyleProperty = window.Modernizr ? Modernizr.prefixed('transformStyle') : 'webkitTransformStyle';
        div.style[transformStyleProperty] = 'preserve-3d';
        div.style['position'] = 'absolute';
		var radius = self.makeSphereObject(number, div, true,  '../images/cards_small/card_#.png', 54);
		self.constant = " rotateX( -45deg ) translateZ( -" + (2*radius) + "px ) translateY( " + (2*radius) + "px )";
		div.style[Modernizr.prefixed('transform')]= self.constant;
		div.style['top']= Math.round(UIPerfTest.contHeight/2 - self.frameHeight/2) + "px";
		div.style['left']= Math.round(UIPerfTest.contWidth/2 ) + "px";
        UIPerfTest.container.appendChild(div);
        self.objects3d.push(div);
    },
}
})();

