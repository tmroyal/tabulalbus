Tabulalb.us
================================

This is an HTML5 painting surface using realistic brushes. It was written in javascript and is hosted at [tabaulalb.us](http://tabulalb.us).

It was originally intended as part of a paint and chat application, however the chat has not been implemented due to time constraints.

This relies on [jQuery](http://jquery.com/) and [camanjs](http://camanjs.com).

To ensure clarity, implementation of different classes are in separate files. I used [node-minify](https://github.com/srod/node-minify) to compile these files using the compile.js script included.  

This has been tested successfully on Chrome (OS X, Windows), Firefox (OS X,Windows), and Safari (OS X, iOS).

TODO:
=====
* Test on more browsers.
* Create support for Android Webkit.
* Integrate html5shiv for older browsers.
* Refactor to remove redundancies. 
* Snappier response in iOS, with larger and more responsive sliders.