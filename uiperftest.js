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
 
// uiperftest.js


(function(){

// Test for Modernizr and fpsmeter
if(!window.Modernizr){
    alert("This test page doesn't seem to include Modernizr: aborting"); 
    return;
}
if(!window.FPSMeter){
    alert("This test page doesn't seem to include FPSMeter: aborting"); 
    return;
}

var self = window.convertCamelCaseToCssAttrib = function(str) {
	str.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');
	return str;
}


var self = window.UIPerfTest = {
    contWidth : 720,
    contHeight : 476,
    //contWidth : 420,
    //contHeight : 276,
    run : function (label,
                    prerequisites,
                    startCB,
                    stopCB,
                    duration,
                    targetFPS,
                    maxIterations) {
        // Test for test-specific prerequisites using Modernizr
        if(prerequisites && prerequisites.length){
            for(var index in prerequisites){
                if(!Modernizr[prerequisites[index]]){
                    test(function(){assert_true(false);},prerequisites[index]+" not supported");
                    return;
                }
            }
        }
        // Our main test function
        var runTest = function(index) {
            document.getElementById("results").innerHTML = "Run #" + index;
            fps = new Array();
            var averageArray = function(arr) {
                var avg = arr[0];
                for (var i = 1; i < arr.length; i++) {
                    avg += arr[i];
                }
                avg = Math.round(avg/arr.length);
                return avg;
            }  
            setTimeout(
                function(){
                    stopCB();
                    var avgfps = averageArray(fps);
                    stopAnimation();
					self.container.innerHTML = "";
                    if(avgfps<targetFPS){
                        tests[index].step(function(){assert_equals(avgfps,targetFPS);});
                    }else{
                        tests[index].step(function(){assert_true(true)});
                    }
                    tests[index].done();
                    if ((tests[index].status != tests[index].FAIL) && (index < maxIterations)){
                        runTest(index+1);
                    }else{
                        // We're done with this test run
                        for (var i=index+1;i<=maxIterations;i++) {
                            tests[i].step(function(){assert_true(false,"Not run due to failure at previous iteration.")});
                            tests[i].done();
                        }
                        done();
                        FPSMeter.stop();
                        var main = document.getElementById('main');
                        main.removeChild(document.getElementById("results"));
                        main.removeChild(self.container);
                    }
                },duration*1000);
            startCB(index);
        };
        
        // Start here
        var fps = null;
        var tests = new Array();
                
        // Assign default values if needed
        duration = duration ? duration : 5;
        targetFPS = targetFPS ? targetFPS : 30;
        maxIterations = maxIterations ? maxIterations : 10;
        
        document.getElementById('label').innerHTML = label;

        setup(function(){},{timeout:(duration+1)*maxIterations*1000});
        // Create an array of tests
        for (var i=1;i<=maxIterations;i++) {
            var testlabel = label + ',Run #' + i + ',dur=' + duration + 's,target=' + targetFPS + 'FPS'; 
            tests[i] = async_test(testlabel);
        }
        // Add an fps meter progress meter event listener
        document.addEventListener('fps',
            function(evt) {
                document.getElementById("results").innerHTML = evt.fps + " fps";
                fps.push(evt.fps);
            },
            false);
        // Start FPS analysis
        FPSMeter.run();
        // Start test run
        runTest(1);
    }
};

function GetFloatValueOfAttr (element,attr) {
    var floatValue = null;
    if (window.getComputedStyle) {
        var compStyle = window.getComputedStyle (element, null);
        try {
            var value = compStyle.getPropertyCSSValue (attr);
            var valueType = value.primitiveType;
            switch (valueType) {
              case CSSPrimitiveValue.CSS_NUMBER:
                  floatValue = value.getFloatValue (CSSPrimitiveValue.CSS_NUMBER);
                  break;
              case CSSPrimitiveValue.CSS_PERCENTAGE:
                  floatValue = value.getFloatValue (CSSPrimitiveValue.CSS_PERCENTAGE);
                  break;
              default:
                  if (CSSPrimitiveValue.CSS_EMS <= valueType && valueType <= CSSPrimitiveValue.CSS_DIMENSION) {
                      floatValue = value.getFloatValue (CSSPrimitiveValue.CSS_PX);
                  }
            }
        } 
        catch (e) {
          // Opera doesn't support the getPropertyCSSValue method
          stringValue = compStyle[attr];
          floatValue = stringValue.substring(0, stringValue.length - 2);
        }
    }
    return floatValue;
}

// Create test page layout 
document.addEventListener('DOMContentLoaded',
                          function (evt) {
                            // Create the page structure
                            var main = document.createElement('div');
                            main.id = 'main';
							
                            self.container = document.createElement('div');
                            self.container.id = 'container';
                            self.container.style['width'] = self.contWidth + 'px';
                            self.container.style['height'] = self.contHeight + 'px';
                            self.container.style['border'] = '1px solid red';
                            self.container.style['position'] = 'relative';
                            self.container.style['marginLeft'] = 'auto';
                            self.container.style['marginRight'] = 'auto';
                            main.appendChild(self.container);
							
                            var title = document.createElement('p');
                            title.id = 'label';
                            main.appendChild(title);
							
							var results = document.createElement('div');
                            results.id = 'results'
							results.style['position'] = 'absolute';
							results.style['top'] = '0px';
							results.style['left'] = '0px';
                            main.appendChild(results);
							
                            var log = document.createElement('div');
                            log.id = 'log';
                            main.appendChild(log);    
							
                            document.body.appendChild(main);
                          },
                          false);

})();
