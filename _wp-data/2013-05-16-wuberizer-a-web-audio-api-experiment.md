---
author: stan
comments: true



title: Wuberizer - A Web Audio API Experiment

categories:
- Development
- Tools
- canvas
- HTML5
- JavaScript
- Sencha Touch
- web-audio
---

We at Modus Create are always experimenting with emerging HTML5 Technologies. Recently we began an internal effort to split in groups and research technologies, frameworks or methodologies that we found interesting and present them to the company. The first group effort completed by Stan Bershadskiy, Tyler Knappe and Alex Lazar resulted in an app called Wuberizer.





# Overview





Wuberizer is an audio synthesizer and step sequencer in one. It works off a 16 x 16 cell grid. Each cell results in a different tone at time. You can modify the frequency, adjust the filters, and change the oscillator waveform in real time, as well as set the speed of the sequencer in BPM (beats per minute). Wuberizer also allows you to export your creations into an audio file (WAV).





# Background





The app was inspired by a musical instrument released by Yamaha in 2005 called the [Tenori-on](http://tenori-onusa.com/).







# Technology





**Web Audio API**





The Web Audio API allows you to generate and manipulate sounds in a variety of manners. This includes the creation of sound via oscillators which are manipulated via changes in frequency, applying new filters and changing the waveform, among many others. While Wuberizer focuses on mainly the generation of sounds, the Web Audio API also allows you to manipulate existing, prebuilt sound streams to do a variety of things like build audio players, or play sounds in games.





**Canvas**





To render the 16x16 grid we leveraged the HTML5 Canvas element. The canvas element is used to render shapes, images, graphs, or text dynamically. The element exposes a JavaScript API that allows for drawing paths, basic shapes, images and text. We leveraged the canvas with the help of [EaselJS](http://createjs.com/#!/EaselJS). EaselJS is a fantastic abstraction layer over the Canvas element. It provides helper classes for drawing, buffered rendering, user interaction support and many more.





**Sencha Touch 2.2**





The application itself, as well as the surrounding UI is written in [Sencha Touch 2.2](http://sencha.com/products/touch/). We followed the MVC paradigm and leveraged the new Pictos icon font.





# More Info





Here you can see our presentation deck:







You can also check out the code itself here: [GitHub Repo](https://github.com/ModusCreateOrg/web-audio-api)



