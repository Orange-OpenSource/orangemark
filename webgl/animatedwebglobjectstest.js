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
  
// SOFTWARE
// animatedwebglobjectstest.js
var stats;
var camera, scene, renderer;

var geometry, group;
var animationId = null;

(function(){

// Test for UIPerfTest
if(!window.UIPerfTest){
	alert("Please include uiperftest.js before animatedwebglobjectstest.js"); 
	return;
}

var self = window.AnimatedWebGlObjectsTest = {
	objectNumber : 0,
	webGlObjects : new Array(),
	run : function (label, prerequisites, startCB, stopCB) {
		document.addEventListener('DOMContentLoaded',   
			function (evt) {
				UIPerfTest.run(label,prerequisites,startCB,stopCB);
			},
			false);
	},

	loadTexture : function( path ) {
		var texture = THREE.ImageUtils.loadTexture( path );
		var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: true, fog: false } );
		return material;
	},

	init : function (mode, background) {
		// mode : AnimatedWebGlObjectsTest.RENDERER_CANVAS or AnimatedWebGlObjectsTest.RENDERER_WEBGL
		// background : true or false
		mode = mode ? mode : AnimatedWebGlObjectsTest.RENDERER_WEBGL;
		background = background ? background : false;
		this.stop();
		camera = new THREE.PerspectiveCamera( 60, UIPerfTest.contWidth / UIPerfTest.contHeight, 1, 10000 );
		camera.position.z = 2500;
		scene = new THREE.Scene();
		if (background==false) {
			scene.fog = new THREE.Fog( 0x000000, 10, 5000 );
			scene.fog.color.setHSV( 0.51, 0.6, 0.025 );
			// lights
			var ambient = new THREE.AmbientLight( 0x505050 );
			scene.add( ambient );
			var light = new THREE.PointLight( 0xffffff, 1);
			light.position.set( 0, 500, 1000 );
			scene.add( light );
		}
		else {
			// lights
			var ambient = new THREE.AmbientLight( 0x909090 );
			scene.add( ambient );
		}
		if (background) {
			var materials = [
				this.loadTexture( '../images/texture/skybox/px.jpg' ), // right
				this.loadTexture( '../images/texture/skybox/nx.jpg' ), // left
				this.loadTexture( '../images/texture/skybox/py.jpg' ), // top
				this.loadTexture( '../images/texture/skybox/ny.jpg' ), // bottom
				this.loadTexture( '../images/texture/skybox/pz.jpg' ), // back
				this.loadTexture( '../images/texture/skybox/nz.jpg' )  // front
			];
			mesh = new THREE.Mesh( new THREE.CubeGeometry( 10000, 10000, 10000, 7, 7, 7 ), new THREE.MeshFaceMaterial( materials ) );
			mesh.scale.x = - 1;
			scene.add( mesh );
		}
		if (mode == AnimatedWebGlObjectsTest.RENDERER_CANVAS) {
			renderer = new THREE.CanvasRenderer();
		}
		else if (mode == AnimatedWebGlObjectsTest.RENDERER_WEBGL) {
			renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
		}
		renderer.setSize( UIPerfTest.contWidth, UIPerfTest.contHeight );
		renderer.sortObjects = false;
		if (background==false) renderer.setClearColor( scene.fog.color, 1 );
		UIPerfTest.container.appendChild( renderer.domElement );
	},


	addWebGlObject : function (nb, shape, effect) {
		// shape : AnimatedWebGlObjectsTest.SHAPE_CUBE or AnimatedWebGlObjectsTest.SHAPE_SPHERE
		// effect : AnimatedWebGlObjectsTest.EFFECT_FLAT, AnimatedWebGlObjectsTest.EFFECT_TEXTURE, AnimatedWebGlObjectsTest.EFFECT_REFLECT, AnimatedWebGlObjectsTest.EFFECT_BUMP, or AnimatedWebGlObjectsTest.EFFECT_OPACIY
		var geometry = null;
		if (shape == AnimatedWebGlObjectsTest.SHAPE_CUBE) {
			geometry = new THREE.CubeGeometry( 200, 200, 200 );
		}
		else if (shape == AnimatedWebGlObjectsTest.SHAPE_SPHERE) {
			geometry = new THREE.SphereGeometry( 400, 16, 8 );
		}
		else {
			geometry = new THREE.CubeGeometry( 100, 100, 100 );
		}
		var material = null;
		if (effect == AnimatedWebGlObjectsTest.EFFECT_FLAT) {
			material = new THREE.MeshNormalMaterial();
		}
		else if (effect == AnimatedWebGlObjectsTest.EFFECT_TEXTURE) {
			var texture = THREE.ImageUtils.loadTexture( '../images/texture/crate.gif' );
			texture.anisotropy = renderer.getMaxAnisotropy();
			material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 50, map: texture } );
		}
		else if (effect == AnimatedWebGlObjectsTest.EFFECT_REFLECT) {
			var urls = [ 
						'../images/texture/skybox/px.jpg', // right
						'../images/texture/skybox/nx.jpg', // left
						'../images/texture/skybox/py.jpg', // top
						'../images/texture/skybox/ny.jpg', // bottom
						'../images/texture/skybox/pz.jpg', // back
						'../images/texture/skybox/nz.jpg'  // front
			];
			var textureCube = THREE.ImageUtils.loadTextureCube( urls );
			material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube, specular: 0xffffff, shininess: 50 } )
		}
		else if (effect == AnimatedWebGlObjectsTest.EFFECT_OPACITY) {
			material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 50, opacity: 0.3, transparent : true , refractionRatio: 0.98, reflectivity:0.9} );
		}
		else if (effect == AnimatedWebGlObjectsTest.EFFECT_BUMP) {
			var texture = THREE.ImageUtils.loadTexture( '../images/texture/crate.gif' );
			texture.anisotropy = renderer.getMaxAnisotropy();
			var mapHeight = THREE.ImageUtils.loadTexture( '../images/texture/crate_bump.gif' );
			mapHeight.anisotropy = 4;
			mapHeight.repeat.set( 0.998, 0.998 );
			mapHeight.offset.set( 0.001, 0.001 )
			mapHeight.wrapS = mapHeight.wrapT = THREE.RepeatWrapping;
			mapHeight.format = THREE.RGBFormat;
			material = new THREE.MeshPhongMaterial( { ambient: 0x552811, color: 0x552811, specular: 0x333333, shininess: 25, map: texture , bumpMap: mapHeight, bumpScale: 19, metal: false } );
		}
		else {
			material = new THREE.MeshNormalMaterial();
		}

		group = new THREE.Object3D();
		for ( var i = 0; i < nb; i++ ) {
			var mesh = new THREE.Mesh( geometry, material );
			mesh.position.x = Math.random() * 2000 - 1000;
			mesh.position.y = Math.random() * 2000 - 1000;
			mesh.position.z = Math.random() * 2000 - 1000;
			mesh.rotation.x = Math.random() * 360 * ( Math.PI / 180 );
			mesh.rotation.y = Math.random() * 360 * ( Math.PI / 180 );
			mesh.matrixAutoUpdate = false;
			mesh.updateMatrix();
			group.add( mesh );
		}
		scene.add( group );
	},

	update : function () {
		animationId = requestAnimationFrame( AnimatedWebGlObjectsTest.update );
		AnimatedWebGlObjectsTest.draw();
	},

	draw : function () {
		camera.lookAt( scene.position );
		group.rotation.x = Math.sin( Date.now() * 0.0007 ) * 0.5;
		group.rotation.y = Math.sin( Date.now() * 0.0003 ) * 0.5;
		group.rotation.z = Math.sin( Date.now() * 0.0002 ) * 0.5;
		renderer.render( scene, camera );
	},

	stop : function () {
		cancelAnimationFrame(animationId);
		THREE.Animation.prototype.stop();
	},

}
})();

AnimatedWebGlObjectsTest.RENDERER_CANVAS = 1;
AnimatedWebGlObjectsTest.RENDERER_WEBGL = 2;
AnimatedWebGlObjectsTest.SHAPE_CUBE = 1;
AnimatedWebGlObjectsTest.SHAPE_SPHERE = 2;
AnimatedWebGlObjectsTest.EFFECT_FLAT = 1;
AnimatedWebGlObjectsTest.EFFECT_TEXTURE = 2;
AnimatedWebGlObjectsTest.EFFECT_REFLECT = 3;
AnimatedWebGlObjectsTest.EFFECT_BUMP = 4;
AnimatedWebGlObjectsTest.EFFECT_OPACITY = 5;
