---
author: dave
comments: true



title: Announcing the Diablo 3 Mobile Companion

categories:
- News
- Cordova
- PhoneGap
- Sencha Touch
---

[Diablo 3](http://www.diablo3.com) is Blizzard's latest disruptor of productivity, social lives, and self preservation. It broke the record for fastest selling PC game (more than 3.5m over 24hours), and for very good reason. In simplest terms, it is an action RPG. The player creates a character and overtime the character progresses through the story, gaining levels and acquiring items to make him/her more powerful.





Blizzard has recently released an API for accessing player data and thus as huge fans of the game we went ahead and built a Companion app to the game.





[gallery order="DESC" columns="6" size="large" link="file" exclude="3266,3268,3261,3257,3295,3299"]





## Features







  * View your heros **Attributes, Items and Skills**


  * Add friends, and view their heroes.


  * See attribute/stat differences since last login for both you and your friends.


  * Read Blizzard's Latest Diablo 3 News


  * See server and auction house status





## Technology







  * Sencha Touch 2.0.1


  * Apache Cordova 2.0.0 with the ChildBrowser Plugin





## Development





Most of the app was developed and styled over the course of a week while we had some free time to spare. Aside from the Carousel, TitleBar, MessageBox, Panel we leveraged all custom views and styling.





Primary communication with Blizzard APIs was done over JsonP. For certain functionality we had to extend Sencha's JsonP data class to suite our needs. We also leverage Cordova's External Host Whitelist to support News and Server Status.





As with most projects we were able to develop some new tricks as seen by our recent blog posts:







  * [Opening All URLs With Cordova's ChildBrowser Plugin](http://moduscreate.com/opening-all-urls-with-phonegaps-childbrowser-plugin/)


  * [Tinting Your Status Bar in iOS6 and Cordova](http://moduscreate.com/tinting-your-status-bar-in-ios6-and-phonegap/)


  * _More development-specific posts are coming._





## Design & Styling





Overall design for the app is following fairy standard mobile design paradigms. We use the bottom tab bar for main high level sections, and carousels to quickly run through your heroes and their associated data.





[caption id="attachment_3261" align="aligncenter" width="319"]![Diablo 3 Companion Tabs](http://moduscreate.com/wp-content/uploads/2012/09/tabs2.png) We switch the "Heroes" text to the currently selected hero's name to give the user context if they switch away from the tab.[/caption]





The Diablo API gives us some very good looking icon assets for items and skills. Unfortunately, these assets are not retina optimized (_are you listening Blizzard?_), but overall the app came together great. The majority of the app is custom Sencha Touch XTemplates.





[caption id="attachment_3266" align="aligncenter" width="323"]![D3 List](http://moduscreate.com/wp-content/uploads/2012/09/list2.png) We implemented a custom list by using `webkit-box` layout versus floats. Top toolbars remain static to keep the user acclimated to what data they are looking at.[/caption]





To truly give the app the Diablo look and feel, we precisely copied the colors used in-game for items, skills, as well as general text throughout the application.





[caption id="attachment_3268" align="aligncenter" width="304"]![D3 Skills](http://moduscreate.com/wp-content/uploads/2012/09/skills2.png) The OSX Color Picker became our best friend in determining which colors to used for Diablo related elements. Doing this really keeps the app looking consistent to the game.[/caption]





## Available on the iOS App Store and Google Play





D3 Mobile Companion is now available, for free, on the iOS App Store and Google Play.





[caption id="attachment_3299" align="aligncenter"][[![Diablo 3 Companion - on the app store](http://moduscreate.com/wp-content/uploads/2012/09/app-store2.png)](http://itunes.apple.com/us/app/diablo-3-mobile-companion/id565829323?ls=1&mt=8)][4](http://moduscreate.com/opening-all-urls-with-phonegaps-childbrowser-plugin/)[/caption]






  [ ![Android app on Google Play](http://developer.android.com/images/brand/en_app_rgb_wo_60.png) ](http://play.google.com/store/apps/details?id=com.moduscreate.d3mobile)






## Source Code





We have open sourced our iOS and Android versions of Diablo 3 Mobile Companion under the MIT license.





[Diablo 3 Mobile Companion GitHub repo](https://github.com/ModusCreateOrg/d3-mobile-companion)





## Authors







  * Stan Bershadskiy ([@stan229](http://twitter.com/stan229))


  * Dave Ackerman ([@dmackerman](http://twitter.com/dmackerman))


  * Special Thanks to: Jay, Grgur and Richard



