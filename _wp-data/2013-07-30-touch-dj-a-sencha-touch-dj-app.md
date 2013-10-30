---
author: stan
comments: true



title: Touch DJ - A Sencha Touch DJ App

categories:
- Design
- Development
- Meetups
---

During the [DJing with Sencha Touch](http://moduscreate.com/road-to-senchacon-djing-with-sencha-touch/) talk at SenchaCon 2013 we finally unveiled and demonstrated Touch DJ.





# Overview





Touch DJ is a full fledged DJ app. It takes inspiration from existing DJ hardware and desktop DJ software (such as Traktor and Serato Scratch Live).





The app implements the following features:







  * Two CDJ-style audio decks





    * Real Time Waveform Display


    * Play / Cue


    * Looping


    * Pitch Adjustment


    * Pitch Bending




  * 2 Channel Audio Mixer





    * 3 Band Equalizer (High, Mid, Low)


    * Channel Volume Control


    * Channel Volume Meters


    * Deck Transport Buttons




  * Track Browser





    * Display Track Metadata and Cover Art


    * Deck Load Buttons




  * External MIDI Support





    * Control App Functions from any MIDI Device / Software 


    * Includes Sample TouchOSC Layout 







# Demo





You can check out Touch DJ in (almost) all its glory here: [touchdj.moduscreate.com](http://touchdj.moduscreate.com)





# Screenshots





[![Screenshot_4](http://moduscreate.com/wp-content/uploads/2013/07/Screenshot_4-455x350.png)](http://moduscreate.com/wp-content/uploads/2013/07/Screenshot_4.png)





[![iOS Simulator Screen shot Jul 3, 2013 1.09.13 AM](http://moduscreate.com/wp-content/uploads/2013/07/iOS-Simulator-Screen-shot-Jul-3-2013-1.09.13-AM-466x350.png)](http://moduscreate.com/wp-content/uploads/2013/07/iOS-Simulator-Screen-shot-Jul-3-2013-1.09.13-AM.png)





[![iOS Simulator Screen shot Jul 3, 2013 1.21.17 AM](http://moduscreate.com/wp-content/uploads/2013/07/iOS-Simulator-Screen-shot-Jul-3-2013-1.21.17-AM-466x350.png)](http://moduscreate.com/wp-content/uploads/2013/07/iOS-Simulator-Screen-shot-Jul-3-2013-1.21.17-AM.png)





# Development





The app was written using Sencha Touch 2.2 on the front-end and Node.js to serve the static content, support the Track Browser as well as the MIDI communication via WebSockets.





The client was also supported by the following 3rd party libraries:







  * [Wavesurfer.js](http://katspaugh.github.io/wavesurfer.js/) 



    * Real-time Waveform Display




  * [Dragdealer.js](http://code.ovidiu.ch/dragdealer/) 



    * Touch enabled Slider




  * [JavaScript ID3 Reader](https://github.com/aadsm/JavaScript-ID3-Reader) 



    * Parse ID3 Metadata and CoverArt from MP3 files







This application would not have been possible without the HTML5 [Web Audio API](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html). The Web Audio API was used to handle the playing of the audio tracks, implementing a 3 Band Equalizer, Channel Volume Control & Meter, as well as the Crossfader.





This is what the Audio Routing Graph looks like for the Touch DJ app:





[![senchacon presentation.024](http://moduscreate.com/wp-content/uploads/2013/07/senchacon-presentation.024.jpg)](http://moduscreate.com/wp-content/uploads/2013/07/senchacon-presentation.024.jpg)





# More Info





For more info on Touch DJ, here is the SenchaCon 2013 Presentation on "DJing with Sencha Touch"







# Source





Touch DJ is available in open source under the MIT license. Feel free to fork the repo:





[Touch DJ on GitHub](https://github.com/ModusCreateOrg/TouchDJ)



