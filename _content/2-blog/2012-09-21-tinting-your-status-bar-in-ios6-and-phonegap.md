---
author: stan
comments: true



title: Tinting your Status Bar in iOS6 and Cordova

categories:
  - Development
---

One of the new "features" of iOS 6 is that you can now tint the status bar. Instead of Default (Grey), Black Transparent, or Black Opaque it can now be anything.





The way iOS decides what color the status bar should be is based on the color of the lowest pixel of a UINavigationBar component. [Source](http://www.imore.com/ios-6-curious-case-colorful-status-bar)





In a Cordova application, or any fullscreen UIWebView app, there's no UINavigationBar by default, thus no way to tint the status bar.





There is a simple "hack" though that you can employ to get your status bar tinted, you only have to sacrifice one row of pixels.





### Tinting your StatusBar in a Cordova project







  1. Open up your MainViewController.xib in XCode


  2. Drag a NavigationBar to your view 
[![](http://moduscreate.com/wp-content/uploads/2012/09/navigationbar2-300x256.jpeg)](http://moduscreate.com/tinting-your-status-bar-in-ios6-and-phonegap/navigationbar/)






    * Set the tint (color) of the navigation bar 
[![](http://moduscreate.com/wp-content/uploads/2012/09/tint2-300x111.jpeg)](http://moduscreate.com/tinting-your-status-bar-in-ios6-and-phonegap/tint/)






      * Set the position of the UINavigationBar to y: -43px; 
[![](http://moduscreate.com/wp-content/uploads/2012/09/d5za2-300x189.png)](http://moduscreate.com/tinting-your-status-bar-in-ios6-and-phonegap/d5za/)




Now you're all set. You should see something like this





[![](http://moduscreate.com/wp-content/uploads/2012/09/m09s2-300x36.png)](http://moduscreate.com/tinting-your-status-bar-in-ios6-and-phonegap/m09s/)














