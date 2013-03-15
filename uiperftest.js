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

var self = window.UIPerfTest = {
    contWidth : 720,
    contHeight : 476,
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
        targetFPS = targetFPS ? targetFPS : 25;
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
							
                            var results = document.createElement('a');
                            results.id = 'results'
							results.style['position'] = 'absolute';
							results.style['left'] = '50%';
							results.style['marginLeft'] = Math.round(self.contWidth/2) + 'px';
							results.style['width'] = '80px';
                            results.style['border'] = '5px solid #5A5C61';
                            results.style['fontSize'] = '1.5em';                            
                            results.style['fontFamily'] = 'letsgodigital, sans-serif';
                            results.style['color'] = 'orange';
                            results.style['backgroundColor'] = 'black';
                            main.appendChild(results);
                            
                            self.container = document.createElement('div');
                            self.container.id = 'container';
                            self.container.style['width'] = self.contWidth + 'px';
                            self.container.style['height'] = self.contHeight + 'px';
                            self.container.style['backgroundColor'] = 'white';
                            self.container.style['border'] = '5px solid #5A5C61';
                            self.container.style['position'] = 'relative';
                            self.container.style['marginLeft'] = 'auto';
                            self.container.style['marginRight'] = 'auto';
                            self.container.style['overflow'] = 'hidden';
                            main.appendChild(self.container);

                            var title = document.createElement('p');
                            title.id = 'label';
                            main.appendChild(title);
                            							
                            var log = document.createElement('div');
                            log.id = 'log';
                            main.appendChild(log);    
							
                            document.body.appendChild(main);
                          },
                          false);

})();
