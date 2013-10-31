---
author: jay
comments: true



title: How to get titles in collapsed panels for ''border'' layout.

---

In response to [this thread](http://extjs.com/forum/showthread.php?t=25381) at the [Ext forums](http://extjs.com/forum/), I initially [created a simple override](http://extjs.com/forum/showthread.php?p=119887###post119887) (Click [here](http://moduscreate.com/img/screencasts/2008-02-05_1602.swf) to see it action) to the [Ext Border Layout](http://extjs.com/deploy/dev/docs/?class=Ext.layout.BorderLayout).  The solution was a quick one hour deal with no magic or gloss.   There was some posts soon there after that requested more functionality for this override.  These requests include:



	
  * images for the east/west regions (for CBC)

	
  * ability to re-use the original title

	
  * the freedom to insert what ever element object or HTML fragment the end developer desired

	
  * change from override to extension.


So, I've rolled up all of these requests into one Ext.ux.TDGi.BorderLayout class.   This solution provides all of the freedom flexibility that was requested.

Click [here](http://moduscreate.com/js/examples/ext/tdgiux/tdgi_border/) to view a working example of this extension.Â  Click [here](http://moduscreate.com/js/examples/ext/tdgiux/tdgi_border/tdgi.borderLayout.zip) to download the zip file of the full source and example.
Simple Example:
Screenshots:(Internet Explorer 6 and 7)
![Example of tdgi_border layout in IE6 and IE7.  IE8 has not been tested!](http://moduscreate.com/img/screencasts/2008-03-15_2317.png)(FF2.x on OS X)

![Example of tdgi_border layout in firefox for OSX.](http://moduscreate.com/img/screencasts/2008-03-15_2340.png)
Actual Example Source:
Override Source:

