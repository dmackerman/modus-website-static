---
author: jay
comments: true



title: OS Ext Being rewritten from the ground up.

---

It's been *over a year* since i last showed an example of the OS Ext desktop, and I've decided to start back up on things again.Â  I have completely rewritten the dock to extend Ext.BoxComponent, which utilizes the Ext.Component infrastructure.Â  Also, the OSExt.DockIcon class uses BoxComponent as well, and will register itself upon instantiation, forcing the dock to resize when an icon is being placed in the dock. Â Â  I plaon on this Ext Desktop demo to be very resource intensive, utilizing as much Effects as possible.Â  Well see how things go :)

Click the image below to take a gander at the resize animation.

[![](http://moduscreate.com/img/screencasts/2008-11-24_2200.png)](http://moduscreate.com/img/screencasts/2008-11-24_2159.swf )
