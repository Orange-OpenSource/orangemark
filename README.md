# Orange Browser Graphics Performance Test Suite
##Copyright Orange 2012-2013, All Rigths Reserved

A lot of browser benchmarks available on the web are focussing on 
javascript performance only:

- [V8](http://v8.googlecode.com/svn/data/benchmarks/v7/run.html),
- [Sunspider](http://www.webkit.org/perf/sunspider/sunspider.html),
- [Dromaeo](http://dromaeo.com/),
- [SpeedBattle](http://www.speed-battle.com/).

The [PeaceKeeper](http://peacekeeper.futuremark.com/) benchmark includes 
tests on graphics, but mainly using Canvas and DOM manipulations, thus
with a strong dependency on Javascript and DOM Tree.
In addition, it does not distinguish between individual features.

The Orange Mark Test Suite has been designed from the start to benchmark
graphics rendering only.

The benchmark runs a set of tests for specific CSS3 & HTML5 features
using pages of increasing complexity to find out when the framerate drops
under a specific target (30fps). 

The level of complexity reached for each feature gives a mark from 0 to ten.

Run the benckmark [here](http://orange-opensource.github.com/orangemark/)

This [video](http://orange-opensource.github.com/orangemark/expected.ogv)
gives an overview of the expected output.     

Unless explicitly specified differently (see [Credits](#credits)), the 
OrangeMark Test Suite is licensed under an 
[MIT license](http://orange-opensource.github.com/orangemark/LICENSE).

## Local installation

You can install your own copy of the benchmark using standard git commands: 

    git clone https://github.com/Orange-OpenSource/orangemark.git
    cd orangemark
    git submodule init
    git submodule update

## Credits

The Orange Mark test suite uses the following Open Source libraries:

- [Modernizr](http://modernizr.com/) - MIT license 
- [perfmeter](https://github.com/kaizouman/fpsmeter) - MIT license
- [W3C Test harness](http://w3c-test.org/resources/testharness.js) - Dual W3C & BSD license
- [Three.js](https://github.com/mrdoob/three.js/) - Dual MIT and LGPLv3 license
- [SVG Cards](http://svg-cards.sourceforge.net/) - LGPL2.1 license

The test suite uses the following copyrighted resources:

- ['Let's Go Digital' Font](http://www.fontspace.com/wlm-fonts) by Wolf Lambert - Creative Commons (by-sa) Attribution Share Alike
- ['Gallaudet Regular' Font](http://www.fontspace.com/category/ASL) by David Rakowski
