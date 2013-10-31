---
author: stan
comments: true



title: Diablo 3 Mobile Companion for Windows Phone 8

categories:
  - Development
  - Industry
---

There's a new technology behemoth coming into the Mobile HTML5 ecosystem to wreak havoc, and its name is Windows Phone 8.





Following hot on the heels of its parent operating system Windows 8, Windows Phone 8 looks to make HTML5 a fist-class citizen. We at Modus are nothing but thrilled at this prospect. Fortunately Sencha Microsoft and a special company named Blizzard Entertainment share our excitement and gave us an opportunity to deliver something that is amazing.





Recently, Modus Create released the [Diablo 3 Mobile Companion](http://moduscreate.com/announcing-the-diablo-3-mobile-companion/) to the general public on the [iOS App Store](https://itunes.apple.com/us/app/diablo-3-mobile-companion/id565829323?mt=8), [Google Play](https://play.google.com/store/apps/details?id=com.moduscreate.d3mobile) and the [Amazon App Store](http://www.amazon.com/Modus-Create-Diablo-Mobile-Companion/dp/B009NWMJUA). We got great reviews and positive feedback from the Diablo 3 community. Built using the predominant HTML5 Framework, [Sencha Touch 2](http://moduscreate.com/capabilities/sencha-touch/), it was a natural candidate for the up and coming Windows Phone 8. This caught the attention of the folks at Microsoft and Sencha who thought this would be an ideal candidate as a launch app for the new Windows Phone 8 operating system. We were more than delighted to oblige.





######### Hello Metro





When we ported Diablo 3 Mobile Companion to the Android from our iOS codebase, we didn't make any major modifications to the UI. For the Windows Phone 8 port, we wanted our application to have a more native look and feel, rather than something that was squeezed into constraints or used UI design patterns that are demonstrated on other mobile smart phone operating systems.





Fortunately with Windows 8, Microsoft has made a uniform design throughout the entire OS and all applications called Metro. We took a really good look look at the Operating System UI metaphors as inspiration for the Windows Phone 8 version of our Diablo 3 Mobile Companion application.





[gallery order="DESC" columns="3" size="large" link="file" include="3481,3482,3483,3484,3485,3486"]





Given the new inspiration we garnered from our experience with the Windows Phone 8 OS, we decided to make the Diablo 3 Mobile Companion conform to Metro UI paradigms and standards. After a few days, where's what we came up with.





[gallery order="DESC" columns="4" size="large" link="file" exclude="3457, 3464, 3470, 3472, 3453, 3491"]





To make the Mobile Companion feel more native to Windows Phone 8, we redesigned several views. Nested carousels are not a strong UI paradigm that we observed on Windows Phone, so we removed the carousel for the hero selection screen. Following the WP8 design patterns, your friends are now displayed as tiles. We modified the navigation bar to mimic the Windows Phone 8 UI styles.





This is just scraping the surface as to the amount of work that went in re-imagining this application as a Metro app. The majority of the apps designed for the Windows Phone platform use a very minimalistic approach and flat designs that emphasize data over visualizations.





Here's a video of the application in action inside of a Windows Phone Emulator.





[WP8](http://vimeo.com/52489823) from [Modus Create](http://vimeo.com/moduscreate) on [Vimeo](http://vimeo.com).





######### Our experience with HTML5 development on WP8 using Sencha Touch 2 & Cordova





When we began our port, we had to make our changes inside of Interent Explorer 10. What we found was that IE has the same rendering engine as WP8's browser, which made it very easy to push the rock forward.





[gallery order="DESC" columns="3" size="large" link="file" include="3491" exclude="3457, 3464, 3470, 3472, 3453, 3481, 3482, 3483, 3484, 3485, 3486"]





What we've learned is that Sencha Touch, Coupled with Apache Cordova allows for really easy [development and deployment of HTML5 applications](http://moduscreate.com/capabilities/mobile-apps/). Using Sencha Touch for the UI layer allowed us to create a really unique experience for our application. Cordova allowed us to easily package our application on the WP8 platform for future distribution in the WP8 application store.



