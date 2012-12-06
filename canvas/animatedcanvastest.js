// Copyright (C) 2012 Orange
//
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
 
// animatedcanvastest.js

(function(){

// Test for UIPerfTest
if(!window.UIPerfTest){
    alert("Please include uiperftest.js before animatedcanvastest.js"); 
    return;
}

var self = window.AnimatedCanvasTest = {
	ctx: null,
	frameWidth : 300,
    frameHeight : 300,
	objectNumber : 0,
    canvasObjects : new Array(),
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
	init : function () {
		UIPerfTest.container.innerHTML = '<canvas width="'+UIPerfTest.contWidth+'" height="'+UIPerfTest.contHeight+'">Please use a browser that supports canvas, such as <a href="http://www.opera.com/browser/">Opera for desktop</a>.</canvas>';
		//this.canvas = document.querySelector('canvas');
		this.ctx = document.querySelector('canvas').getContext('2d');
		this.canvasObjects = new Array();
	},
	clear : function () {
		clearCanvasObjects(this.ctx, UIPerfTest.contWidth, UIPerfTest.contHeight);
	},
    updateCanvasObject : function (canvasObject) {
		if ((canvasObject.size<32) || (canvasObject.size>this.frameWidth)) canvasObject.deltaSize = -canvasObject.deltaSize;
		canvasObject.size += canvasObject.deltaSize;
		
		if (canvasObject.posx<0) canvasObject.deltax = Math.abs(canvasObject.deltax);
		if (canvasObject.posx>UIPerfTest.contWidth-canvasObject.size) canvasObject.deltax = -Math.abs(canvasObject.deltax);
		if (canvasObject.posy<0) canvasObject.deltay = Math.abs(canvasObject.deltay);
		if (canvasObject.posy>UIPerfTest.contHeight-canvasObject.size) canvasObject.deltay = -Math.abs(canvasObject.deltay);
		canvasObject.posx += canvasObject.deltax;
		canvasObject.posy += canvasObject.deltay;
		
		drawCanvasObject(this.ctx, canvasObject.shape, canvasObject.size, canvasObject.type, canvasObject.posx , canvasObject.posy)
    },
    addCanvasObject : function (shape, type) {
		shape = shape ? shape : "logo";
		type = type ? type : (this.objectNumber%2)==0 ? "original" : "bw";
		this.objectNumber++;
		canvasObject = {
			shape:shape,
			type:type,
			posx:Math.round((Math.random()*UIPerfTest.contWidth + UIPerfTest.contWidth/2) * 0.3),
			posy:Math.round((Math.random()*UIPerfTest.contHeight + UIPerfTest.contHeight/2) * 0.3),
			deltax:Math.round(Math.random()*10 - 5),
			deltay:Math.round(Math.random()*10 - 5),
			size:Math.round(Math.random()*(this.frameWidth-50) + 50),
			deltaSize:Math.round(Math.random()*4 - 2),
		};
        self.canvasObjects.push(canvasObject);
    },
}

})();
