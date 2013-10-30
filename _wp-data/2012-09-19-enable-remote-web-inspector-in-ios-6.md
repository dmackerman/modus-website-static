---
author: dave
comments: true



title: Enable Remote Debugging with Safari Web Inspector in iOS 6

categories:
- Development
- iOS
---

***NOTE:** You will need to upgrade to Safari version 6.0 to enable this functionality. *





With the recent release of iOS6, Apple has finally introduced a **remote web inspector** for debugging web applications on iOS devices. Enabling it is simple, but it's buried under a few options on your phone.





On your device, head to **Settings** > **Safari** > **Advanced**





You'll find the Web Inspector toggle there.





![Web Inspector in Safari Settings](http://moduscreate.com/wp-content/uploads/2012/09/screens2.jpg)





Once enabled, you'll need to physically connect your iPhone or iPad to your Mac. Yes, this is Mac only at this point. In Safari's Preferences pane under **Advanced**, check the **_Show Develop menu in the menu bar_** checkbox.





![Safari Develop Menu](http://moduscreate.com/wp-content/uploads/2012/09/j2.png)





Select the **Develop** menu, and your iDevice should be a menu option. You should now be able to inspect DOM elements, modify CSS on the fly, run Javascript commands, and do everything you could normally do from the desktop inspector.





![iPhone Remote Debugging in Action](http://moduscreate.com/wp-content/uploads/2012/09/photo22.jpg)





As a side note, this procedure will also enable remote debugging of your **PhoneGap (Cordova)** and other **UIWebView** based projects.





Do you need professional help with [developing hybrid HTML5 mobile applications](http://moduscreate.com/capabilities/mobile-apps/)?



