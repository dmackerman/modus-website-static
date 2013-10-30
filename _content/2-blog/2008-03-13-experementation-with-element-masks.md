---
author: jay
comments: true



title: Experementation With Element Masks

---

Ext has provided us with an excellent method to very quickly mask an element.  While troubleshooting a mask no-show issue for a datagrid, I came up with the idea to experiment with the Element.mask prototype method.  I have been curious as to why the Ext team has not added effects to the appearing/disappearing of masks.   I suspect it has to do w/ reliability of browsers  rendering capabilities and speed.  I noticed a slowdown of animations with large record sets.  Also, the physical size of the element being masked also has a direct influence on speed.  Smaller boxes - like the one below,  however, work relatively well.  The slideIn effect, particularly does not work in IE 6 and 7.  It works very well for FF2.x on MS Windows however.  FadeIn, FadeOut work as expected.

My next goal is to look at  overiding the Ext.element class and the loadMask to take more config options.

This one should be fun! Click [here](http://moduscreate.com/img/screencasts/2008-03-13_1656.swf) to see the example in action.

(Example slide in via firefox).

![ExtJs Element.mask experimental animation illustration](http://moduscreate.com/img/screencasts/2008-03-13_1703.png)
