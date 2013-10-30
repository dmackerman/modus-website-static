---
author: tim
comments: true



title: Write your own Google Hangouts with HTML5 and WebRTC

categories:
  - Development
---

Google Hangouts is an easy-to-use video chat service from Google. I happen to like it. You and 9 of your friends can have a live video call, exchange messages, send photos and even share a whiteboard. On the other hand, some people hate it. Perhaps it’s too slow, or the plugin won’t run, or they don’t like the UI, or they’re just Google haters. Whatever the reasons, quit complaining and take matters into your own hands with HTML5 and WebRTC.





## Google and Mozilla ?





Yes. [WebRTC](http://www.webrtc.org/home) is an initiative by Google, Mozilla and Opera that aims to enable web browsers with Real-Time Communications (RTC) capabilities by using simple Javascript APIs without any plugins. That’s right, no plugin required. We can write real-time multimedia apps using nothing but HTML5 and JavaScript.





The API is available in [Chrome](http://chrome.google.com/) both desktop and mobile (chrome://flags enabled) and in [FireFox](http://www.mozilla.org/en-US/firefox/new/).





## What’s in WebRTC ?





Open standards for real-time video, audio and data communication have already been implemented by WebRTC. Some of the core features are:







  1. Voice Engine





> 
  
  
>     * Includes a jitter buffer and error concealment to help overcome network jitter and packet loss 
> 
  
>     * iSAC, iLBC and Opus audio codecs * Acoustic echo canceller 
> 
  
>     * Noise reduction 
> 
  




  2. Video Engine





> 
  
  
>     * VP8 video codec 
> 
  
>     * Video jitter buffer 
> 
  
>     * Video noise reduction
> 
  




  3. Transport





> 
  
  
>     * RTP stack
> 
  
>     * STUN / TURN / ICE 
> 
  
>     * Abstracted session layer so that the actual protocol (websockets, etc) can be decided by the developer
> 
  







## Now what ?





Go to the [ModUX conference](http://www.moduxcon.com/) at the Felix Meritis in Amsterdam, Sept 18-20th and attend the WebRTC session with [Alexandru Lazar](https://twitter.com/alexlazar86) or stop by the [ProvJS](http://www.meetup.com/Prov-JS/) meetup in Providence, RI on Sept 26 to hear [Timothy Eagan](https://twitter.com/TimothyEagan) talk about WebRTC. You can also visit [HTML5 Rocks](http://www.html5rocks.com/en/tutorials/webrtc/basics/) and [codelab](https://bitbucket.org/webrtc/codelab) which both have excellent examples. They’re easy to walk through and can get you up and running in no time.





So what are you waiting for? You can write your own Google Hangouts today...and when you’re done, send me the link. Hurry up though, Alex and I might beat you to it ;-) .



